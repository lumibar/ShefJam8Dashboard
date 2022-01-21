FROM node:alpine AS builder

RUN adduser -D -h /home/container container && mkdir -p /home/container/.tmp && npm install -g pnpm && pnpm config set store-dir /home/container/.pnpm-store && \
    npm config set store-dir /home/container/.pnpm-store

ENV TMPDIR /home/container/.tmp

WORKDIR /home/container/app

RUN chmod 777 -R /home/container/app && \
    chmod 777 -R /home/container/.tmp

USER container

COPY . .

RUN pnpm i && pnpm build

FROM node:16 AS main
COPY --from=builder /home/container/app/build /home/container/app/package.json ./
EXPOSE 3000

CMD ["node", "index.js"]