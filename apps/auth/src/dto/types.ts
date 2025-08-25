import { EXAMPLE_PAGINATED_RESPONSE } from "@app/utils/helpers/utils";
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Permission } from "@prisma/core/client";


export class EncodedJWT {
    sub: string;
    email: string;
    role: {
        id: string;
        name: string;
        permissions: Permission[]
        created_by: string | null;
        created_at: Date | null;
        updated_by: string | null;
        updated_at: Date | null;
    };
    state_id: string | null;
    role_id: string | null;
    gender: Gender | null;
    is_active: boolean;
    is_admin: boolean;
    is_super_admin: boolean;
    creator_id: string | null;
    updater_id: string | null;
    iat?: number;
    exp?: number;
    jti?: string;
    aud?: string;
    iss?: string;
}


export class UserResponseDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    last_login: Date;

    @ApiProperty({
    })
    details: {
        first_name: string;
        middle_name: string;
        surname: string;
        is_active: boolean;
        phone: string;
        creator: {
            user_id: string;
            first_name: string;
            middle_name: string;
            surname: string;
        };
        role: {
            name: string;
        };
    };

    static example = {
        ...EXAMPLE_PAGINATED_RESPONSE,
        body: [
            {
                id: "84c41d6d-00c2-4ae8-b772-363686a9f02a",
                email: "user@example.com",
                created_at: "2025-03-07T14:27:12.000Z",
                last_login: "2025-03-08T09:00:00.000Z",
                details: {
                    first_name: "Jane",
                    middle_name: "A.",
                    surname: "Doe",
                    is_active: true,
                    phone: "08011112222",
                    creator: {
                        user_id: "84c41d6d-00c2-4ae8-b772-363686a9f02a",
                        first_name: "Admin",
                        middle_name: "M.",
                        surname: "Smith"
                    },
                    role: {
                        name: "Super Admin"
                    }
                }
            }
        ]
    }
}