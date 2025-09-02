import { Injectable } from '@nestjs/common';
import { CoreDbService } from '@app/db';
import { USER_SELECT } from '@app/utils/types';
import { exception, ServiceResponse, success } from '@app/utils/response';
import { Prisma } from '@prisma/core/client';
import { paginateQuery } from '@app/utils/helpers/prisma-utils';
import { FilterRoleInterface, FilterUserInterface, UpsertRoleDto } from 'apps/auth/src/dto/auth.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly dbService: CoreDbService,
    ) { }

    async upsertRole(data: UpsertRoleDto): Promise<ServiceResponse> {
        try {
            const { id, name, permission_ids, ...rest } = data;
            if (id) {
                const existingRole = await this.dbService.role.findUnique({ where: { id } });

                if (!existingRole) {
                    exception({ message: 'Role not found', customMessage: 'Role does not exist' });
                }

                const updatedRole = await this.dbService.role.update({
                    where: { id },
                    data: { 
                        name,
                        permissions: permission_ids ? {
                            set: permission_ids.map(pid => ({ id: pid }))
                        } : undefined,
                        ...rest
                     },
                });
                return success(updatedRole, 'Role updated successfully');
            } else {
                const existingRoleByName = await this.dbService.role.findFirst({ where: { name } });
                if (existingRoleByName) {
                    exception({ message: 'Role already exists', customMessage: 'Role with this name already exists' });
                }
                const newRole = await this.dbService.role.create({
                    data: { 
                        name,
                        permissions: permission_ids ? {
                            connect: permission_ids.map(pid => ({ id: pid }))
                        } : undefined,
                        ...rest
                     },
                });
                return success(newRole, 'Role created successfully');
            }
        } catch (error) {
            console.error(error);
            exception({ message: error, customMessage: 'Failed to create or update role' });
        }
    }

    async getRoles(filter?: FilterRoleInterface): Promise<ServiceResponse> {
        try {
            const { search_term, from_date, to_date, page, page_size } = filter;
            let where: Prisma.RoleWhereInput = {};

            if (from_date || to_date) {
                where.created_at = {};
            }

            if (search_term) {
                where.name = { contains: search_term, mode: 'insensitive' };
            }

            const paginatedRoles =
                await paginateQuery<Prisma.RoleWhereInput>({
                    model: this.dbService.role,
                    findArgs: { where },
                    page: +page,
                    page_size: +page_size,
                });
            return success(
                paginatedRoles,
                'Role(s) retrieved successfully',
            );
        } catch (error) {
            console.error(error);
            exception({ message: error, customMessage: 'Failed to retrieve roles' });
        }
    }

    async getAllUsers(filter?: FilterUserInterface): Promise<ServiceResponse> {
        try {
            const { search_term, from_date, to_date, page, page_size, role_id, ip } = filter;
            let where: Prisma.UserWhereInput = {};

            if (from_date || to_date) {
                where.created_at = {};
                if (from_date) {
                    where.created_at.gte = new Date(from_date);
                }
                if (to_date) {
                    where.created_at.lte = new Date(to_date);
                }
            }

            if (role_id || ip) {
                where.details = {};

                if (role_id) {
                    where.details.role_id = role_id;
                }

                if (ip) {
                    where.details.actions = {
                        some: {
                            ip: { contains: ip, mode: 'insensitive' },
                        },
                    };
                }
            }

            if (filter.search_term) {
                where.OR = [
                    { email: { contains: search_term, mode: 'insensitive' } },
                    {
                        details: {
                            is: {
                                OR: [
                                    { first_name: { contains: search_term, mode: 'insensitive' } },
                                    { middle_name: { contains: search_term, mode: 'insensitive' } },
                                    { surname: { contains: search_term, mode: 'insensitive' } },
                                    { phone: { contains: search_term, mode: 'insensitive' } },
                                ],
                            },
                        },
                    },
                ];
            }

            const paginatedUsers =
                await paginateQuery<Prisma.UserWhereInput>({
                    model: this.dbService.user,
                    findArgs: { where, select: USER_SELECT },
                    page: +page,
                    page_size: +page_size,
                });
            return success(
                paginatedUsers,
                'User(s) retrieved successfully',
            );
        } catch (err) {
            exception({
                message: err,
                customMessage: 'Failed to retrieve users',
            });
        }
    }


    async getUserById(
        userId: string
    ): Promise<ServiceResponse> {
        try {
            const user = await this.dbService.user.findUnique({
                where: { id: userId },
                select: {
                    email: true,
                    id: true,
                    details: true
                }
            });
            if (!user) {
                exception({ message: "User not found", customMessage: "User not found" });
            }
            return success(user, "User loaded successfully");
        } catch (e) {
            console.error(e);
            exception({ message: e, customMessage: "Failed to load user" });
        }
    }
}
