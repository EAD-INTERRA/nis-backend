import { AuditService } from '@app/audit';
import { ApiCustomResponse } from '@app/utils/decorators/swagger.decorator';
import { CustomHttpResponse, mapErrorCodeToHttpResponse } from '@app/utils/response';
import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'apps/auth/src/guards/auth.guard';

@Controller({
    path: 'audit',
    version: '1'
})
@ApiTags('audit')
export class AuditController {
    constructor (private readonly auditService: AuditService){}

    @UseGuards(AuthGuard)
    @ApiCustomResponse({
        summary: 'Get all audit logs',
        example: {
            statusCode: 200,
            message: 'Audit logs retrieved successfully',
            data: [
                {
                    id: 1,
                    user_id: '123',
                    ip: '192.168.1.1',
                    action: 'LOGIN',
                    path: '/api/v1/auth/login',
                    description: 'User logged in',
                    date: '2025-03-07T14:27:12.000Z'
                }
            ]
        },
        queries: [
            'user_id',
            'org_id',
            'ip',
            'action',
            'search_term',
            'from_date',
            'to_date',
            'page',
            'page_size'
        ]
    })
    // @Permissions([Resource.AUDIT_MANAGEMENT, PermissionLevel.READ])
    @ApiBearerAuth()
    @Get()
    async getAllAuditController(
        @Request() req,
        @Query('user_id') user_id?: string, 
        @Query('org_id') org_id?: string, 
        @Query('ip') ip?: string,
        @Query('action') action?: string,
        @Query('search_term') search_term?: string,
        @Query('from_date') from_date?: string | Date,
        @Query('to_date') to_date?: string | Date,
        @Query('page') page?: number, 
        @Query('page_size') page_size?: number
    ): Promise<CustomHttpResponse>{
        const authenticatedUser = req.user;
       
        const res = await this.auditService.getAllAuditLogs({
            user_id,
            org_id,
            ip,
            search_term,
            from_date,
            to_date,
            page,
            page_size
        })
        return mapErrorCodeToHttpResponse(res)
    }

    // @UseGuards(AuthGuard)
    // // @Permissions([Resource.AUDIT_MANAGEMENT, PermissionLevel.READ])
    // @Get(':id')
    // async getAuditByIdController(@Param('id') id: string): Promise<CustomHttpResponse>{
    //     const res = await this.auditService.findAuditById(+id)
    //     return mapErrorCodeToHttpResponse(res)
    // }

}
