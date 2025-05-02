import { CoreDbService } from '@app/db';
import { badRequest, exception, notFound, ServiceResponse, success } from '@app/utils/response';
import { Injectable, Logger } from '@nestjs/common';
import { CreateOrUpdateApplicantDto, CreateOrUpdateContactDetailDto, CreateOrUpdateCountryDto, CreateOrUpdateNationalityDto, CreateOrUpdatePassportTypeDto, CreateOrUpdatePortOfEntryDto, CreateOrUpdateStateDto, CreateOrUpdateSupportingDocumentDto, CreateOrUpdateTravelInformationDto, CreateOrUpdateVisaRequirementDto, CreateOrUpdateVisaTypeDto } from './dtos/e-visa.dto';
import { Applicant, ContactDetail, Country, Nationality, PassportType, PortOfEntry, Prisma, TravelInformation, VisaType } from '@prisma/core/client';
import { mapWebhookFields } from '@app/utils/helpers/webhook';
import axios from 'axios';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { EVisaWebhookPayload } from './dtos/entities';
import { CrmDbService } from '@app/db/crm/crm.service';
import { WatchlistDbService } from '@app/db/watchlist/watchlist.service';

@Injectable()
export class EVisaService {
    constructor(
        private readonly dbService: CoreDbService,
        private readonly crmService: CrmDbService,
        private readonly watchlistService: WatchlistDbService,
        @InjectQueue('e-visa') private eVisaQueue: Queue,
        // private readonly logger = new Logger(EVisaService.name)
    ) { }

    // Add jobs to the queue
    async addToQueue(data: EVisaWebhookPayload): Promise<ServiceResponse> {
        // Validate the incoming data
        const existing_application: any[] = await this.crmService.$queryRaw`
            SELECT * FROM cases_cstm
            WHERE reference_no_c = ${data.application_id}
            AND active_status_c IN ('Active', 'New');
        `;

        console.log("EXISTING APPLICATION: ", existing_application)
        if (existing_application.length > 0) {
            badRequest({ message: "Visa Application with this <application_id> already exists", customMessage: "Visa Application already exists" });
            // return success(existing_application, "Application already exists");
        }

        const ppNumber = data.passport_number.replace(/\s/g, '')
        const [watchlistHit]: any[] = await this.watchlistService.$queryRaw
            `SET NOCOUNT ON; EXEC SelectAndUpdateDocumentHit @DocumentNumber = ${ppNumber}`
        ;

        if (watchlistHit.HitTime) {
            return success(watchlistHit, "Watchlist hit fetched successfully");
        }
        const job = await this.eVisaQueue.add('e-visa-job', data, {
            attempts: 3, // Retry up to 3 times if the job fails
            backoff: 5000, // Wait 5 seconds before retrying
        });

        console.log(`Job added to queue : ${job}`);

        return success("", "Job added to queue successfully");
    }


