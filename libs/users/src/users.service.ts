import { Injectable } from '@nestjs/common';
import { CoreDbService } from '@app/db';
import { USER_SELECT } from '@app/utils/types';
import { badRequest, exception, forbidden, notFound, ServiceResponse, success } from '@app/utils/response';
import { Prisma } from '@prisma/core/client';
import { paginateQuery } from '@app/utils/helpers/prisma-utils';
import { FilterRoleInterface, FilterUserInterface, UpsertRoleDto } from 'apps/auth/src/dto/auth.dto';
import { UpdatePassportRecordDto, UpdateUserDetailsDto } from './users.dto';
import { CrmDbService } from '@app/db/crm/crm.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly dbService: CoreDbService,
        private readonly crmDbService: CrmDbService,
    ) { }

    async upsertRole(data: UpsertRoleDto): Promise<ServiceResponse> {
        try {
            const { id, name, permission_ids, ...rest } = data;
            if (id) {
                const existingRole = await this.dbService.role.findUnique({ where: { id } });

                if (!existingRole) {
                    exception({ message: 'Role not found', customMessage: 'Role does not exist' });
                }

                const updatedRole = await this.dbService.role.update({
                    where: { id },
                    data: {
                        name,
                        permissions: permission_ids ? {
                            set: permission_ids.map(pid => ({ id: pid }))
                        } : undefined,
                        ...rest
                    },
                });
                return success(updatedRole, 'Role updated successfully');
            } else {
                const existingRoleByName = await this.dbService.role.findFirst({ where: { name } });
                if (existingRoleByName) {
                    exception({ message: 'Role already exists', customMessage: 'Role with this name already exists' });
                }
                const newRole = await this.dbService.role.create({
                    data: {
                        name,
                        permissions: permission_ids ? {
                            connect: permission_ids.map(pid => ({ id: pid }))
                        } : undefined,
                        ...rest
                    },
                });
                return success(newRole, 'Role created successfully');
            }
        } catch (error) {
            console.error(error);
            exception({ message: error, customMessage: 'Failed to create or update role' });
        }
    }

    async getRoles(filter?: FilterRoleInterface): Promise<ServiceResponse> {
        try {
            const { search_term, from_date, to_date, page, page_size } = filter;
            let where: Prisma.RoleWhereInput = {};

            if (from_date || to_date) {
                where.created_at = {};
            }

            if (search_term) {
                where.name = { contains: search_term, mode: 'insensitive' };
            }

            const paginatedRoles =
                await paginateQuery<Prisma.RoleWhereInput>({
                    model: this.dbService.role,
                    findArgs: { where },
                    page: +page,
                    page_size: +page_size,
                });
            return success(
                paginatedRoles,
                'Role(s) retrieved successfully',
            );
        } catch (error) {
            console.error(error);
            exception({ message: error, customMessage: 'Failed to retrieve roles' });
        }
    }

    async getAllUsers(filter?: FilterUserInterface): Promise<ServiceResponse> {
        try {
            const { search_term, from_date, to_date, page, page_size, role_id, ip } = filter;
            let where: Prisma.UserWhereInput = {};

            if (from_date || to_date) {
                where.created_at = {};
                if (from_date) {
                    where.created_at.gte = new Date(from_date);
                }
                if (to_date) {
                    where.created_at.lte = new Date(to_date);
                }
            }

            if (role_id || ip) {
                where.details = {};

                if (role_id) {
                    where.details.role_id = role_id;
                }

                if (ip) {
                    where.details.actions = {
                        some: {
                            ip: { contains: ip, mode: 'insensitive' },
                        },
                    };
                }
            }

            if (filter.search_term) {
                where.OR = [
                    { email: { contains: search_term, mode: 'insensitive' } },
                    {
                        details: {
                            is: {
                                OR: [
                                    { first_name: { contains: search_term, mode: 'insensitive' } },
                                    { middle_name: { contains: search_term, mode: 'insensitive' } },
                                    { surname: { contains: search_term, mode: 'insensitive' } },
                                    { phone: { contains: search_term, mode: 'insensitive' } },
                                ],
                            },
                        },
                    },
                ];
            }

            const paginatedUsers =
                await paginateQuery<Prisma.UserWhereInput>({
                    model: this.dbService.user,
                    findArgs: { where, select: USER_SELECT },
                    page: +page,
                    page_size: +page_size,
                });
            return success(
                paginatedUsers,
                'User(s) retrieved successfully',
            );
        } catch (err) {
            exception({
                message: err,
                customMessage: 'Failed to retrieve users',
            });
        }
    }


    async getUserById(
        userId: string
    ): Promise<ServiceResponse> {
        try {
            const user = await this.dbService.user.findUnique({
                where: { id: userId },
                select: {
                    email: true,
                    id: true,
                    last_login: true,
                    details: {
                        include: {
                            role: true,
                            country: true,
                            passport_records: true,
                        }
                    }
                }
            });
            if (!user) {
                exception({ message: "User not found", customMessage: "User not found" });
            }
            return success(user, "User loaded successfully");
        } catch (e) {
            console.error(e)
            exception({ message: e, customMessage: "Failed to load users" })
        }
    }

    async updateUserDetails(data: UpdateUserDetailsDto): Promise<ServiceResponse> {
        try {
            const { user_id, ...updateData } = data;

            if (!user_id) {
                badRequest({ message: 'Missing user_id', customMessage: 'User ID is required' });
            }

            // Check if user exists
            const existingUser = await this.dbService.user.findUnique({
                where: { id: user_id },
                include: { details: { include: { passport_records: true } } }
            });

            if (!existingUser) {
                notFound({ message: 'User not found', customMessage: 'User does not exist' });
            }

            // Validate foreign key references if provided
            if (updateData.role_id) {
                const roleExists = await this.dbService.role.findUnique({
                    where: { id: updateData.role_id }
                });
                if (!roleExists) {
                    badRequest({ message: 'Invalid role_id', customMessage: 'Role does not exist' });
                }
            }

            if (updateData.country_id) {
                const countryExists = await this.dbService.country.findUnique({
                    where: { id: updateData.country_id }
                });
                if (!countryExists) {
                    badRequest({ message: 'Invalid country_id', customMessage: 'Country does not exist' });
                }

                // Check if existing user is an applicant and restrict them to only exempt countries
                if (existingUser.details.passport_records.length > 0 && !countryExists.is_exempt) {
                    forbidden({ message: 'Invalid country selection', customMessage: 'Applicants can only select exempt countries' });
                }
            }

            if (updateData.state_id) {
                const stateExists = await this.dbService.state.findUnique({
                    where: { id: updateData.state_id }
                });
                if (!stateExists) {
                    badRequest({ message: 'Invalid state_id', customMessage: 'State does not exist' });
                }
            }

            // Check if phone number is already taken by another user
            if (updateData.phone) {
                const phoneExists = await this.dbService.userDetail.findFirst({
                    where: {
                        phone: updateData.phone,
                        user_id: { not: user_id } // Exclude current user
                    }
                });
                if (phoneExists) {
                    badRequest({ message: 'Phone number already exists', customMessage: 'This phone number is already registered to another user' });
                }
            }

            // Update user details
            const updatedUserDetails = await this.dbService.userDetail.update({
                where: { user_id },
                data: {
                    ...updateData,
                    updater_id: user_id, // Set the user as their own updater
                },
                include: {
                    role: true,
                    country: true,
                    state: true,
                    passport_records: true,
                }
            });

            return success(updatedUserDetails, 'User details updated successfully');

        } catch (error) {
            console.error(error);
            exception({ message: error, customMessage: 'Failed to update user details' });
        }
    }


    async upsertPassportRecord(
        data: UpdatePassportRecordDto
    ): Promise<ServiceResponse> {
        try {
            const { user_id, passport_no, id, active } = data;

            if (id) {
                const existingRecord = await this.dbService.passportRecord.findUnique({
                    where: { id }
                });

                if (!existingRecord) {
                    notFound({ message: "Passport record not found", customMessage: "Passport record does not exist" });
                }

                const updatedRecord = await this.dbService.passportRecord.update({
                    where: { id },
                    data: { passport_no, active },
                });
                return success(updatedRecord, "Passport record updated successfully");
            }

            if (!user_id || !passport_no) {
                exception({ message: "Missing required fields", customMessage: "user_id and passport_no are required to create a passport record" });
            }

            const updatedRecord = await this.dbService.passportRecord.create({
                data: { user_id, passport_no, active },
            });

            return success(updatedRecord, "Passport record created successfully");
        } catch (error) {
            console.error(error);
            exception({ message: error, customMessage: "Failed to upsert passport record" });
        }
    }


    async getApplicationsByUserId(
        user_id: string
    ): Promise<ServiceResponse> {
        const passportRecords = await this.dbService.passportRecord.findMany({
            where: {
                user_id: user_id,
                // active: true
            }
        })

        const passportIds = passportRecords.map((p) => p.passport_no)
        const query = this.buildApplicationQuery(passportIds);

        const applications = await this.crmDbService.$queryRawUnsafe<any[]>(query);
        return success(applications, "Applications loaded successfully");
    }


    private buildApplicationQuery(passportIds: string[]) {
        return `SELECT 
    cc.ticket_num_c AS visaNumber,
    cc.visa_type_c AS visaType,
    cc.duration_of_stay_c AS durationOfStay,
    cc.entry_type_c AS entryType,
    cc.entry_date_c AS entryDate,
    cc.departure_date_c AS departureDate,
    cc.port_of_entry_c AS portOfEntry,
    cc.port_of_departure_c AS portOfDeparture,
    cc.visa_validity_c AS visaValidity,
    cc.purpose_of_jouney_c  AS purposeOfJourney,
    cc.airline_c AS airline,
    cc.flight_number_c AS flightNumber,
    cc.country_of_departure_c AS countryOfDeparture,
    cc.date_of_departure_c AS dateOfDeparture,
    cc.contact_or_hotel_name_c AS contactOrHotelName,
    cc.contact_or_hotel_number_c AS contactOrHotelNumber,
    cc.contact_or_hotel_address_c AS contactOrHotelAddress,
    cc.city_s_town_c AS cityTown,
    cc.contact_or_hotel_email_c AS contactOrHotelEmail,
    cc.contact_or_hotel_postal_code_c AS contactOrHotelPostalCode,
    -- cc.is_active_c AS isActive, -- Uncomment if needed
    cc.approving_status_c AS approvingStatus,
    cc.active_status_c AS activeStatus,
    cc.evisa_download_link_c AS evisaDownloadLink,
    cc.applicant_photo_c AS applicantPhoto,
    cc.emailaddress_c AS emailAddress,
    cc.phonenumber_c AS phoneNumber,
    cc.biometric_capture_c AS biometricCapture
FROM accounts a
JOIN accounts_cstm ac ON a.id = ac.id_c
JOIN cases c ON ac.id_c = c.account_id AND c.deleted = 0
JOIN cases_cstm cc ON c.id = cc.id_c
LEFT JOIN cases_admin_review_approval_1_c cara1c 
    ON cc.id_c = cara1c.cases_admin_review_approval_1cases_ida
LEFT JOIN admin_review_approval ara 
    ON ara.id = cara1c.cases_admin_review_approval_1admin_review_approval_idb AND ara.deleted = 0
LEFT JOIN admin_review_approval_cstm arac ON ara.id = arac.id_c
WHERE ac.passport_number_c IN (${passportIds.map(id => `'${id}'`).join(", ")})
  AND a.deleted = 0`
    }

}
