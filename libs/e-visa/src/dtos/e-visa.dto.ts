import { IsString, IsNotEmpty, IsOptional, IsDate, IsEnum, IsInt, IsArray, IsBoolean, IsNumber, IsPhoneNumber } from 'class-validator';
import { Gender, MaritalStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateOrUpdateApplicantDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsOptional()
    middle_name?: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date_of_birth: Date;

    @IsString()
    @IsNotEmpty()
    place_of_birth: string;

    @IsString()
    @IsNotEmpty()
    nationality_id: string;

    @IsString()
    @IsNotEmpty()
    passport_type_id: string;
   
    @IsString()
    @IsOptional()
    visa_type_id: string;
   
    @IsString()
    @IsOptional()
    visa_type_key: string;

    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @IsEnum(MaritalStatus)
    @IsNotEmpty()
    marital_status: MaritalStatus;

    @IsString()
    @IsNotEmpty()
    passport_no: string;

    @IsString()
    @IsNotEmpty()
    phone_no: string;

    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsOptional()
    image_url: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    passport_expiry_date: Date;
}


export class CreateOrUpdatePortOfEntryDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class CreateOrUpdateCountryDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class CreateOrUpdateStateDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}


export class CreateOrUpdateNationalityDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    external_id: string;
}

export class CreateOrUpdateVisaTypeDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsOptional()
    nationality_ids: string[];

    @IsArray()
    @IsOptional()
    requirement_ids: string[];

    @IsInt()
    @IsOptional()
    fee?: number;

    @IsInt()
    @IsOptional()
    validity?: number;

    @IsInt()
    @IsOptional()
    max_stay?: number;

    @IsString()
    @IsOptional()
    description?: string;
}


export class CreateOrUpdateVisaRequirementDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsOptional()
    visa_type_ids: string[];

    @IsString()
    @IsOptional()
    description?: string;
}


export class CreateOrUpdatePassportTypeDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsOptional()
    nationality_ids: string[];

    @IsString()
    @IsOptional()
    description?: string;
}


export class CreateOrUpdateTravelInformationDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    applicant_id: string;

    @IsString()
    @IsNotEmpty()
    purpose: string;

    @IsString()
    @IsNotEmpty()
    airline: string;

    @IsString()
    @IsNotEmpty()
    flight_no: string;

    @IsString()
    @IsNotEmpty()
    country_of_departure_id: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date_of_departure: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date_of_arrival: Date;

    @IsString()
    @IsNotEmpty()
    port_id: string;

    @IsInt()
    @IsNotEmpty()
    duration_of_stay: number;
}


export class CreateOrUpdateContactDetailDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    applicant_id: string;

    @IsString()
    @IsNotEmpty()
    contact_name: string;

    @IsString()
    @IsPhoneNumber('NG')
    @IsNotEmpty()
    contact_phone: string;

    @IsString()
    @IsNotEmpty()
    contact_email: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    postal_code: string;

    @IsString()
    @IsNotEmpty()
    state_id: string;
}


export class CreateOrUpdateSupportingDocumentDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    url: string;

    @IsString()
    @IsNotEmpty()
    visa_requirement_id: string;

    @IsString()
    @IsNotEmpty()
    applicant_id: string;
}



export class EVisaFilterInterface {
    @IsString()
    @IsOptional()
    user_id?: string;

    @IsString()
    @IsOptional()
    created_by?: string;

    @IsString()
    @IsOptional()
    order_by?: 'asc' | 'desc';

    @IsString()
    @IsOptional()
    search_term?: string;

    // @IsBoolean()
    // @IsOptional()
    // paginate?: boolean = false;

    @IsNumber()
    @IsOptional()
    page?: number;

    @IsNumber()
    @IsOptional()
    page_size?: number;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    from_date?: string | Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    to_date?: string | Date;
}