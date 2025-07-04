# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json ./
COPY api/package.json ./api/
RUN npm install -g corepack@latest
RUN corepack enable pnpm && pnpm install --prod=false --frozen-lockfile

# Copy application code
COPY api ./api

# Build application
RUN pnpm run build

# Remove development dependencies
# RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
WORKDIR /app/api
CMD [ "node", "dist/src/index.js" ]
