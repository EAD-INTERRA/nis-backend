import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { isValid, parseISO } from 'date-fns';

export class CreateAccountCustomDto {
  @ApiProperty({ required: false })
  @IsOptional()
  first_name_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  last_name_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  middle_name_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  profile_picture_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  place_of_birth_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
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
  dob_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  nationality_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  passport_type_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  passport_number_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
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
  issue_date_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  id_on_engine_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
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
  passport_expiration_date_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  salutation_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  applicant_name_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  gender_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  address_c?: string;
}