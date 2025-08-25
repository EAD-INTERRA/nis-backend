import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomHttpResponse, mapErrorCodeToHttpResponse } from '@app/utils/response';

@Controller({
  version: '1'
})

export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('permissions')
  async getPermissions(): Promise<CustomHttpResponse> {
    return mapErrorCodeToHttpResponse(await this.appService.getPermissions());
  }
}
