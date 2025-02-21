FROM node:23 AS builder

WORKDIR /src

# Install Angular Cli
RUN npm i -g @angular/cli

# Copy srcs into container
COPY angular.json .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.app.json .
COPY tsconfig.spec.json .
COPY tsconfig.json .
COPY src src

# Install the packagees from package.json -> recreate node_module
# In docker we use CI
RUN npm ci
# Build the application -> get dist/day32class/browser
RUN ng build

# Copy Angular to Caddy
FROM caddy:2-alpine
LABEL maintainer ="marcus"

WORKDIR /www
# Copy the Angular artifact and the CaddyFile
COPY --from=builder /src/dist/day32class/browser html
COPY Caddyfile .

EXPOSE 8080

SHELL ["/bin/sh", "-c"]
# Execute caddyfile
ENTRYPOINT caddy run --config ./Caddyfile






