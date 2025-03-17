# Changelog 17-03-2025

## Added

### File Upload Handling for Applicants:
- Added a new endpoint `POST /e-visa/applicants` to handle file uploads and save the URL as `image_url` in the `CreateOrUpdateApplicantDto`.
- Implemented file upload handling using `FileInterceptor` from `@nestjs/platform-express`.
- Configured file storage with `diskStorage` to save uploaded files in the `uploads` directory with unique filenames.

### Swagger Documentation:
- Updated Swagger documentation for the `POST /e-visa/applicants` endpoint to indicate that `visa_type_id` is an optional field.
- Added `ApiConsumes` and `ApiBody` decorators to handle `multipart/form-data` requests and document the request body schema.

## Changed

### DTO Updates:
- Updated `CreateOrUpdateApplicantDto` to include the `image_url` field.
- Marked `visa_type_id` and `visa_type_key` as optional fields in `CreateOrUpdateApplicantDto`.

## Fixed

### Optional Field Handling:
- Ensured that `visa_type_id` is correctly marked as an optional field in Swagger documentation.