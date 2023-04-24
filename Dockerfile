# Stage 1
FROM node:16-alpine as builder

WORKDIR /app

COPY ./package-lock.json .

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM node:16-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install --production

WORKDIR /app/src/prisma

COPY src/prisma ./

WORKDIR /app

COPY --from=builder /app/dist/index.js .

RUN npm run prisma:migrate

EXPOSE 4000

CMD ["node", "index.js"]