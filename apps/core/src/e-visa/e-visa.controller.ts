import { Controller, Post, Get, Body, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { CreateOrUpdateApplicantDto, CreateOrUpdatePortOfEntryDto, CreateOrUpdateCountryDto, CreateOrUpdateStateDto, CreateOrUpdateNationalityDto, CreateOrUpdateVisaTypeDto, CreateOrUpdateVisaRequirementDto, CreateOrUpdatePassportTypeDto, CreateOrUpdateTravelInformationDto, CreateOrUpdateContactDetailDto, CreateOrUpdateSupportingDocumentDto } from '@app/e-visa/dtos/e-visa.dto';
import { EVisaService } from '@app/e-visa';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { mapErrorCodeToHttpResponse } from '@app/utils/response';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';
import { SAMPLE_PAYLOAD } from '@app/e-visa/data';

@Controller({
  path: 'e-visa',
  version: '1'
})
@ApiTags('e-visa')
export class EVisaController {
  constructor(private readonly eVisaService: EVisaService) { }

  @Get('test')
  async testLive(
  ) {
    const res = await axios.post("https://democrm.interranetworks.com/NIS/index.php?entryPoint=WebhookEntryPoint", 
      SAMPLE_PAYLOAD,
      {
        headers: {
          "X-Webhook-Signature": "passed",
        }
      }
    )
    return res.data;
    // return mapErrorCodeToHttpResponse(
    //   await this.eVisaService.addToQueue(data)
    // );
  }
  
  @Post('webhook')
  async triggerWebhookJob(
    @Body() data: any
  ) {
    return mapErrorCodeToHttpResponse(
      await this.eVisaService.addToQueue(data)
    );
  }

  @Post('applicants')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
        },
        surname: {
          type: 'string',
        },
        first_name: {
          type: 'string',
        },
        middle_name: {
          type: 'string',
        },
        date_of_birth: {
          type: 'string',
          format: 'date',
        },
        place_of_birth: {
          type: 'string',
        },
        nationality_id: {
          type: 'string',
        },
        passport_type_id: {
          type: 'string',
        },
        visa_type_id: {
          type: 'string',
        },
        visa_type_key: {
          type: 'string',
        },
        gender: {
          type: 'string',
        },
        marital_status: {
          type: 'string',
        },
        phone_no: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        passport_no: {
          type: 'string',
        },
        passport_expiry_date: {
          type: 'string',
          format: 'date',
        },
      },
    },
  })
  async saveBioData(
    @UploadedFile() file: Express.Multer.File,
    @Body() createOrUpdateApplicantDto: CreateOrUpdateApplicantDto,
  ) {
    const fileUrl = `${process.env.APP_HOST}/public/uploads/${file.filename}`; // Adjust the URL based on your file storage strategy
    createOrUpdateApplicantDto.image_url = fileUrl;
    return mapErrorCodeToHttpResponse(await this.eVisaService.saveBioData(createOrUpdateApplicantDto));
  }

  @Get('applicants')
  async getApplicants() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getApplicants());
  }

  @Get('applicants/:applicant_id')
  async getApplicantById(@Param('applicant_id') applicant_id: string) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getApplicantById(applicant_id));
  }

  @Post('port-of-entry')
  async savePortOfEntry(@Body() createOrUpdatePortOfEntryDto: CreateOrUpdatePortOfEntryDto) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.savePortOfEntry(createOrUpdatePortOfEntryDto));
  }

  @Get('port-of-entry')
  async getPortOfEntries() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getPortOfEntries());
  }

  //   @Post('country')
  //   async saveCountry(@Body() createOrUpdateCountryDto: CreateOrUpdateCountryDto) {
  //     return mapErrorCodeToHttpResponse(await this.eVisaService.saveCountry(createOrUpdateCountryDto));
  //   }

  @Get('countries')
  async getCountries() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getCountries());
  }

  //   @Post('state')
  //   async saveState(@Body() createOrUpdateStateDto: CreateOrUpdateStateDto) {
  //     return mapErrorCodeToHttpResponse(await this.eVisaService.saveState(createOrUpdateStateDto));
  //   }

  @Get('states')
  async getStates() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getStates());
  }

  //   @Post('nationality')
  //   async saveNationality(@Body() createOrUpdateNationalityDto: CreateOrUpdateNationalityDto) {
  //     return mapErrorCodeToHttpResponse(await this.eVisaService.saveNationality(createOrUpdateNationalityDto));
  //   }

  @Get('nationalities')
  async getNationalities() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getNationalities());
  }

  @Post('visa-types')
  async saveVisaType(@Body() createOrUpdateVisaTypeDto: CreateOrUpdateVisaTypeDto) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.saveVisaType(createOrUpdateVisaTypeDto));
  }

  @Get('visa-types')
  async getVisaTypes() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getVisaTypes());
  }

  // @Get('visa-types/:id')
  // async getVisaTypeById(@Param('id') id: string) {
  //   return mapErrorCodeToHttpResponse(await this.eVisaService.getVisaTypeById(id));
  // }

  @Get('watchlist/:passport_no')
  async checkWatchlist(@Param('passport_no') passport_no: string) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.checkWatchlist(passport_no));
  }
  
  @Get('visa-types/:key')
  async getVisaTypeByKey(@Param('key') key: string) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getVisaTypeByKey(key));
  }

  @Post('visa-requirements')
  async saveVisaRequirement(@Body() createOrUpdateVisaRequirementDto: CreateOrUpdateVisaRequirementDto) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.saveVisaRequirement(createOrUpdateVisaRequirementDto));
  }

  @Get('visa-requirements')
  async getVisaRequirements() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getVisaRequirements());
  }

  @Post('passport-types')
  async savePassportType(@Body() createOrUpdatePassportTypeDto: CreateOrUpdatePassportTypeDto) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.savePassportType(createOrUpdatePassportTypeDto));
  }

  @Get('passport-types')
  async getPassportTypes() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getPassportTypes());
  }

  @Post('travel-information')
  async saveTravelInformation(@Body() createOrUpdateTravelInformationDto: CreateOrUpdateTravelInformationDto) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.saveTravelInformation(createOrUpdateTravelInformationDto));
  }

  @Get('travel-information')
  async getTravelInformation() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getTravelInformation());
  }

  @Post('contact-details')
  async saveContactDetail(@Body() createOrUpdateContactDetailDto: CreateOrUpdateContactDetailDto) {
    return mapErrorCodeToHttpResponse(await this.eVisaService.saveContactDetail(createOrUpdateContactDetailDto));
  }

  @Get('contact-details')
  async getContactDetails() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getContactDetails());
  }

  //   @Post('supporting-document')
  //   async saveSupportingDocument(@Body() createOrUpdateSupportingDocumentDto: CreateOrUpdateSupportingDocumentDto) {
  //     return mapErrorCodeToHttpResponse(await this.eVisaService.saveSupportingDocument(createOrUpdateSupportingDocumentDto));
  //   }
  @Post('supporting-documents')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
        },
        visa_requirement_id: {
          type: 'string',
        },
        applicant_id: {
          type: 'string',
        },
      },
    },
  })
  async saveSupportingDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() createOrUpdateSupportingDocumentDto: CreateOrUpdateSupportingDocumentDto,
  ) {
    const fileUrl = `${process.env.APP_HOST}/public/uploads/${file.filename}`; // Adjust the URL based on your file storage strategy
    createOrUpdateSupportingDocumentDto.url = fileUrl;
    return mapErrorCodeToHttpResponse(await this.eVisaService.saveSupportingDocument(createOrUpdateSupportingDocumentDto));
  }

  @Get('supporting-documents')
  async getSupportingDocuments() {
    return mapErrorCodeToHttpResponse(await this.eVisaService.getSupportingDocuments());
  }
}