import { CaseService } from '@app/replica/case/case.service';
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

    @Post('custom')
    async createCustomCase(@Body() data: Prisma.CaseCustomCreateInput) {
        const res = await this.caseService.createCaseCustom(data)
        return mapErrorCodeToHttpResponse(res);
    }

    @Get('custom')
    async findAllCustomCases() {
        return mapErrorCodeToHttpResponse(await this.caseService.findAllCustomCases());
    }

    @Get('custom/:id')
    async findCustomCase(@Param('id') id: string) {
        return mapErrorCodeToHttpResponse(await this.caseService.findCustomCase(id));
    }

    @Patch('custom/:id')
    async updateCustomCase(@Param('id') id: string, @Body() data: Prisma.CaseCustomUpdateInput) {
        return mapErrorCodeToHttpResponse(await this.caseService.updateCustomCase(id, data));
    }
    
    
    @Post()
    async createCase(@Body() data: Prisma.CaseCreateInput) {
        const res = await this.caseService.createCase(data)
        return mapErrorCodeToHttpResponse(res);
    }

    @Get()
    async findAllCases() {
        return mapErrorCodeToHttpResponse(await this.caseService.findAllCases());
    }

    @Get(':id')
    async findCase(@Param('id') id: string) {
        return mapErrorCodeToHttpResponse(await this.caseService.findCase(id));
    }

    @Patch(':id')
    async updateCase(@Param('id') id: string, @Body() data: Prisma.CaseUpdateInput) {
        return mapErrorCodeToHttpResponse(await this.caseService.updateCase(id, data));
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.caseService.remove(id);
    // }
}
