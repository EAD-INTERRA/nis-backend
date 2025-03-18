# FROM node:18-alpine AS base
# FROM node:18
# RUN npm i -g pnpm

# # # DEV
# # FROM base AS development 
# ARG APP 
# ARG NODE_ENV=development 
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /app 
# COPY package*.json ./
# RUN pnpm install
# COPY . . 
# RUN pnpm install
# RUN pnpm add prisma --save-dev
# RUN pnpm prisma generate
# # RUN pnpm run build ${APP} 
# # Do not build in dev mode, just run the dev server
# CMD ["pnpm", "run", "start:dev", ${APP}]


FROM node:18
RUN npm i -g pnpm@8.15.9

ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}

# Set pnpm store inside the container to avoid conflicts
# ENV PNPM_HOME=/app/.pnpm-store
# RUN pnpm config set store-dir $PNPM_HOME

WORKDIR /usr/src/app 
COPY package*.json ./ 

# Install dependencies
# RUN pnpm install 

# Copy the rest of the app
COPY . . 

# Ensure dependencies are installed correctly
RUN pnpm install 

# Generate Prisma client
RUN pnpm i @prisma/client
RUN pnpx prisma generate 

# RUN pnpm run build ${APP} 

# Start the dev server
CMD ["pnpm", "run", "start:dev", "${APP}"]

# PRODUCTION
# FROM base AS production 
# # Ensure pnpm is available in the final stage
# RUN npm i -g pnpm  

# RUN apk update && apk add --no-cache python3 py3-pip build-base
# RUN apk add --no-cache openssl

# ARG APP 
# ARG NODE_ENV=production 
# ENV NODE_ENV=${NODE_ENV} 
# WORKDIR /app 

# # Copy files
# COPY . .

# RUN pnpm install --frozen-lockfile

# # Ensure Prisma Client is generated
# RUN pnpx prisma generate

# RUN pnpm run build ${APP} 
# # COPY --from=development /app/dist ./dist 

# EXPOSE ${PORT}

# # Add an env to save ARG
# ENV APP_MAIN_FILE=dist/apps/${APP}/main 
# # CMD ["pnpm", "run", "start:prod", ${APP}]
# CMD node ${APP_MAIN_FILE}
