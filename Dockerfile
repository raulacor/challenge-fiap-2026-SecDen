FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY hub/package.json hub/package-lock.json ./hub/
RUN npm ci && npm ci --prefix hub
COPY index.html vite.config.js ./
COPY src ./src
COPY hub/index.html hub/vite.config.js ./hub/
COPY hub/src ./hub/src
RUN npm run build && npm run build --prefix hub

FROM nginxinc/nginx-unprivileged:1.29-alpine
USER root
RUN apk upgrade --no-cache
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/hub/dist /usr/share/nginx/html/hub/dist
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/ > /dev/null || exit 1
