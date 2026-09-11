# Deploying portfolio_api

## Production

```
api.kelldev.design
  -> CloudFront (TLS terminates here)
     -> origin-api.kelldev.design  (Elastic IP, stable across instance replacement)
        -> nginx :80 on Amazon Linux 2023, t4g.nano
           -> proxy_pass http://127.0.0.1:4000
              -> pm2 "portfolio-api" -> node dist/index.js
                 -> SQLite at /var/lib/portfolio-api/prod.db  (own EBS volume)
```

Infrastructure is Terraform: [deploy/terraform/](../deploy/terraform/). Instance setup is
[deploy/bootstrap.sh](../deploy/bootstrap.sh) via user-data. Releases are
[deploy/deploy.sh](../deploy/deploy.sh).

There is no Docker in production. The [Dockerfile](../Dockerfile) and
[docker-compose.yaml](../docker-compose.yaml) are local-development only, and the Helm
chart that used to sit in `helm/` has been deleted — it described a Kubernetes cluster
that never existed.

## Deploy

Push to `main`. [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) assumes the
OIDC deploy role and triggers `deploy.sh` on the instance over SSM. The instance pulls,
builds, migrates, restarts pm2 and health-checks itself; CI fails if the health check does.

Before merge, [.github/workflows/ci.yml](../.github/workflows/ci.yml) runs lint and the
production build on every pull request. It needs no AWS credentials and no database — the
only Prisma command it runs is `prisma generate`.

By hand:

```sh
aws ssm start-session --target <instance-id>
sudo -u ec2-user -H /usr/local/bin/portfolio-api-deploy
```

Verify:

```sh
curl -sS https://api.kelldev.design/ -H 'content-type: application/json' \
  -d '{"query":"{__typename}"}'
```

## Rules

- **Never run `npm run prisma:migrate` against production.** That script is
  `prisma migrate dev`, the interactive development command, and it will offer to reset
  the database. `deploy.sh` uses `prisma migrate deploy`.
- **`DATABASE_URL` decides where the database lives.** Production points at the data
  volume; local dev points at `file:./dev.db` in the checkout. See [.env.example](../.env.example).
- **The data volume is `prevent_destroy`** and snapshotted daily. `deploy.sh` also keeps
  the last 10 per-deploy copies under `/var/lib/portfolio-api/backups/`.
- **`dist/` is built on the box**, not shipped. The 512MB instance relies on a 2GB
  swapfile to get through `npm ci` and webpack.
- Origin traffic is plain HTTP; TLS is CloudFront's job. The security group admits only
  CloudFront's origin-facing prefix list, so the origin is not reachable directly.

## Environment

Production `.env` is written at boot from the `portfolio-api/env` secret in Secrets
Manager, plus `DATABASE_URL` and `NODE_ENV` appended by `bootstrap.sh`. To change a value,
`aws secretsmanager put-secret-value` then redeploy. Required keys are in
[.env.example](../.env.example); `FRED_API_KEY` is mandatory — the market rates layer in
[src/services/fred.ts](../src/services/fred.ts) fails at runtime without it.

## Market data refresh

[refreshStaleSeries](../src/services/fred.ts) refetches a series only when it is stale, and
staleness is publication-aware — it depends on whether the series already holds the newest
value FRED is expected to have published, not on elapsed time alone:

- `FRED_TTL_HOURS` (default 12) applies once the series holds that print. Nothing new can
  arrive until the next release, so the series is left alone.
- `FRED_POLL_TTL_HOURS` (default 1) applies while the series is behind it, so a new print is
  picked up soon after FRED publishes rather than at the next full TTL. It is clamped to
  `FRED_TTL_HOURS`, which always wins when deliberately set shorter.

`lastExpectedPrintDate` is the latest weekday whose H.15 release has passed. H.15 posts at
4:15pm ET, which is 20:15 UTC under EDT and 21:15 UTC under EST, so the cutoff is 22:00 UTC —
past both, and still the same calendar day in ET, which avoids needing a timezone database.
Market holidays are deliberately not modelled: there is no print to find on one, so a holiday
leaves the polling TTL in force for the day. That costs one wasted fetch per poll interval.

A refresh is incremental. Each request starts 30 days before the series' newest stored
observation (`REVISION_OVERLAP_DAYS`), so it moves tens of rows per series rather than the full
history, while still absorbing FRED's revisions to already-stored values. The newest-observation
read that decides staleness is reused as that start anchor, and is skipped entirely for a series
still inside its polling TTL — so publication-awareness adds no queries to a refresh and none to
the common fresh path.

Footprint is about 141k observations across 27 series, a measured 9.2MB on a 960MB volume. The
writes are upserts, so the database does not grow.

A full-history fetch — a new series, or an empty database — is still the cold-start case: about
59 seconds of work. Two pieces of the deployment exist to keep that off a visitor's request, and
are therefore **load-bearing, not temporary**:

- `portfolio-api-warm.timer` (defined in [bootstrap.sh](../deploy/bootstrap.sh)) runs every 6 hours and
  issues `{marketSeries{fredId}}` against localhost, which refreshes the whole registry off the
  request path. It is also what drives polling when no real traffic arrives: the polling TTL can
  only act inside a request, so this interval bounds how soon a new print is noticed on a quiet
  day. Dropping it to 1h would let the default poll TTL act at full resolution; the instance's
  `user_data` is under `ignore_changes`, so that needs a deliberate re-bootstrap.
- nginx's `proxy_read_timeout 300s`. The default 60s sits right on the cold-start duration and
  returns 504.

A refresh does **not** degrade the rest of the API. Measured under a forced full refresh —
now the worst case rather than the routine one — twelve concurrent `portfolioItems` requests
returned 200 in 16-119ms against a ~40ms baseline: Prisma's query engine does the writes off the
Node event loop, so readers are never blocked. The portfolio site, which is the only thing
`kelldev.design` queries, is unaffected.

## Migration from the old box

Completed 2026-09-03. The hand-built `t2.micro` (`i-0e1e29099d92822ef`, Ubuntu 22.04) that
ran production from 2024 has been terminated. Its final root volume is preserved as
snapshot `snap-00634a3d058b30547` — the only remaining copy of the original database.

The new instance was seeded from [src/prisma/seed.ts](../src/prisma/seed.ts) rather than
importing that database; the seed was verified field-by-field against production first.
Keep it that way — if you change portfolio content, change it in the seed.
