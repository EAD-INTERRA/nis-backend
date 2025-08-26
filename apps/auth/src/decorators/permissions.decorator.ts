import { PERMISSION, RESOURCE } from '@app/db/data/generated/resource.enum';
import { Reflector } from '@nestjs/core';

export interface PermissionDecoratorOptions {
    resource: RESOURCE;
    permission: PERMISSION;
}

export const Permissions = Reflector.createDecorator<PermissionDecoratorOptions>();