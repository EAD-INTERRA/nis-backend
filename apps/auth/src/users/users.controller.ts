import { UsersService } from '@app/users';
import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CustomHttpResponse, mapErrorCodeToHttpResponse } from '@app/utils/response';
import { ApiCustomResponse } from '@app/utils/decorators/swagger.decorator';

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

        const res = await this.usersService.getUserById(authenticatedUser.id)
        return mapErrorCodeToHttpResponse(res)
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get(':userId')
    async getUserById(
        @Param('userId') userId: string
    ): Promise<CustomHttpResponse> {
        const res = await this.usersService.getUserById(userId)
        return mapErrorCodeToHttpResponse(res)
    }
}
