import { CaseService } from '@app/replica/case/case.service';
import { CreateCaseDto } from '@app/replica/dtos/create-case.dto';
import { CreateCaseCustomDto } from '@app/replica/dtos/create-casecustom.dto';
import { UpdateCaseDto } from '@app/replica/dtos/update-case.dto';
import { UpdateCaseCustomDto } from '@app/replica/dtos/update-casecustom.dto';
import { mapErrorCodeToHttpResponse } from '@app/utils/response';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/replica/client';
import { GenerateApiQueryParams, GenerateQueryParams } from '../helpers/utils';
import { CaseFilterInterface } from '@app/replica/interfaces';


@Controller({
    path: 'case',
    version: '1'
})
@ApiTags('case')
export class CaseController {
    constructor(private readonly caseService: CaseService) { }

    // @Post('custom')
    // async createCustomCase(@Body() data: CreateCaseCustomDto) {
    //     const res = await this.caseService.createCaseCustom(data)
    //     return mapErrorCodeToHttpResponse(res);
    // }

    // @Get('custom')
    // async findAllCustomCases() {
    //     return mapErrorCodeToHttpResponse(await this.caseService.findAllCustomCases());
    // }

    // @Get('custom/:id')
    // async findCustomCase(@Param('id') id: string) {
    //     return mapErrorCodeToHttpResponse(await this.caseService.findCustomCase(id));
    // }

    // @Patch('custom/:id')
    // async updateCustomCase(@Param('id') id: string, @Body() data: UpdateCaseCustomDto) {
    //     return mapErrorCodeToHttpResponse(await this.caseService.updateCustomCase(id, data));
    // }


    @Post()
    async createCase(@Body() data: CreateCaseDto) {
        const res = await this.caseService.createCase(data)
        return mapErrorCodeToHttpResponse(res);
    }

    @Get()
    @GenerateApiQueryParams(CaseFilterInterface)
    async findAllCases(
        @Query('account_id') account_id: string,
        @Query('type') type: string,
        @Query('assigned_user_id') assigned_user_id: string,
        // @Query('date_entered') date_entered: string,
        // @Query('date_modified') date_modified: string,
        @Query('created_by') created_by: string,
        @Query('case_number') case_number: string,
        @Query('passport_number') passport_number: string,
        @Query('active_status_c') active_status_c: string,
        @Query('page') page: string,
        @Query('page_size') page_size: string,
        // @GenerateQueryParams(CaseFilterInterface) 
    ) {
        return mapErrorCodeToHttpResponse(await this.caseService.findAllCases({
            account_id,
            type,
            assigned_user_id,
            // date_entered,
            // date_modified,
            created_by,
            case_number,
            passport_number,
            active_status_c,
            page: Number(page) || 1,
            page_size: Number(page_size) || 10,
        } as CaseFilterInterface));
    }

    @Get('crm/:id_c')
    async findCaseByIdC(@Param('id_c') id_c: string) {
        return mapErrorCodeToHttpResponse(await this.caseService.findByIdC(id_c));
    }

    @Get(':id')
    async findCase(@Param('id') id: string) {
        return mapErrorCodeToHttpResponse(await this.caseService.findCase(id));
    }

    @Patch(':id')
    async updateCase(@Param('id') id: string, @Body() data: UpdateCaseDto) {
        return mapErrorCodeToHttpResponse(await this.caseService.updateCase(id, data));
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.caseService.remove(id);
    // }
}
