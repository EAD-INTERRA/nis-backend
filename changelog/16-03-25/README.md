# Changelog

## Added

### DTOs:
- CreateOrUpdateApplicantDto
- CreateOrUpdatePortOfEntryDto
- CreateOrUpdateCountryDto
- CreateOrUpdateStateDto
- CreateOrUpdateNationalityDto
- CreateOrUpdateVisaTypeDto
- CreateOrUpdateVisaRequirementDto
- CreateOrUpdatePassportTypeDto
- CreateOrUpdateTravelInformationDto
- CreateOrUpdateContactDetailDto
- CreateOrUpdateSupportingDocumentDto in `e-visa.dto.ts`

### Service Methods:
- `saveBioData`
- `savePortOfEntry`
- `saveCountry`
- `saveState`
- `saveNationality`
- `saveVisaType`
- `saveVisaRequirement`
- `savePassportType`
- `saveTravelInformation`
- `saveContactDetail`
- `saveSupportingDocument` methods in `e-visa.service.ts`
- `getApplicants`
- `getPortOfEntries`
- `getCountries`
- `getStates`
- `getNationalities`
- `getVisaTypes`
- `getVisaRequirements`
- `getPassportTypes`
- `getTravelInformation`
- `getContactDetails`
- `getSupportingDocuments` methods in `e-visa.service.ts`

### Controller Methods:
- Endpoints for applicants, port-of-entry, countries, states, nationalities, visa-types, visa-requirements, passport-types, travel-information, contact-details, and supporting-documents in `e-visa.controller.ts`

### File Upload Handling:
- File upload handling for supporting-document endpoint in `e-visa.controller.ts`

### Seed Data:
- Comprehensive list of countries, nationalities and states in nigeria in `libs\db\src\data\nationality.ts`
- `VISA_TYPES` and `PASSPORT_TYPES` in `libs\db\src\data\nationality.ts`

### Seed Functions:
- `seedCountries`
- `seedVisaTypes`
- `seedPassportTypes`
- `seedNationalities` functions in `utils.seed.ts`

## Modified

### Multer Configuration:
- Updated Multer configuration to use dynamic folder names based on the VisaRequirement name in `app.module.ts`