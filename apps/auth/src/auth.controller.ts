import { Body, Controller, Get, HttpCode, HttpStatus, Ip, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomHttpResponse, mapErrorCodeToHttpResponse } from '@app/utils/response';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { ActivateAccountDto, ChangePasswordDto, CreateUserDto, FilterRoleInterface, ForgotPasswordDto, LoginDto, OtpLoginDto, ResetPasswordDto, UpsertRoleDto } from './dto/auth.dto';
import { UsersService } from '@app/users';

@Controller({
  path: 'auth',
  version: '1'
})

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    // private readonly auditService: AuditService,
    private readonly jwtService: JwtService,
  ) { }

  // @Get(":id")
  // getHello(
  //   @Param('id') id: number
  // ): any {
  //   const res = this.authService.getHello(+id);
  //   return mapErrorCodeToHttpResponse(res)
  // }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post("roles")
  async upsertRole(
    @Request() req,
    @Body() roleData: UpsertRoleDto
  ) {
    const res = await this.userService.upsertRole({ 
      created_by: roleData.id ? undefined : req.user.sub, 
      updated_by: roleData.id ? req.user.sub : undefined,
      ...roleData 
    });
    return mapErrorCodeToHttpResponse(res)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get("roles")
  async getRoles(
    @Query() filter: FilterRoleInterface
  ) {
    const res = await this.userService.getRoles(filter);
    return mapErrorCodeToHttpResponse(res)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post("register")
  async register(
    @Body() userToRegister: CreateUserDto
  ) {
    const res = await this.authService.register(userToRegister);
    return mapErrorCodeToHttpResponse(res)
  }


  @Post('refresh-token')
  async refreshAccessToken(@Body() body: { refresh_token: string }) {
    // const { refresh_token } = body;
    const { userId, refresh_token } = await this.authService.validateRefreshToken(body.refresh_token);

    const jwtPayload = { sub: userId };
    const newAccessToken = await this.jwtService.signAsync(jwtPayload);

    return mapErrorCodeToHttpResponse({ code: 0, body: { access_token: newAccessToken, refresh_token } });
  }

  @Post('activate')
  async activateAccount(@Body() body: ActivateAccountDto): Promise<CustomHttpResponse> {
    const res = await this.authService.activateAccount({ token: +body.token })
    return mapErrorCodeToHttpResponse(res)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userToLogin: LoginDto, @Ip() ip) {
    const res = await this.authService.login(userToLogin, ip);
    return mapErrorCodeToHttpResponse(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('otp')
  async otpLogin(@Body() userToLoginOtp: OtpLoginDto) {
    const res = await this.authService.otpLogin(userToLoginOtp);
    return mapErrorCodeToHttpResponse(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('resend-otp')
  async resendLoginOtp(@Body() userToLoginOtp: OtpLoginDto) {
    const res = await this.authService.resendLoginOtp(userToLoginOtp);
    return mapErrorCodeToHttpResponse(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('resetToken')
  async requestPasswordResetToken(@Query('email') email: string) {
    const res = await this.authService.getPasswordResetToken(email);
    return mapErrorCodeToHttpResponse(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() userToResetPassword: ResetPasswordDto) {
    const res = await this.authService.resetPassword(userToResetPassword);
    return mapErrorCodeToHttpResponse(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    const res = await this.authService.sendPasswordResetToken(body);
    return mapErrorCodeToHttpResponse(res);
  }



  @UseGuards(AuthGuard)
  // @UseGuards(PermissionGuard)
  // @Permissions([Resource.USER_MANAGEMENT, PermissionLevel.READ])
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req): Promise<CustomHttpResponse> {
    const user = req.user.sub

    const res = await this.authService.getProfile(user)
    return mapErrorCodeToHttpResponse(res)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('profile/change-password')
  async changePassword(@Request() req, @Body() data: ChangePasswordDto): Promise<CustomHttpResponse> {
    const authenticatedUser = req.user

    const res = await this.authService.changePassword(authenticatedUser.sub, { ...data })
    return mapErrorCodeToHttpResponse(res)
  }
}
