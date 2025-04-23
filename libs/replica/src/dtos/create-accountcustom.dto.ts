import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

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
  @Transform(({ value }) => new Date(value).toISOString())
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
  @Transform(({ value }) => new Date(value).toISOString())
  issue_date_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  id_on_engine_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => new Date(value).toISOString())
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