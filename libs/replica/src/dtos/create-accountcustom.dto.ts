import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountCustomDto {
  @ApiProperty({ required: false })
  first_name_c?: string;
  @ApiProperty({ required: false })
  last_name_c?: string;
  @ApiProperty({ required: false })
  middle_name_c?: string;
  @ApiProperty({ required: false })
  profile_picture_c?: string;
  @ApiProperty({ required: false })
  place_of_birth_c?: string;
  @ApiProperty({ required: false })
  dob_c?: string;
  @ApiProperty({ required: false })
  nationality_c?: string;
  @ApiProperty({ required: false })
  passport_type_c?: string;
  @ApiProperty({ required: false })
  passport_number_c?: string;
  @ApiProperty({ required: false })
  issue_date_c?: string;
  @ApiProperty({ required: false })
  id_on_engine_c?: string;
  @ApiProperty({ required: false })
  passport_expiration_date_c?: string;
  @ApiProperty({ required: false })
  salutation_c?: string;
  @ApiProperty({ required: false })
  applicant_name_c?: string;
  @ApiProperty({ required: false })
  gender_c?: string;
  @ApiProperty({ required: false })
  address_c?: string;
}