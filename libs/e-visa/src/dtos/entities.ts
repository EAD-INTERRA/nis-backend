import { transformDate } from "@app/utils/helpers/utils";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString } from "class-validator";

export class EVisaWebhookPayload {
    @ApiProperty({ required: true })
    @IsString()
    event: string;

    @ApiProperty({ required: false })
    @IsOptional()
    id_on_engine?: string;

    @ApiProperty({ required: true })
    @IsString()
    application_id: string;

    @ApiProperty({ required: true })
    @IsString()
    salutation: string;

    @ApiProperty({ required: true })
    @IsString()
    first_name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    middle_name?: string;

    @ApiProperty({ required: true })
    @IsString()
    surname: string;

    @ApiProperty({ required: true })
    @IsString()
    pob: string; // Place of birth
    
    @ApiProperty({ required: true })
    @Transform(({ value }) => transformDate(value))
    @IsDate()
    dob: string; // Format: YYYY-MM-DD

    @ApiProperty({ required: true })
    @IsString()
    phone_number: string;

    @ApiProperty({ required: true })
    @IsEmail()
    email_address: string;

    @ApiProperty({ required: true })
    @IsString()
    gender: string;

    @ApiProperty({ required: true })
    @IsString()
    nationality: string;

    @ApiProperty({ required: true })
    @IsString()
    passport_type: string;

    @ApiProperty({ required: true })
    @IsString()
    passport_number: string;

    @ApiProperty({ required: true })
    @Transform(({ value }) => transformDate(value))
    @IsDate()
    passport_expiration_date: string; // Format: YYYY-MM-DD

    @ApiProperty({ required: true })
    @IsString()
    purpose_of_jouney: string;

    @ApiProperty({ required: true })
    @IsString()
    airline: string;

    @ApiProperty({ required: true })
    @IsString()
    flight_number: string;

    @ApiProperty({ required: true })
    @IsString()
    country_of_departure: string;

    @ApiProperty({ required: true })
    @Transform(({ value }) => transformDate(value))
    @IsDate()
    date_of_departure: string; // Format: YYYY-MM-DD

    @ApiProperty({ required: true })
    @Transform(({ value }) => transformDate(value))
    @IsDate()
    date_arrival: string; // Format: YYYY-MM-DD

    @ApiProperty({ required: false })
    @IsOptional()
    port_of_entry?: string;

    @ApiProperty({ required: true })
    @IsString()
    contact_or_hotel_name: string;

    @ApiProperty({ required: true })
    @IsString()
    contact_or_hotel_number: string;

    @ApiProperty({ required: true })
    @IsString()
    contact_or_hotel_address: string;

    @ApiProperty({ required: true })
    @IsString()
    city_s_town: string;

    @ApiProperty({ required: true })
    @IsEmail()
    contact_or_hotel_email: string;

    @ApiProperty({ required: true })
    @IsString()
    contact_or_hotel_postal_code: string;

    @ApiProperty({ required: true })
    @Transform(({ value }) => transformDate(value))
    @IsDate()
    issue_date: string; // Format: YYYY-MM-DD

    @ApiProperty({ required: true })
    @IsString()
    pdos: string; // Permitted Duration of Stay

    @ApiProperty({ required: true })
    @IsString()
    residential_address: string;

    @ApiProperty({ required: true })
    @IsString()
    visa_type: string;

    @ApiProperty({ required: true })
    @IsString()
    entry_type: string;

    @ApiProperty({ required: true })
    @Transform(({ value }) => transformDate(value))
    @IsDate()
    date_entered: string; // Format: YYYY-MM-DD

    @ApiProperty({ required: true })
    @Transform(({ value }) => transformDate(value))
    @IsDate()
    date_modified: string; // Format: YYYY-MM-DD

    // New document fields (base64-encoded)
    @ApiProperty({ required: false })
    @IsOptional()
    passport?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    profile_picture?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    return_ticket?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    sufficient_fund?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    hoh_address?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    lfra?: string;
    invitation_letter_from_nigeria_institution?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    academic_credential?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    acceptance_letter_from_home_institution?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    invitation_letter_from_event_organizer?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    endorsement_for_cultural_activities?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    tournament_event_invitation?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    athlete_credentials?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    letter_from_organizer?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    invitation_letter_from_nigerian_host?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    copy_of_nigerian_passport_strok_residency_permit_of_host?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    bank_statement?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    minimum_investment?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    verification_letter_from_nipc?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    cac_certificate?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    invitation_letter_from_nigerian_company?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    invitation_letter_from_nigerian_company_with_letterhead?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    onward_ticket?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    visa_to_final_destination?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    parental_consent?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    birth_certificate?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    guardian_name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    guardian_passport_number?: string;
}
