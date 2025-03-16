import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { Reflector } from '@nestjs/core';

  import * as dotenv from 'dotenv';
import { DbService } from '@app/db';
import { Permission, PermissionLevel, UserDetail } from '@prisma/client';
import { Permissions } from '../decorators/permissions.decorator';
  
  dotenv.config()
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector, private readonly dbService: DbService) { }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_CONSTANT
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
  
      // CHECK PERMISSIONS DECORATOR
      const permissions = this.reflector.get(Permissions, context.getHandler());
      if (!permissions) {
        return true;
      }
      const user = await this.dbService.userDetail.findUnique({
        where: {
          user_id: request['user'].sub
        },
        include: {
          role: {
            include: {
              permissions: true
            }
          }
          // state: {
          //   include: {
          //     geoZone: true,
          //   }
          // },
          // role: {
          //   select: {
          //     permissions: true
          //   }
          // },
          // lga: true,
          // facility: true,
          // organization: true
        }
      })
      // RETURN TRUE FOR SUPERADMIN
      if (user.is_super_admin) {
        return true
      }
  
      // const geoZoneId = request.query?.geoZoneId ?? request.params?.geoZoneId;
      // const stateId = request.query?.stateId ?? request.params?.stateId;
      // const lgaId = request.query?.lgaId ?? request.params?.lgaId;
      // const wardId = request.query?.wardId ?? request.params?.wardId;
      // const facilityId = request.query?.facilityId ?? request.params?.facilityId;
      // const patientId = request.query?.patientId ?? request.params?.patientId;
  
      const res = this.matchPermissions(permissions, user, user.role?.permissions);
      return res;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }

    private async matchPermissions(
        permissions: string[],
        user: any,
        userPermissions?: Permission[],
      ): Promise<boolean> {
        const [resource, ...requiredPermissions] = permissions;
    
        // CHECK IF USER IS ORG ADMIN
        if (user.isOrgAdmin) {
          return true;
        }
    
        const permissionLevels = userPermissions
          .filter((p) => p.resource === resource)
          .map((p) => p.level);

          
        // MORE PERMISSION LOGIC
        return true
    }
    
}