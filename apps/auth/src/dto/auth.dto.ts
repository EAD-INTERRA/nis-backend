import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';  

export class LoginDto {
    @IsEmail()
    email?: string;
    phone?: string;
    @IsNotEmpty()
    password: string;
}

export class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}

export class OtpLoginDto extends PartialType(LoginDto) {
    email?: string;
    otp?: number;
}


export class ResetPasswordDto { 
    email?: string;
    phone?: string; 
    newPassword: string; 
    resetToken: string 
}


export class CreateUserDto {
    name?: string;
    email?: string;
    password?: string;

    phone?: string;

    /**
     * The user's gender
     * @example 'MALE' | 'FEMALE' | 'OTHER'
    */
    @ApiProperty({
        description: `The user's gender`,
        example: Gender,
      })
    gender?: Gender;
    address?: string;
}