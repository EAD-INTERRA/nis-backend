#!/bin/bash

rm -rf node_modules
rm -rf prisma/node_modules
rm -rf .pnpm-store
rm pnpm-lock.yaml
pnpm install

pnpx prisma generate --schema=prisma/core/schema.prisma
pnpx prisma generate --schema=prisma/replica/schema.prisma