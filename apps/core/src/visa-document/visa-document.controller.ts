
import { VisaDocumentService } from '@app/replica/visa-document/visa-document.service';
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
    path: 'visa-document',
    version: '1'
})
@ApiTags('visa-document')
export class VisaDocumentController {
    constructor(private readonly visaDocService: VisaDocumentService) { }

    @Post('custom')
    async createCustomisaDocument(@Body() data: Prisma.VisaDocumentCustomCreateInput) {
        const res = await this.visaDocService.createVisaDocumentCustom(data)
        return mapErrorCodeToHttpResponse(res);
    }

    @Get('custom')
    async findAllCustomVisaDocuments() {
        return mapErrorCodeToHttpResponse(await this.visaDocService.findAllCustomVisaDocuments());
    }

    @Get('custom/:id')
    async findCustomVisaDocument(@Param('id') id: string) {
        return mapErrorCodeToHttpResponse(await this.visaDocService.findCustomVisaDocument(id));
    }

    @Patch('custom/:id')
    async updateCustomVisaDocument(@Param('id') id: string, @Body() data: Prisma.VisaDocumentCustomUpdateInput) {
        return mapErrorCodeToHttpResponse(await this.visaDocService.updateCustomVisaDocument(id, data));
    }
    
    
    @Post()
    async createVisaDocument(@Body() data: Prisma.VisaDocumentCreateInput) {
        const res = await this.visaDocService.createVisaDocument(data)
        return mapErrorCodeToHttpResponse(res);
    }

    @Get()
    async findAllVisaDocuments() {
        return mapErrorCodeToHttpResponse(await this.visaDocService.findAllVisaDocuments());
    }

    @Get(':id')
    async findVisaDocument(@Param('id') id: string) {
        return mapErrorCodeToHttpResponse(await this.visaDocService.findVisaDocument(id));
    }

    @Patch(':id')
    async updateVisaDocument(@Param('id') id: string, @Body() data: Prisma.VisaDocumentUpdateInput) {
        return mapErrorCodeToHttpResponse(await this.visaDocService.updateVisaDocument(id, data));
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.caseService.remove(id);
    // }
}
