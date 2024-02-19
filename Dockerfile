FROM node:21-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

ENV VITE_API_URL=http://localhost:8080

COPY . .
RUN npm run build
RUN npm prune --production

FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "build" ]