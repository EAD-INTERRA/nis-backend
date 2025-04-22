import { AccountService } from '@app/replica/account/account.service';
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
    path: 'account',
    version: '1'
})
@ApiTags('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Post('custom')
    async createAccountCustom(@Body() data: Prisma.AccountCustomCreateInput) {
        const res = await this.accountService.createAccountCustom(data)
        return mapErrorCodeToHttpResponse(res);
    }
   
    @Get('custom')
    async findAllAccountsCustom() {
        return mapErrorCodeToHttpResponse(await this.accountService.findAllAccountsCustom());
    }

    @Get('custom/:id')
    async findAccountCustom(@Param('id') id: string) {
        return mapErrorCodeToHttpResponse(await this.accountService.findAccountCustom(id));
    }

    @Patch('custom/:id')
    async updateCustom(@Param('id') id: string, @Body() data: Prisma.AccountCustomUpdateInput) {
        return mapErrorCodeToHttpResponse(await this.accountService.updateAccountCustom(id, data));
    }

    @Post()
    async createAccount(@Body() data: Prisma.AccountCreateInput) {
        const res = await this.accountService.createAccount(data)
        return mapErrorCodeToHttpResponse(res);
    }

    @Get()
    async findAllAccounts() {
        return mapErrorCodeToHttpResponse(await this.accountService.findAllAccounts());
    }
   
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return mapErrorCodeToHttpResponse(await this.accountService.findAccount(id));
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: Prisma.AccountUpdateInput) {
        return mapErrorCodeToHttpResponse(await this.accountService.updateAccount(id, data));
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.caseService.remove(id);
    // }
}
