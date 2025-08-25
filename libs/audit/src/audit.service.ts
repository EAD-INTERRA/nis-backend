import { CoreDbService } from '@app/db';
import { exception, ServiceResponse, success, successPaginated } from '@app/utils/response';
import { GenericFilterInterface } from '@app/utils/types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/core/client';
import { addDays, startOfDay } from 'date-fns';
import { AUDIT_SELECT } from './types';
import { paginateQuery } from '@app/utils/helpers/prisma-utils';

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

            // Paginate Prisma query with type-safety
            const paginatedAudits =
                await paginateQuery<Prisma.AuditWhereInput>({
                    model: this.dbService.audit,
                    findArgs: { where: filters, select: AUDIT_SELECT },
                    page: +data.page,
                    page_size: +data.page_size,
                });

            // const [res, total_count] = await Promise.all([
            //     this.dbService.audit.findMany({
            //         where: filters,
            //         include: {
            //             user: true
            //         },
            //         orderBy: {
            //             created_at: "desc"
            //         },
            //         skip: (+data.page - 1) * +data.page_size || 0,
            //         take: +data.page_size || 10,
            //     }),
            //     this.dbService.audit.count({
            //         where: filters
            //     })
            // ]);

            // const paginated = paginate({ page: data.page, page_size: data.page_size, total_count, data: res })
            return success(paginatedAudits, "Audit trail loaded successfully")
        } catch (e) {
            console.error(e)
            exception({ message: e, customMessage: "Failed to load audit trail" })
        }
    }
}
