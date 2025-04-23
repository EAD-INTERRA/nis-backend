import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateVisaDocumentCustomDto {
  @ApiProperty({ required: false })
  @IsOptional()
  doc_contact_id_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  passport_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  return_ticket_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sufficient_funds_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  letter_from_relevant_govt_agency_or_mou_on_cultural_exchange_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_nigeria_institution_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  academic_credential_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  acceptance_letter_from_home_institution_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_event_organizer_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  govt_state_endorsement_for_cultural_activities_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  tournament_event_invitation_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  athlete_credentials_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  letter_from_organizer_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  copy_of_nigerian_passport_residency_permit_of_host_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_nigerian_host_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  bank_statement_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  minimum_investment_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  verification_letter_from_nipc_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  cac_certificate_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_nigerian_company_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_nigerian_company_with_letterhead_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  onward_ticket_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  parental_consent_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  visa_to_final_destination_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  birth_certificate_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  photo_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  return_ticket_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sufficient_funds_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  hoh_address_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  letter_from_relevant_agency_or_mou_on_cultural_exchange_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_nigeria_institution_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  academic_credential_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  acceptance_letter_from_home_institution_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_event_organizer_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  govt_state_endorsement_for_cultural_activities_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  tournament_event_invitation_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  athlete_credentials_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  letter_from_organizer_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_nigerian_host_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  letter_from_relevant_agency_or_mou_on_cultural_exchange_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  final_dest_visa_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  hotel_or_host_address_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  hotel_or_host_address_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  passport_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  birth_certificate_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  parental_consent_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  visa_to_final_destination_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  onward_ticket_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfncwl_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  invitation_letter_from_nigerian_company_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  cac_certificate_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  verification_letter_from_nipc_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  minimum_investment_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  copy_of_nigerian_passport_residency_permit_of_host_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  bank_statement_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lfra_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfni_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  alfhi_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfeo_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  efca_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  tei_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfnh_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  cnpsrph_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  vlfn_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfnc_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfncwl_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lfra_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfni_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  alfhi_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfeo_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  efca_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  tei_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfnh_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  cnpsrph_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  vlfn_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ilfnc_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  hoh_address_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  hoh_address_doc_status_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  file_url_c?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  status_c?: string;
}