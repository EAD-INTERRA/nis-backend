
# Changelog 22-04-2025

## Added

### Multi-Database Support
- Integrated `Core` and `Replica` databases using `Prisma`.
- Added `CoreDbService` and `ReplicaDbService` for database operations.

### Queue-Based Processing
- Integrated BullMQ for queue-based processing in the `e-visa` module.
- Added `addToQueue` method in `AppService` to enqueue jobs for processing.
- Implemented `EVisaConsumer` to process jobs from the `e-visa` queue.

### Base64 File Handling
- Implemented base64 decoding for JSON data in the `e-visa` consumer.
- Dynamically determined file extensions based on MIME type for `FormData` uploads.

### FormData Integration
- Enhanced the `e-visa` consumer to send multipart/form-data requests to external APIs.
- Added support for appending files and plain fields to `FormData`.

### Logging and Debugging
- Added detailed logs to verify the processing of JSON keys and values.
- Improved error handling for external API requests.

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

### DTOs
- Added DTOs for all Prisma models using the `generate-dtos.ts` script.

### Seeding Scripts
- Added scripts to seed visa types, passport types, nationalities, and other data.

### Swagger Documentation
- Documented all API endpoints using Swagger.

## Fixed

### FormData Serialization
- Ensured proper serialization of `FormData` with headers using `formData.getHeaders()`.
- Resolved issues with FormData serialization for file uploads.
- Ensured proper handling of base64-encoded files.

### Blob Compatibility
- Resolved compatibility issues with `Blob` in Node.js by using `Buffer` for file uploads.

## Updated

### Database Migrations
- Added new tables and relationships for visa types, visa requirements, and supporting documents.
- Updated existing tables to support new features.

### API Endpoints
- Enhanced endpoints for managing visa documents, applicants, and supporting documents.

### README
- Updated with setup instructions for multi-database support, queue-based processing, and new features.

### Documentation
- Updated the README with instructions for queue setup, base64 file handling, and external API integration.

---

## Summary of Changes

### Multi-Database Support
- Integrated `Core` and `Replica` databases with Prisma.
- Added services for managing database operations.

### Queue-Based Processing
- Added BullMQ integration for reliable job handling in the `e-visa` module.
- Jobs are added to the `e-visa` queue and processed asynchronously.

### Base64 File Handling
- Decoded base64 strings and dynamically determined file extensions based on MIME type.
- Appended files to `FormData` with the correct file name and extension.

### FormData Integration
- Enhanced the `e-visa` consumer to send multipart/form-data requests to external APIs.
- Ensured proper serialization of `FormData` with headers.

### Logging and Debugging
- Added logs to verify the processing of JSON keys and values.
- Improved error handling for external API requests.

### Controllers and Services
- Added new controllers and services for managing accounts, cases, visa documents, and e-visa operations.

### DTOs and Scripts
- Added a script to generate DTOs for Prisma models.
- Updated seeding scripts to populate initial data.

### Swagger Documentation
- Documented all API endpoints for better usability.

### Documentation
- Updated the README with instructions for queue setup, base64 file handling, and external API integration.
- Added a changelog entry for the new features and updates.

