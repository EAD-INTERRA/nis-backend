import { Applicant, ContactDetail, Country, Nationality, PassportType, PortOfEntry, PrismaClient, TravelInformation, VisaType } from "@prisma/client"

export const mapWebhookFields = async (
    dbService: PrismaClient,
    data: Applicant & {
        nationality: Nationality,
        passport_type: PassportType,
        travel_information: TravelInformation & {
            country_of_departure: Country,
            port_of_entry: PortOfEntry
        },
        contact_detail: ContactDetail,
        visa_type: VisaType
    }
) => {
    const { id, title, first_name, middle_name, surname, place_of_birth, date_of_birth,
        phone_no, email, gender, nationality, passport_type, passport_no, passport_expiry_date,
        travel_information, contact_detail, visa_type, image_url
    } = data

    const documents = (await dbService.applicant.findUnique({
        where: {
            id
        },
        include: {
            supporting_documents: {
                include: {
                    visa_requirement: true
                }
            }
        }
    })).supporting_documents

    // const passport = documents.find((d) => d.visa_requirement.field.toLowerCase() === "passport")
    // const return_ticket = documents.find((d) => d.visa_requirement.field.toLowerCase() === "return_ticket")
    // const hotel_reservation = documents.find((d) => d.visa_requirement.field.toLowerCase() === "hotel_reservation")
    // const bank_statement = documents.find((d) => d.visa_requirement.field.toLowerCase() === "bank_statement")
    // const onward_ticket = documents.find((d) => d.visa_requirement.field.toLowerCase() === "onward_ticket")
    // const visa_final_destination = documents.find((d) => d.visa_requirement.field.toLowerCase() === "visa_final_destination")
    // const birth_certificate = documents.find((d) => d.visa_requirement.field.toLowerCase() === "birth_certificate")
    // const parental_consent = documents.find((d) => d.visa_requirement.field.toLowerCase() === "parental_consent")
    // const cac_certificate = documents.find((d) => d.visa_requirement.field.toLowerCase() === "cac_certificate")
    // const invitation_letter = documents.find((d) => d.visa_requirement.field.toLowerCase() === "invitation_letter")
    // const investment_confirmation = documents.find((d) => d.visa_requirement.field.toLowerCase() === "investment_confirmation")
    // const bank_statement_180 = documents.find((d) => d.visa_requirement.field.toLowerCase() === "bank_statement_180")
    // const host_passport = documents.find((d) => d.visa_requirement.field.toLowerCase() === "host_passport")
    // const athlete_credentials = documents.find((d) => d.visa_requirement.field.toLowerCase() === "athlete_credentials")
    // const sports_commission_letter = documents.find((d) => d.visa_requirement.field.toLowerCase() === "sports_commission_letter")
    // const cultural_endorsement = documents.find((d) => d.visa_requirement.field.toLowerCase() === "cultural_endorsement")
    // const academic_credentials = documents.find((d) => d.visa_requirement.field.toLowerCase() === "academic_credentials")
    // const acceptance_letter = documents.find((d) => d.visa_requirement.field.toLowerCase() === "acceptance_letter")
    // const govt_letter = documents.find((d) => d.visa_requirement.field.toLowerCase() === "govt_letter")
    // const ngo_employment = documents.find((d) => d.visa_requirement.field.toLowerCase() === "ngo_employment")

    const documentMap = documents.reduce((acc, doc) => {
        const field = doc.visa_requirement.field.toLowerCase();
        acc[field] = doc.url ?? "";
        return acc;
    }, {});
    
    const passport = documentMap["passport"];
    const return_ticket = documentMap["return_ticket"];
    const hotel_reservation = documentMap["hotel_reservation"];
    const bank_statement = documentMap["bank_statement"];
    const onward_ticket = documentMap["onward_ticket"];
    const visa_final_destination = documentMap["visa_final_destination"];
    const birth_certificate = documentMap["birth_certificate"];
    const parental_consent = documentMap["parental_consent"];
    const cac_certificate = documentMap["cac_certificate"];
    const invitation_letter = documentMap["invitation_letter"];
    const investment_confirmation = documentMap["investment_confirmation"];
    const bank_statement_180 = documentMap["bank_statement_180"];
    const host_passport = documentMap["host_passport"];
    const athlete_credentials = documentMap["athlete_credentials"];
    const sports_commission_letter = documentMap["sports_commission_letter"];
    const cultural_endorsement = documentMap["cultural_endorsement"];
    const academic_credentials = documentMap["academic_credentials"];
    const acceptance_letter = documentMap["acceptance_letter"];
    const govt_letter = documentMap["govt_letter"];
    const ngo_employment = documentMap["ngo_employment"];


    const payload = {
        "event": "contacts.create",
        "contact": {
            "id_on_engine": id ?? "",
            "salutation": title ?? "",
            "first_name": first_name ?? "",
            "middle_name": middle_name ?? "",
            "surname": surname ?? "",
            "pob": place_of_birth ?? "", // Place of birth
            "dob": new Date(date_of_birth).toISOString().split("T")[0] ?? "", // YYMMDD
            "phone_number": phone_no ?? "",
            "email_address": email ?? "",
            "gender": gender ?? "", // Single, Married, Widowed, Divorced
            "nationality": nationality.external_id ?? "",
            "passport_type": passport_type.name.toLowerCase() ?? "", // standard, official
            "passport_number": passport_no ?? "",
            "passport_expiration_date": new Date(passport_expiry_date).toISOString().split("T")[0] ?? "",
            "purpose_of_jouney": travel_information.purpose ?? "",
            "airline": travel_information.airline ?? "",
            "flight_number": travel_information.flight_no ?? "",
            "country_of_departure": travel_information.country_of_departure.name,
            "date_of_departure": new Date(travel_information.date_of_departure).toISOString().split("T")[0] ?? "",
            "date_arrival": new Date(travel_information.date_of_arrival).toISOString().split("T")[0] ?? "",
            "port_of_entry": travel_information.port_of_entry.name ?? "",
            "contact_or_hotel_name": contact_detail.contact_name ?? "",
            "contact_or_hotel_number": contact_detail.contact_phone ?? "", // contact phone number
            "contact_or_hotel_address": contact_detail.address ?? "",
            "city_s_town": contact_detail.city ?? "",
            "contact_or_hotel_email": contact_detail.contact_email ?? "",
            "contact_or_hotel_postal_code": contact_detail.postal_code ?? "",
            "issue_date": new Date().toISOString().split("T")[0] ?? "",
            "pdos": travel_information.duration_of_stay.toString() ?? "", // permitted_duration_of_stay
            "residential_address": "",
            "visa_type": `${visa_type.key} - ${visa_type.name}` ,
            "entry_type": "Single Entry" ,
            "valid_from": "",
            "valid_until": "",
            // "date_entered": "2025-04-03",
            // "date_modified": "2025-04-03",
            "visa_validity": visa_type.validity.toString() ?? "",
            "passport_url": passport ?? "",
            "profile_picture": image_url ?? "",
            "photo_url": image_url ?? "",
            "return_ticket_url": return_ticket ?? "",
            "sufficient_fund_url": bank_statement ?? "",
            "hoh_address_url": hotel_reservation ?? "", // hotel/host address
            "lfra_url": "", // letter from relevant agency
            "invitation_letter_from_nigeria_institution_url": invitation_letter ?? "",
            "academic_credential_url": academic_credentials ?? "",
            "acceptance_letter_from_home_institution_url": acceptance_letter ?? "",
            "invitation_letter_from_event_organizer_url": invitation_letter ?? "",
            "endorsement_for_cultural_activities_url": cultural_endorsement ?? "",
            "tournament_event_invitation_url": sports_commission_letter ?? "",
            "athlete_credentials_url": athlete_credentials ?? "",
            "letter_from_organizer_url": cultural_endorsement ?? "",
            "invitation_letter_from_nigerian_host_url": invitation_letter ?? "",
            "copy_of_nigerian_passport_strok_residency_permit_of_host_url": host_passport ?? "",
            "bank_statement_url": bank_statement ?? "",
            "minimum_investment_url": investment_confirmation ?? "",
            "verification_letter_from_nipc_url": investment_confirmation ?? "",
            "cac_certificate_url": cac_certificate ?? "",
            "invitation_letter_from_nigerian_company_url": invitation_letter ?? "",
            "invitation_letter_from_nigerian_company_with_letterhead_url": "",
            "onward_ticket_url": onward_ticket ?? "",
            "visa_to_final_destination_url": visa_final_destination ?? "",
            "parental_consent_url": parental_consent ?? "",
            "birth_certificate_url": birth_certificate ?? ""
        }
    }
    return payload
}