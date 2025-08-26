import { transformDate } from "@app/utils/helpers/utils";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MaxLength } from "class-validator";

enum BiometricCapture {
    YES = 'yes',
    NO = 'no'
}

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
    
    @ApiProperty({ required: true, examples: ['yes', 'no'] })
    @IsEnum(BiometricCapture)
    biometric_capture: BiometricCapture;

    @ApiProperty({ required: true })
    @IsString()
    @MaxLength(250, { message: 'Salutation must not exceed 250 characters' })
    salutation: string;

    @ApiProperty({ required: true })
    @IsString()
    @MaxLength(250, { message: 'First name must not exceed 250 characters' })
    first_name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @MaxLength(250, { message: 'Middle name must not exceed 250 characters' })
    middle_name?: string;

    @ApiProperty({ required: true })
    @IsString()
    @MaxLength(250, { message: 'Surname must not exceed 250 characters' })
    surname: string;

    @ApiProperty({ required: true })
    @IsString()
    @MaxLength(250, { message: 'POB must not exceed 250 characters' })
    pob: string; // Place of birth
    
    @ApiProperty({ required: true})
    // @Transform(({ value }) => transformDate(value))
    @IsString()
    @MaxLength(250, { message: 'DOB must not exceed 250 characters' })
    dob: string; // Format: YYYY-MM-DD

    @ApiProperty({ required: true })
    @IsString()
    @MaxLength(250, { message: 'Phone number must not exceed 250 characters' })
    phone_number: string;

    @ApiProperty({ required: true })
    @IsEmail()
    @MaxLength(250, { message: 'Email must not exceed 250 characters' })
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
    // @Transform(({ value }) => transformDate(value))
    @IsString()
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

    // @ApiProperty({ required: false })
    // @IsOptional()
    // country_of_departure?: string;

    // @ApiProperty({ required: false })
    // // @Transform(({ value }) => transformDate(value))
    // @IsOptional()
    // date_of_departure?: string; // Format: YYYY-MM-DD

    // @ApiProperty({ required: true })
    // // @Transform(({ value }) => transformDate(value))
    // @IsString()
    // date_arrival: string; // Format: YYYY-MM-DD

    // @ApiProperty({ required: false })
    // @IsOptional()
    // port_of_entry?: string;

    @ApiProperty({ required: true })
    @IsString()
    @MaxLength(250, { message: 'Hotel name must not exceed 250 characters' })
    contact_or_hotel_name: string;

    @ApiProperty({ required: true })
    @IsString()
    @MaxLength(250, { message: 'Hotel contact number must not exceed 250 characters' })
    contact_or_hotel_number: string;

    @ApiProperty({ required: true })
    @IsString()
    contact_or_hotel_address: string;

    @ApiProperty({ required: true })
    @IsString()
    city_s_town: string;

    @ApiProperty({ required: true })
    @IsEmail()
    @MaxLength(250, { message: 'Hotel Email must not exceed 250 characters' })
    contact_or_hotel_email: string;

    @ApiProperty({ required: true})
    @IsString()
    @MaxLength(250, { message: 'Postal code must not exceed 250 characters' })
    contact_or_hotel_postal_code: string;

    @ApiProperty({ required: true })
    // @Transform(({ value }) => transformDate(value))
    @IsString()
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
    
    // @ApiProperty({ required: false })
    // @IsOptional()
    // @MaxLength(3, { message: 'Visa validity must not exceed 3 characters' })
    // visa_validity?: string;

    @ApiProperty({ required: true })
    @IsString()
    entry_type: string;

    // @ApiProperty({ required: true })
    // // @Transform(({ value }) => transformDate(value))
    // @IsString()
    // date_entered: string; // Format: YYYY-MM-DD

    // @ApiProperty({ required: true })
    // // @Transform(({ value }) => transformDate(value))
    // @IsString()
    // date_modified: string; // Format: YYYY-MM-DD

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
    hotel_or_home_address?: string;
    
    @ApiProperty({ required: true })
    @IsOptional()
    applicant_photo: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    application_letter_parent?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    birth_cert_minor?: string;
   
    @ApiProperty({ required: false })
    @IsOptional()
    sporting_fixtures_evidence?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    cultural_mou?: string;
   
    @ApiProperty({ required: false })
    @IsOptional()
    ngo_employment?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    parent_datapage?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    passport_parent?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    proof_parentage?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    passport_minor?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    photo_parent?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    sports_commission_letter?: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    parent_letter_consent?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    mou_or_letter_from_relevant_government_agency?: string;

    @ApiProperty({ required: false })
    @IsOptional()
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
    
    @ApiProperty({ required: false, maxLength: 250 })
    @IsOptional()
    guardian_name?: string;

    @ApiProperty({ required: false, maxLength: 250 })
    @IsOptional()
    guardian_passport_number?: string;
}
