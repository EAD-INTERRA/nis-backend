import { CoreDbService } from '@app/db';
import { exception, ServiceResponse, success } from '@app/utils/response';
import { GenericFilterInterface } from '@app/utils/types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/core/client';
import { addDays, startOfDay } from 'date-fns';

@Injectable()
export class AuditService {
    constructor(
        private readonly dbService: CoreDbService,
    ) { }

    async getAllAuditLogs(
        data: GenericFilterInterface
    ): Promise<ServiceResponse> {
        try {
            const filters: Prisma.AuditWhereInput = {};

            const filterableFields = ['ip', 'user_id', 'path'];
            filterableFields.forEach(field => {
                if (data[field]) {
                    filters[field] = data[field];
                }
            });

            if (data.search_term) {
                filters.OR = [
                    { action: { contains: data.search_term, mode: 'insensitive' } },
                    { description: { contains: data.search_term, mode: 'insensitive' } },
                    { path: { contains: data.search_term, mode: 'insensitive' } },
                ];
            }

            if (data.from_date || data.to_date) {
                filters.date = {};
                if (data.from_date) {
                    filters.date.gte = startOfDay(new Date(data.from_date));
                }
                if (data.to_date) {
                    filters.date.lte = startOfDay(addDays(new Date(data.to_date), 1));
                }
            }

            const res = await this.dbService.audit.findMany({
                where: filters,
                include: {
                    user: true
                },
                orderBy: {
                    date: "desc"
                }
            })

            return success(res, "Audit trail loaded successfully")
        } catch (e) {
            console.error(e)
            exception({ message: e, customMessage: "Failed to load audit trail" })
        }
    }
}
