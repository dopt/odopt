ARG  NODE_VERSION
FROM node:${NODE_VERSION}-slim AS base
ARG  PACKAGE_MANAGER
ARG  TURBO_VERSION
RUN apt-get update -y && apt-get install -y  build-essential
RUN npm install --location=global turbo@${TURBO_VERSION}
RUN corepack enable && corepack prepare ${PACKAGE_MANAGER} --activate
WORKDIR /app

FROM base AS sourcer
COPY . . 

FROM sourcer AS minimal-monorepo
RUN pnpm exec turbo prune --scope="@examples/modal" --docker
RUN rm -rf $(ls | grep -v out)
RUN mv ./out/full/* .
RUN mv ./out/pnpm-lock.yaml .
RUN rm -rf ./out

FROM minimal-monorepo AS installer
RUN pnpm install --filter "@examples/modal..."

FROM installer AS builder
RUN apt update
RUN apt-get -y install default-jre && apt install -y wget && apt install -y git && apt-get install -y jq && apt-get -y install openssl
ENV NODE_ENV=production
RUN pnpm exec turbo run build --filter="@examples/modal...";

FROM nginx:alpine
RUN apk update; apk add --upgrade curl
COPY --from=builder /app/apps/@examples/modal/dist/ /usr/share/nginx/html
COPY --from=builder /app/apps/@examples/modal/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
