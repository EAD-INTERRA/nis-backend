# Changelog 11-05-25

## Added

### Prisma Schema
- Added Resource model to manage dynamic resources.
- Updated Permission model to reference Resource model.
- Added `resource_id` field to `UserDetail`, `NotificationChannel`, `NotificationProvider`, `NotificationLog`, and `Project` models to associate them with Resource.

### Seeders
- Created `seedNotificationProviders` and `seedNotificationChannels` functions in `utils.seed.ts` to seed notification providers and channels.
- Added `seedAll` function to run all seeding functions sequentially.

### Middleware
- Updated `audit.middleware.ts` to log request and response details and create audit entries in the database using Prisma.

### Swagger Documentation
- Created `ApiCustomResponse` decorator to dynamically inject Swagger documentation for responses and query parameters.
- Updated `audit.controller.ts` to use `ApiCustomResponse` decorator for consistent Swagger documentation.

### Docker
- Updated `Dockerfile` to ensure dependencies are installed and Prisma client is generated.
- Updated `docker-compose.yml` to run `pnpx prisma generate` for each service during container startup.

## Changed

### Audit Service
- Updated `audit.service.ts` to handle filtering and querying of audit logs based on provided parameters.

