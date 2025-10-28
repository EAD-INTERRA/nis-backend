import { UsersService } from '@app/users';
import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CustomHttpResponse, mapErrorCodeToHttpResponse } from '@app/utils/response';
import { ApiCustomResponse } from '@app/utils/decorators/swagger.decorator';
import { UpdatePassportRecordDto, UpdateUserDetailsDto } from '@app/users/users.dto';

@Controller({
    path: 'users',
    version: '1'
})
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @ApiCustomResponse({
        summary: 'Get all users',
        example: {
            statusCode: 200,
            message: 'Users retrieved successfully',
        },
        queries: [
            'search_term',
            'from_date',
            'to_date',
            'page',
            'page_size'
        ]
    })
    @ApiBearerAuth()
    @Get()
    async getAllUsers(
        @Request() req,
        @Query('search_term') search_term?: string,
        @Query('from_date') from_date?: string | Date,
        @Query('to_date') to_date?: string | Date,
        @Query('page') page?: number,
        @Query('page_size') page_size?: number
    ): Promise<CustomHttpResponse> {
        const authenticatedUser = req.user;

        const res = await this.usersService.getAllUsers({
            search_term,
            from_date,
            to_date,
            page,
            page_size
        })
        return mapErrorCodeToHttpResponse(res)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('me')
    async getAuthenticatedUser(
        @Request() req
    ): Promise<CustomHttpResponse> {
        const authenticatedUser = req.user;

        const res = await this.usersService.getUserById(authenticatedUser.sub)
        return mapErrorCodeToHttpResponse(res)
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('me/applications')
    async getUserApplications(
        @Request() req
    ): Promise<CustomHttpResponse> {
        const authenticatedUser = req.user;
        console.log('Authenticated User: ', authenticatedUser);

        const res = await this.usersService.getApplicationsByUserId(authenticatedUser.sub)
        return mapErrorCodeToHttpResponse(res)
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post('me/passport-records')
    async upsertPassportRecord(
        @Body() data: UpdatePassportRecordDto,
        @Request() req
    ): Promise<CustomHttpResponse> {
        const authenticatedUser = req.user;

        const res = await this.usersService.upsertPassportRecord({ user_id: authenticatedUser.sub, ...data })
        return mapErrorCodeToHttpResponse(res)
    }
   
   
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Patch('me')
    async updateUserDetails(
        @Body() data: UpdateUserDetailsDto,
        @Request() req
    ): Promise<CustomHttpResponse> {
        const authenticatedUser = req.user;

        const res = await this.usersService.updateUserDetails({ user_id: authenticatedUser.sub, ...data })
        return mapErrorCodeToHttpResponse(res)
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get(':user_id')
    async getUserById(
        @Param('user_id') user_id: string
    ): Promise<CustomHttpResponse> {
        const res = await this.usersService.getUserById(user_id)
        return mapErrorCodeToHttpResponse(res)
    }
}
