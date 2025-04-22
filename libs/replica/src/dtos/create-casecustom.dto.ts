import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseCustomDto {
  @ApiProperty({ required: false })
  visa_type_c?: string;
  @ApiProperty({ required: false })
  active_status_c?: string;
  @ApiProperty({ required: false })
  in_country_c?: string;
  @ApiProperty({ required: false })
  duration_of_stay_actual_c?: string;
  @ApiProperty({ required: false })
  id_on_engine_c?: string;
  @ApiProperty({ required: false })
  vetting_checks_c?: string;
  @ApiProperty({ required: false })
  approving_status_c?: string;
  @ApiProperty({ required: false })
  is_active_c?: boolean;
  @ApiProperty({ required: false })
  contact_or_hotel_postal_code_c?: string;
  @ApiProperty({ required: false })
  contact_or_hotel_email_c?: string;
  @ApiProperty({ required: false })
  city_s_town_c?: string;
  @ApiProperty({ required: false })
  contact_or_hotel_address_c?: string;
  @ApiProperty({ required: false })
  contact_or_hotel_number_c?: string;
  @ApiProperty({ required: false })
  contact_or_hotel_name_c?: string;
  @ApiProperty({ required: false })
  date_arrival_c?: string;
  @ApiProperty({ required: false })
  date_of_departure_c?: string;
  @ApiProperty({ required: false })
  country_of_departure_c?: string;
  @ApiProperty({ required: false })
  flight_number_c?: string;
  @ApiProperty({ required: false })
  airline_c?: string;
  @ApiProperty({ required: false })
  purpose_of_jouney_c?: string;
  @ApiProperty({ required: false })
  final_status_c?: string;
  @ApiProperty({ required: false })
  vetting_status_c?: string;
  @ApiProperty({ required: false })
  visa_validity_c?: string;
  @ApiProperty({ required: false })
  reference_no_c?: string;
  @ApiProperty({ required: false })
  port_of_departure_c?: string;
  @ApiProperty({ required: false })
  port_of_entry_c?: string;
  @ApiProperty({ required: false })
  departure_date_c?: string;
  @ApiProperty({ required: false })
  entry_date_c?: string;
  @ApiProperty({ required: false })
  entry_type_c?: string;
  @ApiProperty({ required: false })
  duration_of_stay_c?: string;
  @ApiProperty({ required: false })
  ticket_num_c?: string;
}