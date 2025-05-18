FROM node:22.15-alpine as builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile && pnpm build


FROM nginx:alpine


RUN rm /etc/nginx/conf.d/default.conf


COPY docker/nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
