import { Injectable } from '@nestjs/common';
import { CoreDbService } from '@app/db';
import { GenericFilterInterface } from '@app/utils/types';
import { exception, ServiceResponse, success, successPaginated } from '@app/utils/response';
import { Prisma } from '@prisma/core/client';
import { addDays, startOfDay } from 'date-fns';
import { paginate } from '@app/utils/helpers/utils';

@Injectable()
export class UsersService {
    constructor(
        private readonly dbService: CoreDbService,
    ) { }

    async getAllUsers(
        data: GenericFilterInterface
    ): Promise<ServiceResponse> {
        try {
            const filters: Prisma.UserWhereInput = {};

            // const filterableFields = ['email', 'id', 'details', 'details.first_name', 'details.surname', 'details.middle_name', 'details.phone'];
            // filterableFields.forEach(field => {
            //     if (data[field]) {
            //         filters[field] = data[field];
            //     }
            // });

            if (data.search_term) {
                filters.OR = [
                    { email: { contains: data.search_term, mode: 'insensitive' } },
                    {
                        details: {
                            first_name: { contains: data.search_term, mode: 'insensitive' },
                            surname: { contains: data.search_term, mode: 'insensitive' },
                            middle_name: { contains: data.search_term, mode: 'insensitive' },
                            phone: {
                                contains: data.search_term, mode: 'insensitive'
                            }
                        },
                    }
                ]
            }

            if (data.from_date || data.to_date) {
                filters.created_at = {};
                if (data.from_date) {
                    filters.created_at.gte = startOfDay(new Date(data.from_date));
                }
                if (data.to_date) {
                    filters.created_at.lte = startOfDay(addDays(new Date(data.to_date), 1));
                }
            }

            const [res, totalCount] = await Promise.all([
                this.dbService.user.findMany({
                    where: filters,
                    select: {
                        id: true,
                        email: true,
                        details: {
                            select: {
                                id: true,
                                user_id: true,
                                first_name: true,
                                surname: true,
                                middle_name: true,
                                phone: true,
                                role: true,
                                gender: true,
                                address: true,
                            }
                        },
                        created_at: true,
                        updated_at: true,
                    },
                    orderBy: {
                        created_at: "desc"
                    },
                    skip: (+data.page - 1) * +data.page_size || 1,
                    take: +data.page_size || 20,
                }),
                this.dbService.user.count({
                    where: filters
                })
            ]);
            const paginated = await paginate({ page: data.page, page_size: data.page_size, totalCount, data: res })
            return success(paginated, "Users loaded successfully");
        } catch (e) {
            console.error(e)
            exception({ message: e, customMessage: "Failed to load users" })
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
                    details: true
                }
            });
            if (!user) {
                exception({ message: "User not found", customMessage: "User not found" });
            }
            return success(user, "User loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load user" });
        }
    }
}
