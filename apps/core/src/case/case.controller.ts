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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/replica/client';


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
    async findAllCases() {
        return mapErrorCodeToHttpResponse(await this.caseService.findAllCases());
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
