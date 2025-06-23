import { PrismaClient } from "@prisma/core/client";
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

// const prismaClient = new PrismaClient();

export function generateToken(prefix?: string, suffix?: string) {
    // Generate a password reset token with a length of 32 bytes (length/2 hex characters)
    let token = crypto.randomBytes(8).toString('hex');
    if (prefix) {
        token = prefix + token
    }
    if (suffix) {
        token += suffix
    }
    return token
}


export function generateNumericToken() {
    return Math.floor(100000 + Math.random() * 900000)
}

export async function createSuperAdmin(db: PrismaClient = new PrismaClient()) {
    const prisma = db;
    const saltOrRounds = 10;
    const hashed = await bcrypt.hash("pass", saltOrRounds);

    try {
        const superAdmin = await prisma.user.upsert({
            create: {
                email: "superadmin@test.com",
                password: hashed,
                password_reset_token: generateNumericToken(),
                details: {
                    create: {
                        first_name: "Super Admin",
                        is_super_admin: true,
                        is_active: true
                    }
                }
            },
            where: {
                email: "superadmin@test.com"
            },
            update: {}
        });
    
        // if (superAdmin) {
        //     await prisma.userDetail.create({
        //         data: {
        //             user_id: superAdmin.id,
        //             name: "Super Admin",
        //             is_super_admin: true,
        //             is_active: true
        //         }
        //     })
        // }
    } catch (error) {
        console.error('Error creating super admin:', error);
    }
}

// createSuperAdmin()
//     .catch(e => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prismaClient.$disconnect();
//     });