import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import * as dotenv from 'dotenv';
import { CoreDbService } from '@app/db';
import { Permission, UserDetail } from '@prisma/core/client';
import { PermissionDecoratorOptions, Permissions } from '../decorators/permissions.decorator';
import { EncodedJWT } from '../dto/types';

dotenv.config()

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private readonly dbService: CoreDbService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user: EncodedJWT } = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: EncodedJWT = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_CONSTANT
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    // CHECK PERMISSIONS DECORATOR
    const permissions = this.reflector.get(Permissions, context.getHandler());
    if (!permissions) {
      return true;
    }
    console.log("PERMISSIONS: ", permissions)
    // RETURN TRUE FOR SUPERADMIN
    if (request.user.is_super_admin || request.user.is_admin) {
      return true
    }
    const res = this.matchPermissions(permissions, request.user.role?.permissions);
    return res;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // console.log("TOKENN: ", token)
    return type === 'Bearer' ? token : undefined;
  }


  private matchPermissions(
    permissions: PermissionDecoratorOptions,
    userPermissions?: Permission[],
  ): boolean {
    const { resource, permission } = permissions;
    if (!resource || !permission) {
      return false; // Invalid permission format
    }
    const hasPermission = (userPermissions ?? [])
      .some((p) => p.resource === resource && p.level === permission);

    // console.log("USER PERMISSIONS: ", userPermissions);
    // console.log("HAS PERMISSION: ", hasPermission);

    if (!hasPermission) {
      throw new ForbiddenException({ 
        message: "Forbidden Action", 
        customMessage: `You do not have permission to access this resource: {${resource.toUpperCase()}} requiring permission level: {${permission.toUpperCase()}}`,
        error: "Forbidden",
        statusCode: 403
      });
    }

    return hasPermission
  }

}