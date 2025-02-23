FROM node:20-alpine AS base

WORKDIR /app

COPY . .

RUN npm install --global pnpm && pnpm install --frozen-lockfile

CMD ["node", "/app/dist/main.js"]