-- CreateEnum
CREATE TYPE "CaseTypes" AS ENUM ('e_visa', 'landing', 'exit');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "alias" TEXT,
    "surname" TEXT,
    "date_entered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "phone_office" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts_cstm" (
    "id" TEXT NOT NULL,
    "first_name_c" TEXT,
    "last_name_c" TEXT,
    "middle_name_c" TEXT,
    "profile_picture_c" TEXT,
    "place_of_birth_c" TEXT,
    "dob_c" TIMESTAMP(3),
    "nationality_c" TEXT,
    "passport_type_c" TEXT,
    "passport_number_c" TEXT,
    "issue_date_c" TIMESTAMP(3),
    "id_on_engine_c" TEXT,
    "passport_expiration_date_c" TIMESTAMP(3),
    "salutation_c" TEXT,
    "applicant_name_c" TEXT,
    "gender_c" TEXT,
    "address_c" TEXT,

    CONSTRAINT "accounts_cstm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cases" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "alias" TEXT,
    "subject" TEXT,
    "date_entered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_user_id" TEXT,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "assigned_user_id" TEXT,
    "case_number" TEXT,
    "account_id" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cases_cstm" (
    "id" TEXT NOT NULL,
    "visa_type_c" TEXT,
    "active_status_c" TEXT,
    "in_country_c" TEXT,
    "duration_of_stay_actual_c" TEXT,
    "id_on_engine_c" TEXT,
    "vetting_checks_c" TEXT,
    "approving_status_c" TEXT,
    "is_active_c" BOOLEAN,
    "contact_or_hotel_postal_code_c" TEXT,
    "contact_or_hotel_email_c" TEXT,
    "city_s_town_c" TEXT,
    "contact_or_hotel_address_c" TEXT,
    "contact_or_hotel_number_c" TEXT,
    "contact_or_hotel_name_c" TEXT,
    "date_arrival_c" TIMESTAMP(3),
    "date_of_departure_c" TIMESTAMP(3),
    "country_of_departure_c" TEXT,
    "flight_number_c" TEXT,
    "airline_c" TEXT,
    "purpose_of_jouney_c" TEXT,
    "final_status_c" TEXT,
    "vetting_status_c" TEXT,
    "visa_validity_c" TEXT,
    "reference_no_c" TEXT,
    "port_of_departure_c" TEXT,
    "port_of_entry_c" TEXT,
    "departure_date_c" TIMESTAMP(3),
    "entry_date_c" TIMESTAMP(3),
    "entry_type_c" TEXT,
    "duration_of_stay_c" TEXT,
    "ticket_num_c" TEXT,

    CONSTRAINT "cases_cstm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_documents" (
    "id" TEXT NOT NULL,
    "date_entered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "modified_user_id" TEXT,
    "created_by" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "assigned_user_id" TEXT,
    "document_name" TEXT,
    "filename" TEXT,
    "file_ext" TEXT,
    "file_mime_type" TEXT,

    CONSTRAINT "visa_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_documents_cstm" (
    "id" TEXT NOT NULL,
    "doc_contact_id_c" TEXT,
    "passport_c" TEXT,
    "return_ticket_c" TEXT,
    "sufficient_funds_c" TEXT,
    "letter_from_relevant_govt_agency_or_mou_on_cultural_exchange_c" TEXT,
    "invitation_letter_from_nigeria_institution_c" TEXT,
    "academic_credential_c" TEXT,
    "acceptance_letter_from_home_institution_c" TEXT,
    "invitation_letter_from_event_organizer_c" TEXT,
    "govt_state_endorsement_for_cultural_activities_c" TEXT,
    "tournament_event_invitation_c" TEXT,
    "athlete_credentials_c" TEXT,
    "letter_from_organizer_c" TEXT,
    "copy_of_nigerian_passport_residency_permit_of_host_c" TEXT,
    "invitation_letter_from_nigerian_host_c" TEXT,
    "bank_statement_c" TEXT,
    "minimum_investment_c" TEXT,
    "verification_letter_from_nipc_c" TEXT,
    "cac_certificate_c" TEXT,
    "invitation_letter_from_nigerian_company_c" TEXT,
    "invitation_letter_from_nigerian_company_with_letterhead_c" TEXT,
    "onward_ticket_c" TEXT,
    "parental_consent_c" TEXT,
    "visa_to_final_destination_c" TEXT,
    "birth_certificate_c" TEXT,
    "photo_status_c" TEXT,
    "return_ticket_status_c" TEXT,
    "sufficient_funds_status_c" TEXT,
    "hoh_address_status_c" TEXT,
    "letter_from_relevant_agency_or_mou_on_cultural_exchange_c" TEXT,
    "invitation_letter_from_nigeria_institution_status_c" TEXT,
    "academic_credential_status_c" TEXT,
    "acceptance_letter_from_home_institution_status_c" TEXT,
    "invitation_letter_from_event_organizer_status_c" TEXT,
    "govt_state_endorsement_for_cultural_activities_status_c" TEXT,
    "tournament_event_invitation_status_c" TEXT,
    "athlete_credentials_status_c" TEXT,
    "letter_from_organizer_status_c" TEXT,
    "invitation_letter_from_nigerian_host_status_c" TEXT,
    "letter_from_relevant_agency_or_mou_on_cultural_exchange_status_c" TEXT,
    "final_dest_visa_status_c" TEXT,
    "hotel_or_host_address_status_c" TEXT,
    "hotel_or_host_address_c" TEXT,
    "passport_status_c" TEXT,
    "birth_certificate_status_c" TEXT,
    "parental_consent_status_c" TEXT,
    "visa_to_final_destination_status_c" TEXT,
    "onward_ticket_status_c" TEXT,
    "ilfncwl_status_c" TEXT,
    "invitation_letter_from_nigerian_company_status_c" TEXT,
    "cac_certificate_status_c" TEXT,
    "verification_letter_from_nipc_status_c" TEXT,
    "minimum_investment_status_c" TEXT,
    "copy_of_nigerian_passport_residency_permit_of_host_status_c" TEXT,
    "bank_statement_status_c" TEXT,
    "lfra_c" TEXT,
    "ilfni_c" TEXT,
    "alfhi_c" TEXT,
    "ilfeo_c" TEXT,
    "efca_c" TEXT,
    "tei_c" TEXT,
    "ilfnh_c" TEXT,
    "cnpsrph_c" TEXT,
    "vlfn_c" TEXT,
    "ilfnc_c" TEXT,
    "ilfncwl_c" TEXT,
    "lfra_status_c" TEXT,
    "ilfni_status_c" TEXT,
    "alfhi_status_c" TEXT,
    "ilfeo_status_c" TEXT,
    "efca_status_c" TEXT,
    "tei_status_c" TEXT,
    "ilfnh_status_c" TEXT,
    "cnpsrph_status_c" TEXT,
    "vlfn_status_c" TEXT,
    "ilfnc_status_c" TEXT,
    "hoh_address_c" TEXT,
    "hoh_address_doc_status_c" TEXT,
    "file_url_c" TEXT,
    "status_c" TEXT,

    CONSTRAINT "visa_documents_cstm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "accounts_name_alias_surname_idx" ON "accounts"("name", "alias", "surname");

-- CreateIndex
CREATE INDEX "cases_case_number_account_id_idx" ON "cases"("case_number", "account_id");

-- CreateIndex
CREATE INDEX "visa_documents_document_name_filename_idx" ON "visa_documents"("document_name", "filename");

-- AddForeignKey
ALTER TABLE "accounts_cstm" ADD CONSTRAINT "accounts_cstm_id_fkey" FOREIGN KEY ("id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases_cstm" ADD CONSTRAINT "cases_cstm_id_fkey" FOREIGN KEY ("id") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visa_documents_cstm" ADD CONSTRAINT "visa_documents_cstm_id_fkey" FOREIGN KEY ("id") REFERENCES "visa_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
