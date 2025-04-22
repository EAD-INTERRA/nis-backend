# NIS Middleware Service

## Multi-Database Support

The project now supports multiple databases (Core and Replica) using Prisma. Each database has its own schema and migrations.

- **Core Database**: Used for primary application data.
- **Replica Database**: Used for replicated or external data.

---

## Setup

1. Rename `.env.example` to `.env` and replace the placeholder `DATABASE_URL` with your database connection string.

2. Generate migration files and run them against the database:
  ```bash
  pnpx prisma migrate dev --name <migration_name>
  ```

3. Run a Redis container (from the official image):
  ```bash
  docker run -d -p 6379:6379 --name redis redis
  ```

### Run Migrations

- **Core Database**:
  ```bash
  npm run prisma:migrate:core
  ```

- **Replica Database**:
  ```bash
  npm run prisma:migrate:replica
  ```

### Seed Data

Run the seeding script to populate initial data:
```bash
npm run seed
```

### Generate DTOs

Generate DTOs for Prisma models:
```bash
npm run generate:dto
```

### Run the Application

Start the application in development mode:
```bash
npm run start:dev
```

---

## Queue Setup and Processing

### Queue Integration

The e-visa consumer now uses **BullMQ** for queue-based processing to ensure reliable handling of jobs.

### Steps to Set Up the Queue

1. **Ensure Redis is running**:
  ```bash
  docker run -d -p 6379:6379 --name redis redis
  ```

2. **Add jobs to the queue**:

  Use the `addToQueue` method in the `AppService` to add jobs to the e-visa queue. Example:
  ```ts
  await appService.addToQueue({
    data: {
     profile_picture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
     name: "John Doe",
    },
    apiUrl: "https://example.com/api/upload",
  });
  ```

3. **Process jobs**:

  The `EVisaConsumer` processes jobs from the e-visa queue and sends the data as `multipart/form-data` to the external API.

---

## Base64 File Handling

- The consumer decodes base64 strings and dynamically determines the file extension based on the MIME type.
- Files are appended to `FormData` with the correct file name and extension.

---

## External API Integration

- The consumer sends the processed data to an external API using `axios`.
- Ensure the `WEBHOOK_URL` environment variable is set in your `.env` file for the API endpoint.

---

## Debugging

- Logs are added to verify the processing of keys and values in the JSON data.
- Use `console.log` to inspect the `FormData` object and API responses during development.

---

## New Features

### Controllers

- **e-visa**: Manage applicants, visa types, visa requirements, and supporting documents.
- **account**: Manage accounts and custom account data.
- **case**: Manage cases and custom case data.
- **visa-document**: Manage visa documents and custom visa document data.

### Services

- **EVisaService**: Handles e-visa-related operations.
- **ReplicaService**: Manages replica database operations.
- **AccountService**: Handles account-related operations.
- **CaseService**: Manages case-related operations.

### Scripts

- **generate-dtos.ts**: Generates DTOs for Prisma models.
- **seed.ts**: Seeds initial data into the databases.

### Swagger Documentation

All endpoints are documented using Swagger. Access the documentation at `/docs`.