import { PaginationFilter } from '@app/utils/types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Gender } from '@prisma/core/client';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';  

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

export class ForgotPasswordDto {
    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;
}

export class ActivateAccountDto {
    @IsString()
    @IsOptional()
    userId?: string;

    @IsNumber()
    @IsOptional()
    token?: number;
}

export class ResetPasswordDto { 
    @IsString()
    @IsOptional()
    // @IsEmail() 
    email?: string;
    
    @IsString()
    @IsOptional() 
    // @IsPhoneNumber("NG")
    phone?: string; 

    @IsString()
    @IsNotEmpty() 
    newPassword: string;
    
    @IsNumber()
    @IsNotEmpty() 
    resetToken: number 
}


export class CreateUserDto {

    // @IsString()
    // @IsOptional()
    // id?: string;

    @IsString()
    @IsNotEmpty()    
    first_name: string;

    @IsString()
    @IsOptional() 
    middle_name?: string;

    @IsString()
    @IsNotEmpty() 
    surname: string;
    
    // @IsString()
    // @IsNotEmpty() 
    // state_id: string;

    @IsString()
    // @IsEmail() 
    email: string;

    @IsString()
    @IsOptional() 
    password?: string;

    @IsString()
    // @IsPhoneNumber("NG") 
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

    @IsString()
    @IsOptional() 
    address?: string;
}


export class FilterUserInterface extends PaginationFilter {
    @IsOptional()
    search_term?: string

    @IsOptional()
    role_id?: string
   
    @IsOptional()
    ip?: string
    
    @IsOptional()
    from_date?: string | Date;
    
    @IsOptional()
    to_date?: string | Date;
}


export class EditUserDto {
    user_id: string;
    @IsOptional()
    is_active?: boolean;
    
    @IsOptional()
    is_admin?: boolean;

    @IsOptional()
    first_name?: string;

    @IsOptional()
    middle_name?: string;

    @IsOptional()
    surname?: string;

    @IsOptional()
    phone?: string;

    @IsOptional()
    role_id?: string
    
}