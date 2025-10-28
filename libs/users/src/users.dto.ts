import { ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/core/client/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdatePassportRecordDto {
    @ApiPropertyOptional({
        description: 'Passport Number',
    })
    @IsOptional()
    passport_no?: string;

    @ApiPropertyOptional({
        description: 'User ID',
    })
    @IsOptional()
    user_id?: string;

    @ApiPropertyOptional({
        description: 'Passport Record ID',
    })
    @IsOptional()
    id?: string;

    @ApiPropertyOptional({
        description: 'Active Status',
        enum: [true, false],
    })
    @IsOptional()
    active?: boolean = true;
}


export class UpdateUserDetailsDto {
    @ApiPropertyOptional({
        description: 'User ID (for internal use)',
    })
    @IsOptional()
    user_id?: string;

    @ApiPropertyOptional({
        description: 'First Name',
    })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiPropertyOptional({
        description: 'Middle Name',
    })
    @IsOptional()
    @IsString()
    middle_name?: string;

    @ApiPropertyOptional({
        description: 'Surname',
    })
    @IsOptional()
    @IsString()
    surname?: string;

    @ApiPropertyOptional({
        description: 'Phone Number',
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({
        description: 'Gender',
        enum: Gender,
    })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @ApiPropertyOptional({
        description: 'Address',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({
        description: 'Visa Center',
    })
    @IsOptional()
    @IsString()
    visa_center?: string;

    @ApiPropertyOptional({
        description: 'State ID',
    })
    @IsOptional()
    @IsString()
    state_id?: string;

    @ApiPropertyOptional({
        description: 'Country ID',
    })
    @IsOptional()
    @IsString()
    country_id?: string;

    @ApiPropertyOptional({
        description: 'Role ID',
    })
    @IsOptional()
    @IsString()
    role_id?: string;
}