FROM node:16-alpine

WORKDIR /build

COPY . .

RUN npm install

RUN npm run build

WORKDIR /app

COPY package.json .

COPY package-lock.json .

WORKDIR /app/src/prisma

COPY src/prisma ./

WORKDIR /app

RUN npm install --production

RUN mv /build/dist/index.js ./index.js

RUN npm run prisma-init

RUN rm -rf /build

EXPOSE 4000

CMD ["node", "index.js"]