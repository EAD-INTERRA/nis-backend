import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDataURI, IsOptional } from 'class-validator';
import { isValid, parseISO } from 'date-fns';

export class CreateCaseCustomDto {
  @ApiProperty({ required: false })
  @IsOptional()
  visa_type_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  active_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  in_country_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  duration_of_stay_actual_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  id_on_engine_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  vetting_checks_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  approving_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  is_active_c?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  contact_or_hotel_postal_code_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contact_or_hotel_email_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  city_s_town_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contact_or_hotel_address_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contact_or_hotel_number_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contact_or_hotel_name_c?: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  date_arrival_c?: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  date_of_departure_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  country_of_departure_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  flight_number_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  airline_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  purpose_of_jouney_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  final_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  vetting_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  visa_validity_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  reference_no_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  port_of_departure_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  port_of_entry_c?: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  departure_date_c?: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  entry_date_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  entry_type_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  duration_of_stay_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ticket_num_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  organization_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  visa_number_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  visa_class_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  mode_of_travel_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  mode_of_travel_no_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  new_passport_number_c: string

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  issue_date_c: string

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  expiration_date_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  nigerian_passport_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  yes_passport_no_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  principal_passport_number_c: string

  // @ApiProperty({ required: false })
  // @IsOptional()
  // visa_type_c: string

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  valid_from_c: string

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  valid_until_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  new_passport_no_c: string

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  new_issue_date_c: string

  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsDataURI()
  @IsOptional()
  new_expiration_date_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  new_passport_type_c: string

  @ApiProperty({ required: false })
  @IsOptional()
  validity_counter_c: string


  // Newly added fields
  
  @ApiProperty({ required: false })
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
  })
  @IsOptional()
  visa_issued_date_c?: string

  @ApiProperty({ required: false })
  @IsOptional()
  refusal_to_pay_c?: string

  @ApiProperty({ required: false })
  @IsOptional()
  landing_card_is_valid?: string

}