    async saveBioData(createOrUpdateApplicantDto: CreateOrUpdateApplicantDto): Promise<ServiceResponse> {
        try {
            const { id, visa_type_key, visa_type_id, ...data } = createOrUpdateApplicantDto;

            let visa_type: VisaType;
            if (visa_type_key) {
                visa_type = await this.dbService.visaType.findUnique({
                    where: {
                        key: visa_type_key
                    }
                })
            }
            if (visa_type_id) {
                visa_type = await this.dbService.visaType.findUnique({
                    where: {
                        id: visa_type_id
                    }
                })
            }

            if (!visa_type) {
                console.log("THERRE IS NO VISA TYPE: ", visa_type)
                notFound({ message: `{ ${visa_type_id}, ${visa_type_key}, ${visa_type}}`, customMessage: "Visa Type not found, kindly check again" })
            }

            const applicant = await this.dbService.applicant.upsert({
                where: { id: id || '' },
                update: { ...data, visa_type_id: visa_type.id },
                create: { ...data, visa_type_id: visa_type.id },
                include: {
                    nationality: true,
                    visa_type: true,
                    passport_type: true
                }
            });
            return success(applicant, "Applicant bio data saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save applicant bio data" });
        }
    }

    async getApplicants(): Promise<ServiceResponse> {
        try {
            const applicants = await this.dbService.applicant.findMany();
            return success(applicants, "Applicants loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load applicants" });
        }
    }

    async getApplicantById(applicant_id: string): Promise<ServiceResponse> {
        try {
            const applicant = await this.dbService.applicant.findUnique({
                where: {
                    id: applicant_id
                },
                include: {
                    nationality: true,
                    visa_type: {
                        include: {
                            requirements: true
                        }
                    },
                    passport_type: true,
                    travel_information: true,
                    contact_detail: true,
                    supporting_documents: true
                }
            });
            return success(applicant, "Applicants loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load applicants" });
        }
    }

    async savePortOfEntry(createOrUpdatePortOfEntryDto: CreateOrUpdatePortOfEntryDto): Promise<ServiceResponse> {
        try {
            const { id, ...data } = createOrUpdatePortOfEntryDto;
            const portOfEntry = await this.dbService.portOfEntry.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
            });
            return success(portOfEntry, "Port of entry saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save port of entry" });
        }
    }

    async getPortOfEntries(): Promise<ServiceResponse> {
        try {
            const portOfEntries = await this.dbService.portOfEntry.findMany();
            return success(portOfEntries, "Port of entries loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load port of entries" });
        }
    }

    async saveCountry(createOrUpdateCountryDto: CreateOrUpdateCountryDto): Promise<ServiceResponse> {
        try {
            const { id, ...data } = createOrUpdateCountryDto;
            const country = await this.dbService.country.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
            });
            return success(country, "Country saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save country" });
        }
    }

    async getCountries(): Promise<ServiceResponse> {
        try {
            const countries = await this.dbService.country.findMany();
            return success(countries, "Countries loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load countries" });
        }
    }

    async saveState(createOrUpdateStateDto: CreateOrUpdateStateDto): Promise<ServiceResponse> {
        try {
            const { id, ...data } = createOrUpdateStateDto;
            const state = await this.dbService.state.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
            });
            return success(state, "State saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save state" });
        }
    }

    async getStates(): Promise<ServiceResponse> {
        try {
            const states = await this.dbService.state.findMany();
            return success(states, "States loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load states" });
        }
    }

    async saveNationality(createOrUpdateNationalityDto: CreateOrUpdateNationalityDto): Promise<ServiceResponse> {
        try {
            const { id, ...data } = createOrUpdateNationalityDto;
            const nationality = await this.dbService.nationality.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
            });
            return success(nationality, "Nationality saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save nationality" });
        }
    }

    async getNationalities(): Promise<ServiceResponse> {
        try {
            const nationalities = await this.dbService.nationality.findMany({
                include: {
                    visa_types: true
                }
            });
            return success(nationalities, "Nationalities loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load nationalities" });
        }
    }

    async saveVisaType(createOrUpdateVisaTypeDto: CreateOrUpdateVisaTypeDto): Promise<ServiceResponse> {
        try {
            const { id, nationality_ids, requirement_ids, ...rest } = createOrUpdateVisaTypeDto;
            let data: Prisma.VisaTypeCreateInput = rest

            if (id) {
                // Fetch existing related records
                const existingVisaType = await this.dbService.visaType.findUnique({
                    where: { id },
                    include: { nationalities: true, requirements: true },
                });

                if (existingVisaType) {
                    const existingCountryIds = existingVisaType.nationalities.map(country => country.id);
                    const disconnectIds = existingCountryIds.filter(existingId => !nationality_ids.includes(existingId));
                    const connectIds = nationality_ids.filter(newId => !existingCountryIds.includes(newId));

                    const existingReqIds = existingVisaType.requirements.map(req => req.id);
                    const disconnectReqIds = existingReqIds.filter(existingId => !requirement_ids.includes(existingId));
                    const connectReqIds = requirement_ids.filter(newId => !existingReqIds.includes(newId));

                    // Perform the disconnect operation
                    await this.dbService.visaType.update({
                        where: { id },
                        data: {
                            nationalities: {
                                disconnect: disconnectIds.map(id => ({ id })),
                            },
                            requirements: {
                                disconnect: disconnectReqIds.map(id => ({ id })),
                            }
                        },
                    });

                    data.nationalities = {
                        connect: connectIds.map(id => ({ id })),
                    };
                    data.requirements = {
                        connect: connectReqIds.map(id => ({ id })),
                    };
                }
            } else {
                data.nationalities = {
                    connect: nationality_ids.map(id => ({ id })),
                };
                data.requirements = {
                    connect: requirement_ids.map(id => ({ id })),
                };
            }

            const visaType = await this.dbService.visaType.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
                include: {
                    nationalities: true,
                    requirements: true
                },
            });
            return success(visaType, "Visa type saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save visa type" });
        }
    }

    async getVisaTypes(): Promise<ServiceResponse> {
        try {
            const visaTypes = await this.dbService.visaType.findMany({
                include: {
                    // nationalities: true,
                    requirements: true
                }
            });
            return success(visaTypes, "Visa types loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load visa types" });
        }
    }

    async getVisaTypeById(id?: string): Promise<ServiceResponse> {
        try {
            const visaTypes = await this.dbService.visaType.findUnique({
                where: { id: id.trim() },
                include: {
                    nationalities: true,
                    requirements: true
                }
            });
            return success(visaTypes, "Visa types loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load visa types" });
        }
    }

    async getVisaTypeByKey(key?: string): Promise<ServiceResponse> {
        try {
            const visaTypes = await this.dbService.visaType.findUnique({
                where: { key: key.trim() },
                include: {
                    nationalities: true,
                    requirements: true
                }
            });
            return success(visaTypes, "Visa types loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load visa types" });
        }
    }

    async saveVisaRequirement(createOrUpdateVisaRequirementDto: CreateOrUpdateVisaRequirementDto): Promise<ServiceResponse> {
        try {
            const { id, visa_type_ids, ...rest } = createOrUpdateVisaRequirementDto;
            let data: Prisma.VisaRequirementCreateInput = rest

            if (id) {
                // Fetch existing related records
                const existingVisaReq = await this.dbService.visaRequirement.findUnique({
                    where: { id },
                    include: { visa_types: true },
                });

                if (existingVisaReq) {
                    const existingCountryIds = existingVisaReq.visa_types.map(type => type.id);
                    const disconnectIds = existingCountryIds.filter(existingId => !visa_type_ids.includes(existingId));
                    const connectIds = visa_type_ids.filter(newId => !existingCountryIds.includes(newId));

                    // Perform the disconnect operation
                    await this.dbService.visaRequirement.update({
                        where: { id },
                        data: {
                            visa_types: {
                                disconnect: disconnectIds.map(id => ({ id })),
                            },
                        },
                    });

                    data.visa_types = {
                        connect: connectIds.map(id => ({ id })),
                    };
                }
            } else {
                data.visa_types = {
                    connect: visa_type_ids.map(id => ({ id })),
                };
            }

            const visaRequirement = await this.dbService.visaRequirement.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
                include: {
                    visa_types: true
                }
            });
            return success(visaRequirement, "Visa requirement saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save visa requirement" });
        }
    }

    async getVisaRequirements(): Promise<ServiceResponse> {
        try {
            const visaRequirements = await this.dbService.visaRequirement.findMany({
                include: {
                    visa_types: true
                }
            });
            return success(visaRequirements, "Visa requirements loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load visa requirements" });
        }
    }

    async savePassportType(createOrUpdatePassportTypeDto: CreateOrUpdatePassportTypeDto): Promise<ServiceResponse> {
        try {
            const { id, nationality_ids, ...rest } = createOrUpdatePassportTypeDto;
            let data: Prisma.PassportTypeCreateInput = rest

            if (id) {
                // Fetch existing related records
                const existingPassportType = await this.dbService.passportType.findUnique({
                    where: { id },
                    include: { nationalities: true },
                });

                if (existingPassportType) {
                    const existingCountryIds = existingPassportType.nationalities.map(country => country.id);
                    const disconnectIds = existingCountryIds.filter(existingId => !nationality_ids.includes(existingId));
                    const connectIds = nationality_ids.filter(newId => !existingCountryIds.includes(newId));

                    // Perform the disconnect operation
                    await this.dbService.passportType.update({
                        where: { id },
                        data: {
                            nationalities: {
                                disconnect: disconnectIds.map(id => ({ id })),
                            },
                        },
                    });

                    data.nationalities = {
                        connect: connectIds.map(id => ({ id })),
                    };
                }
            } else {
                data.nationalities = {
                    connect: nationality_ids.map(id => ({ id })),
                };
            }

            const passportType = await this.dbService.passportType.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
                include: {
                    nationalities: true
                }
            });
            return success(passportType, "Passport type saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save passport type" });
        }
    }

    async getPassportTypes(): Promise<ServiceResponse> {
        try {
            const passportTypes = await this.dbService.passportType.findMany({
                include: {
                    nationalities: true
                }
            });
            return success(passportTypes, "Passport types loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load passport types" });
        }
    }

    async saveTravelInformation(createOrUpdateTravelInformationDto: CreateOrUpdateTravelInformationDto): Promise<ServiceResponse> {
        try {
            const { id, ...data } = createOrUpdateTravelInformationDto;
            const travelInformation = await this.dbService.travelInformation.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
            });
            return success(travelInformation, "Travel information saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save travel information" });
        }
    }

    async getTravelInformation(): Promise<ServiceResponse> {
        try {
            const travelInformation = await this.dbService.travelInformation.findMany();
            return success(travelInformation, "Travel information loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load travel information" });
        }
    }

    async saveContactDetail(createOrUpdateContactDetailDto: CreateOrUpdateContactDetailDto): Promise<ServiceResponse> {
        try {
            const { id, ...data } = createOrUpdateContactDetailDto;
            const contactDetail = await this.dbService.contactDetail.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
            });
            return success(contactDetail, "Contact detail saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save contact detail" });
        }
    }

    async getContactDetails(): Promise<ServiceResponse> {
        try {
            const contactDetails = await this.dbService.contactDetail.findMany();
            return success(contactDetails, "Contact details loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load contact details" });
        }
    }

    async saveSupportingDocument(createOrUpdateSupportingDocumentDto: CreateOrUpdateSupportingDocumentDto): Promise<ServiceResponse> {
        try {
            const { id, ...data } = createOrUpdateSupportingDocumentDto;
            // Validate foreign keys
            const applicantExists = await this.dbService.applicant.findUnique({
                where: { id: data.applicant_id },
                include: {
                    nationality: true,
                    passport_type: true,
                    travel_information: {
                        include: {
                            country_of_departure: true,
                            port_of_entry: true
                        }
                    },
                    contact_detail: true,
                    visa_type: {
                        include: {
                            requirements: true
                        }
                    },
                    supporting_documents: true
                }
            });

            if (!applicantExists) {
                exception({ message: 'Applicant not found', customMessage: 'Invalid applicant_id' });
            }

            const visaRequirementExists = await this.dbService.visaRequirement.findUnique({ where: { id: data.visa_requirement_id } });
            if (!visaRequirementExists) {
                exception({ message: 'Visa requirement not found', customMessage: 'Invalid visa_requirement_id' });
            }
            const supportingDocument = await this.dbService.supportingDocument.upsert({
                where: { id: id || '' },
                update: data,
                create: data,
            });

            let res;
            if ((applicantExists.supporting_documents.length + 1) === applicantExists.visa_type.requirements.length) {
                res = await this.triggerWebhook(applicantExists)
            }

            return success({ res, supportingDocument }, "Supporting document saved successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to save supporting document" });
        }
    }

    async getSupportingDocuments(): Promise<ServiceResponse> {
        try {
            const supportingDocuments = await this.dbService.supportingDocument.findMany();
            return success(supportingDocuments, "Supporting documents loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load supporting documents" });
        }
    }



    private async triggerWebhook(
        applicant: Applicant & {
            nationality: Nationality,
            passport_type: PassportType,
            travel_information: TravelInformation & {
                country_of_departure: Country,
                port_of_entry: PortOfEntry
            },
            contact_detail: ContactDetail,
            visa_type: VisaType
        }) {
        const payload = await mapWebhookFields(this.dbService, applicant)

        // console.log("PAYLOAD: ", payload)
        // return

        const response = await axios.post(process.env.WEBHOOK_URL, payload)
        return response.data
    }
}