export const VISA_TYPES = [
      { key: "F3B", name: "Transit Visa"},
  { key: "F4A", name: "Business Visa (Single Entry)"},
  { key: "F4B", name: "Business Visa (Multiple Entry)"},
  { key: "F4C", name: "Business Visa (Frequently Travelers)"},
  { key: "F5A", name: "Tourism Visa"},
  { key: "F6A", name: "Visiting Visa (Single Entry)"},
  { key: "F7E", name: "Sports Visa"},
  { key: "F7F", name: "Creative Arts Visa"},
  { key: "F7G", name: "Study Tour Visa"},
  { key: "F7H", name: "Academic Exchange isa"},
  { key: "F7I", name: "International Cultural Exchange Visa"},
  { key: "F7K", name: "Emergency/Relief Work Visa"},
  { key: "F9A", name: "Returning Holders of Foreign Passports (Nigerians by Birth)"},
  { key: "F9B", name: "Returning Holders of Foreign Passports (Nigerians by Birth) Accompanied Minors"}
];

export const PASSPORT_TYPES = [
    { name: "Standard" },
    { name: "Official" },
    { name: "Diplomatic" },
];

export const TITLES = [
    { name: "Mr" },
    { name: "Mrs" },
    { name: "Miss" },
];


export const PORTS_OF_ENTRY = [
    { name: "Nnamdi Azikiwe International Airport, Abuja" },
    { name: "Mallam Aminu Kano Airport, Kano" },
    { name: "Murtala Mohammed Airport, Lagos" },
    { name: "Margret Ekpo Airport, Calabar" },
    { name: "Port Harcourt International Airport, Rivers" },
    { name: "Akanu Ibiam International Airport, Enugu" },
];


export const VISA_SPECIFIC_UPLOADS_MAP = {
    F3B: [
        { field: "onward_ticket", label: "Onward Ticket", required: true },
        { field: "visa_final_destination", label: "Visa to Final Destination", required: false },
        { field: "hoh_address", label: "Evidence of Hotel Reservations", required: true },
        { field: "birth_cert_minor", label: "Birth Certificate (For Minors)", required: false },
        { field: "parent_letter_consent", label: "Parental / Legal Guardians’ Letter of consent of the accompanying Guardian.", required: false }
      ],
      F4A: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations (Verifiable Address) or host address in Nigeria", required: true },
        { field: "cac_certificate", label: "CAC Certificate of inviting company", required: true },
        { field: "invitation_letter_from_nigerian_company_with_letterhead", label: "Invitation Letter (On Company Letterhead)", required: true }
      ],
      F4B: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations (Verifiable Address) or host address in Nigeria", required: true },
        { field: "cac_certificate", label: "CAC Certificate of inviting company", required: true },
        { field: "invitation_letter_from_nigerian_company_with_letterhead", label: "Invitation Letter (On Company Letterhead)", required: true }
      ],
      F4C: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations (Verifiable Address) or host address in Nigeria", required: true },
        { field: "cac_certificate", label: "CAC Certificate of inviting company", required: true },
        { field: "invitation_letter_from_nigerian_company_with_letterhead", label: "Invitation Letter (On Company Letterhead)", required: true },
        { field: "investment_confirmation", label: "Letter of verification or confirmation of investment from Government Agency from NIPC", required: true }
      ],
      F5A: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations or host address in Nigeria", required: true },
        { field: "sufficient_fund", label: "180 Days Bank Statement", required: true },
        { field: "birth_cert_minor", label: "Birth Certificate (For Minors)", required: false },
        { field: "parent_letter_consent", label: "Parental / Legal Guardians’ Letter of consent of the accompanying Guardian.", required: false }
      ],
      F6A: [
        { field: "invitation_letter_from_nigerian_host", label: "Invitation letter from family/friend in Nigeria ", required: true },
        { field: "copy_of_nigerian_passport_strok_residency_permit_of_host", label: "Copy of Nigerian Passport of the Host or Residency Permit (Non-Nigerian)", required: true },
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations or host address in Nigeria", required: true },
        { field: "sufficient_fund", label: "180 Days Bank Statement", required: true },
        { field: "birth_cert_minor", label: "Birth Certificate (For Minors)", required: false },
        { field: "parent_letter_consent", label: "Parental / Legal Guardians’ Letter of consent of the accompanying Guardian.", required: false }
      ],
      F7E: [
         { field: "hoh_address", label: "Evidence of Hotel Reservations or host address in Nigeria", required: true },
        { field: "tournament_event_invitation", label: "Letter of invitation indicating Tournament or sporting Event", required: true },
        { field: "athlete_credentials", label: "Athlete’s Credentials (CV)", required: true },
        { field: "sports_commission_letter", label: "Letter from Federal/State organizer or Private organiser (with endorsement by Federal or State sports commissions or agency in charge)", required: true },
        { field: "sufficient_fund", label: "6 Months Bank Statement", required: true },
        { field: "sporting_fixtures_evidence", label: "Evidence of sporting fixtures towards the sporting event", required: true },
      ],
      F7F: [
        { field: "invitation_letter_from_event_organizer", label: "Invitation Letter from Event Organizer", required: true },
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations or host address in Nigeria", required: true },
        { field: "endorsement_for_cultural_activities", label: "Federal/State Arts or Cultural Endorsement", required: true },
        { field: "sufficient_fund", label: "6 Months Bank Statement from applicant or host", required: true },
        { field: "birth_cert_minor", label: "Birth Certificate (For Minors)", required: false },
        { field: "parent_letter_consent", label: "Parental / Legal Guardians’ Letter of consent of the accompanying Guardian.", required: false }
      ],
      F7G: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations or host address in Nigeria", required: true },
        { field: "sufficient_fund", label: "6 Months Bank Statement", required: true },
        { field: "academic_credential", label: "Academic Credentials", required: true },
        { field: "invitation_letter_from_nigeria_institution", label: "Letter from approved institution in Nigeria", required: true }
      ],
      F7H: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations or host address in Nigeria", required: true },
        { field: "sufficient_fund", label: "Evidence of sufficient funds from applicant", required: true },
        { field: "academic_credential", label: "Academic Credentials", required: true },
        { field: "invitation_letter_from_nigeria_institution", label: "Letter from approved institution in Nigeria", required: true },
        { field: "acceptance_letter_from_home_institution", label: "Acceptance letter from institution’s on exchange program (e.g. MOU where applicable)", required: true }
      ],
      F71: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations or host address in Nigeria", required: true },
        { field: "sufficient_fund", label: "Evidence of sufficient funds Bank statement to be provided", required: true },
        { field: "lfra", label: "MOU or Letter from relevant Government agency", required: true },
        { field: "cultural_mou", label: "Cultural Exchange MoU", required: true },
        { field: "birth_cert_minor", label: "Birth Certificate (For Minors)", required: false },
        { field: "parent_letter_consent", label: "Parental / Legal Guardians’ Letter of consent of the accompanying Guardian.", required: false }
      ],
      F7K: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "hoh_address", label: "Evidence of Hotel Reservations or host address in Nigeria", required: true },
        { field: "lfra", label: "Letter from Relevant Government Agency", required: true },
        { field: "ngo_employment", label: "Letter of employment and or affiliation to NGO providing relief or emergency services", required: true }
      ],
      F9A: [
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "proof_parentage", label: "Proof of Nigerian Parentage (birth certificate with Nigerian parents, old Nigerian passport, etc.).", required: true },
        { field: "parent_datapage", label: "Parents data pages.", required: false },
        { field: "nigerian_passport", label: "Valid Nigerian passport (where applicable)", required: false }
      ],
      F9B: [
        { field: "passport_minor", label: "Valid Foreign Passport of Minor", required: true },
        { field: "return_ticket", label: "Evidence of return ticket", required: true },
        { field: "proof_parentage", label: "Proof of Nigerian Parentage (birth certificate with Nigerian parents, old Nigerian passport, etc.).", required: true },
        { field: "parent_datapage", label: "Parents data pages.", required: false },
        { field: "passport_parent", label: "Valid Passport of Nigerian Parent", required: false },
        { field: "photo_parent", label: "Passport Size photo of the accompanying Parental/Legal Guardian", required: false },
        { field: "birth_cert_minor", label: "Birth Certificate (For Minors)", required: false },
        { field: "parent_letter_consent", label: "Parental / Legal Guardians’ Letter of consent of the accompanying Guardian.", required: false },
        { field: "application_letter_parent", label: "Application Letter from Parent/Guardian requesting visa.", required: false }
      ]
};

export const COMMON_UPLOADS = [
    { field: "profile_picture", label: "Passport size photo", required: true },
    { field: "passport", label: "Valid Passport (Valid for at least 6 months)", required: VISA_SPECIFIC_UPLOADS_MAP.F9B ? false : true }
];
export const STATES_IN_NIGERIA = [
    { name: "Abia" },
    { name: "Adamawa" },
    { name: "Akwa Ibom" },
    { name: "Anambra" },
    { name: "Bauchi" },
    { name: "Bayelsa" },
    { name: "Benue" },
    { name: "Borno" },
    { name: "Cross River" },
    { name: "Delta" },
    { name: "Ebonyi" },
    { name: "Edo" },
    { name: "Ekiti" },
    { name: "Enugu" },
    { name: "Gombe" },
    { name: "Imo" },
    { name: "Jigawa" },
    { name: "Kaduna" },
    { name: "Kano" },
    { name: "Katsina" },
    { name: "Kebbi" },
    { name: "Kogi" },
    { name: "Kwara" },
    { name: "Lagos" },
    { name: "Nasarawa" },
    { name: "Niger" },
    { name: "Ogun" },
    { name: "Ondo" },
    { name: "Osun" },
    { name: "Oyo" },
    { name: "Plateau" },
    { name: "Rivers" },
    { name: "Sokoto" },
    { name: "Taraba" },
    { name: "Yobe" },
    { name: "Zamfara" },
    { name: "Federal Capital Territory" },
];

export const NATIONALITIES = [
    {
        "value": "val0",
        "name": "Afghan"
    },
    {
        "value": "val1",
        "name": "Albanian"
    },
    {
        "value": "val2",
        "name": "Algerian"
    },
    {
        "value": "val3",
        "name": "American"
    },
    {
        "value": "val4",
        "name": "Andorran"
    },
    {
        "value": "val5",
        "name": "Angolan"
    },
    {
        "value": "val6",
        "name": "Anguillan"
    },
    {
        "value": "val7",
        "name": "Argentine"
    },
    {
        "value": "val8",
        "name": "Armenian"
    },
    {
        "value": "val9",
        "name": "Australian"
    },
    {
        "value": "val10",
        "name": "Austrian"
    },
    {
        "value": "val11",
        "name": "Azerbaijani"
    },
    {
        "value": "val12",
        "name": "Bahamian"
    },
    {
        "value": "val13",
        "name": "Bahraini"
    },
    {
        "value": "val14",
        "name": "Bangladeshi"
    },
    {
        "value": "val15",
        "name": "Barbadian"
    },
    {
        "value": "val16",
        "name": "Belarusian"
    },
    {
        "value": "val17",
        "name": "Belgian"
    },
    {
        "value": "val18",
        "name": "Belizean"
    },
    {
        "value": "val19",
        "name": "Beninese"
    },
    {
        "value": "val20",
        "name": "Bermudian"
    },
    {
        "value": "val21",
        "name": "Bhutanese"
    },
    {
        "value": "val22",
        "name": "Bolivian"
    },
    {
        "value": "val23",
        "name": "Botswanan"
    },
    {
        "value": "val24",
        "name": "Brazilian"
    },
    {
        "value": "val25",
        "name": "British"
    },
    {
        "value": "val26",
        "name": "British Virgin Islander"
    },
    {
        "value": "val27",
        "name": "Bruneian"
    },
    {
        "value": "val28",
        "name": "Bulgarian"
    },
    {
        "value": "val29",
        "name": "Burkinan"
    },
    {
        "value": "val30",
        "name": "Burmese"
    },
    {
        "value": "val31",
        "name": "Burundian"
    },
    {
        "value": "val32",
        "name": "Cambodian"
    },
    {
        "value": "val33",
        "name": "Cameroonian"
    },
    {
        "value": "val34",
        "name": "Canadian"
    },
    {
        "value": "val35",
        "name": "Cape Verdean"
    },
    {
        "value": "val36",
        "name": "Cayman Islander"
    },
    {
        "value": "val37",
        "name": "Central African"
    },
    {
        "value": "val38",
        "name": "Chadian"
    },
    {
        "value": "val39",
        "name": "Chilean"
    },
    {
        "value": "val40",
        "name": "Chinese"
    },
    {
        "value": "val41",
        "name": "Citizen of Antigua and Barbuda"
    },
    {
        "value": "val42",
        "name": "Citizen of Bosnia and Herzegovina"
    },
    {
        "value": "val43",
        "name": "Citizen of Guinea-Bissau"
    },
    {
        "value": "val44",
        "name": "Citizen of Kiribati"
    },
    {
        "value": "val45",
        "name": "Citizen of Seychelles"
    },
    {
        "value": "val46",
        "name": "Citizen of the Dominican Republic"
    },
    {
        "value": "val47",
        "name": "Citizen of Vanuatu"
    },
    {
        "value": "val48",
        "name": "Colombian"
    },
    {
        "value": "val49",
        "name": "Comoran"
    },
    {
        "value": "val50",
        "name": "Congolese (Congo)"
    },
    {
        "value": "val51",
        "name": "Congolese (DRC)"
    },
    {
        "value": "val52",
        "name": "Cook Islander"
    },
    {
        "value": "val53",
        "name": "Costa Rican"
    },
    {
        "value": "val54",
        "name": "Croatian"
    },
    {
        "value": "val55",
        "name": "Cuban"
    },
    {
        "value": "val56",
        "name": "Cymraes"
    },
    {
        "value": "val57",
        "name": "Cymro"
    },
    {
        "value": "val58",
        "name": "Cypriot"
    },
    {
        "value": "val59",
        "name": "Czech"
    },
    {
        "value": "val60",
        "name": "Danish"
    },
    {
        "value": "val61",
        "name": "Djiboutian"
    },
    {
        "value": "val62",
        "name": "Dominican"
    },
    {
        "value": "val63",
        "name": "Dutch"
    },
    {
        "value": "val64",
        "name": "East Timorese"
    },
    {
        "value": "val65",
        "name": "Ecuadorean"
    },
    {
        "value": "val66",
        "name": "Egyptian"
    },
    {
        "value": "val67",
        "name": "Emirati"
    },
    {
        "value": "val68",
        "name": "English"
    },
    {
        "value": "val69",
        "name": "Equatorial Guinean"
    },
    {
        "value": "val70",
        "name": "Eritrean"
    },
    {
        "value": "val71",
        "name": "Estonian"
    },
    {
        "value": "val72",
        "name": "Ethiopian"
    },
    {
        "value": "val73",
        "name": "Faroese"
    },
    {
        "value": "val74",
        "name": "Fijian"
    },
    {
        "value": "val75",
        "name": "Filipino"
    },
    {
        "value": "val76",
        "name": "Finnish"
    },
    {
        "value": "val77",
        "name": "French"
    },
    {
        "value": "val78",
        "name": "Gabonese"
    },
    {
        "value": "val79",
        "name": "Gambian"
    },
    {
        "value": "val80",
        "name": "Georgian"
    },
    {
        "value": "val81",
        "name": "German"
    },
    {
        "value": "val82",
        "name": "Ghanaian"
    },
    {
        "value": "val83",
        "name": "Gibraltarian"
    },
    {
        "value": "val84",
        "name": "Greek"
    },
    {
        "value": "val85",
        "name": "Greenlandic"
    },
    {
        "value": "val86",
        "name": "Grenadian"
    },
    {
        "value": "val87",
        "name": "Guamanian"
    },
    {
        "value": "val88",
        "name": "Guatemalan"
    },
    {
        "value": "val89",
        "name": "Guinean"
    },
    {
        "value": "val90",
        "name": "Guyanese"
    },
    {
        "value": "val91",
        "name": "Haitian"
    },
    {
        "value": "val92",
        "name": "Honduran"
    },
    {
        "value": "val93",
        "name": "Hong Konger"
    },
    {
        "value": "val94",
        "name": "Hungarian"
    },
    {
        "value": "val95",
        "name": "Icelandic"
    },
    {
        "value": "val96",
        "name": "Indian"
    },
    {
        "value": "val97",
        "name": "Indonesian"
    },
    {
        "value": "val98",
        "name": "Iranian"
    },
    {
        "value": "val99",
        "name": "Iraqi"
    },
    {
        "value": "val100",
        "name": "Irish"
    },
    {
        "value": "val101",
        "name": "Israeli"
    },
    {
        "value": "val102",
        "name": "Italian"
    },
    {
        "value": "val103",
        "name": "Ivorian"
    },
    {
        "value": "val104",
        "name": "Jamaican"
    },
    {
        "value": "val105",
        "name": "Japanese"
    },
    {
        "value": "val106",
        "name": "Jordanian"
    },
    {
        "value": "val107",
        "name": "Kazakh"
    },
    {
        "value": "val108",
        "name": "Kenyan"
    },
    {
        "value": "val109",
        "name": "Kittitian"
    },
    {
        "value": "val110",
        "name": "Kosovan"
    },
    {
        "value": "val111",
        "name": "Kuwaiti"
    },
    {
        "value": "val112",
        "name": "Kyrgyz"
    },
    {
        "value": "val113",
        "name": "Lao"
    },
    {
        "value": "val114",
        "name": "Latvian"
    },
    {
        "value": "val115",
        "name": "Lebanese"
    },
    {
        "value": "val116",
        "name": "Liberian"
    },
    {
        "value": "val117",
        "name": "Libyan"
    },
    {
        "value": "val118",
        "name": "Liechtenstein citizen"
    },
    {
        "value": "val119",
        "name": "Lithuanian"
    },
    {
        "value": "val120",
        "name": "Luxembourger"
    },
    {
        "value": "val121",
        "name": "Macanese"
    },
    {
        "value": "val122",
        "name": "Macedonian"
    },
    {
        "value": "val123",
        "name": "Malagasy"
    },
    {
        "value": "val124",
        "name": "Malawian"
    },
    {
        "value": "val125",
        "name": "Malaysian"
    },
    {
        "value": "val126",
        "name": "Maldivian"
    },
    {
        "value": "val127",
        "name": "Malian"
    },
    {
        "value": "val128",
        "name": "Maltese"
    },
    {
        "value": "val129",
        "name": "Marshallese"
    },
    {
        "value": "val130",
        "name": "Martiniquais"
    },
    {
        "value": "val131",
        "name": "Mauritanian"
    },
    {
        "value": "val132",
        "name": "Mauritian"
    },
    {
        "value": "val133",
        "name": "Mexican"
    },
    {
        "value": "val134",
        "name": "Micronesian"
    },
    {
        "value": "val135",
        "name": "Moldovan"
    },
    {
        "value": "val136",
        "name": "Monegasque"
    },
    {
        "value": "val137",
        "name": "Mongolian"
    },
    {
        "value": "val138",
        "name": "Montenegrin"
    },
    {
        "value": "val139",
        "name": "Montserratian"
    },
    {
        "value": "val140",
        "name": "Moroccan"
    },
    {
        "value": "val141",
        "name": "Mosotho"
    },
    {
        "value": "val142",
        "name": "Mozambican"
    },
    {
        "value": "val143",
        "name": "Namibian"
    },
    {
        "value": "val144",
        "name": "Nauruan"
    },
    {
        "value": "val145",
        "name": "Nepalese"
    },
    {
        "value": "val146",
        "name": "New Zealander"
    },
    {
        "value": "val147",
        "name": "Nicaraguan"
    },
    {
        "value": "val148",
        "name": "Nigerian"
    },
    {
        "value": "val149",
        "name": "Nigerien"
    },
    {
        "value": "val150",
        "name": "Niuean"
    },
    {
        "value": "val151",
        "name": "North Korean"
    },
    {
        "value": "val152",
        "name": "Northern Irish"
    },
    {
        "value": "val153",
        "name": "Norwegian"
    },
    {
        "value": "val154",
        "name": "Omani"
    },
    {
        "value": "val155",
        "name": "Pakistani"
    },
    {
        "value": "val156",
        "name": "Palauan"
    },
    {
        "value": "val157",
        "name": "Palestinian"
    },
    {
        "value": "val158",
        "name": "Panamanian"
    },
    {
        "value": "val159",
        "name": "Papua New Guinean"
    },
    {
        "value": "val160",
        "name": "Paraguayan"
    },
    {
        "value": "val161",
        "name": "Peruvian"
    },
    {
        "value": "val162",
        "name": "Pitcairn Islander"
    },
    {
        "value": "val163",
        "name": "Polish"
    },
    {
        "value": "val164",
        "name": "Portuguese"
    },
    {
        "value": "val165",
        "name": "Prydeinig"
    },
    {
        "value": "val166",
        "name": "Puerto Rican"
    },
    {
        "value": "val167",
        "name": "Qatari"
    },
    {
        "value": "val168",
        "name": "Romanian"
    },
    {
        "value": "val169",
        "name": "Russian"
    },
    {
        "value": "val170",
        "name": "Rwandan"
    },
    {
        "value": "val171",
        "name": "Salvadorean"
    },
    {
        "value": "val172",
        "name": "Sammarinese"
    },
    {
        "value": "val173",
        "name": "Samoan"
    },
    {
        "value": "val174",
        "name": "Sao Tomean"
    },
    {
        "value": "val175",
        "name": "Saudi Arabian"
    },
    {
        "value": "val176",
        "name": "Scottish"
    },
    {
        "value": "val177",
        "name": "Senegalese"
    },
    {
        "value": "val178",
        "name": "Serbian"
    },
    {
        "value": "val179",
        "name": "Sierra Leonean"
    },
    {
        "value": "val180",
        "name": "Singaporean"
    },
    {
        "value": "val181",
        "name": "Slovak"
    },
    {
        "value": "val182",
        "name": "Slovenian"
    },
    {
        "value": "val183",
        "name": "Solomon Islander"
    },
    {
        "value": "val184",
        "name": "Somali"
    },
    {
        "value": "val185",
        "name": "South African"
    },
    {
        "value": "val186",
        "name": "South Korean"
    },
    {
        "value": "val187",
        "name": "South Sudanese"
    },
    {
        "value": "val188",
        "name": "Spanish"
    },
    {
        "value": "val189",
        "name": "Sri Lankan"
    },
    {
        "value": "val190",
        "name": "St Helenian"
    },
    {
        "value": "val191",
        "name": "St Lucian"
    },
    {
        "value": "val192",
        "name": "Stateless"
    },
    {
        "value": "val193",
        "name": "Sudanese"
    },
    {
        "value": "val194",
        "name": "Surinamese"
    },
    {
        "value": "val195",
        "name": "Swazi"
    },
    {
        "value": "val196",
        "name": "Swedish"
    },
    {
        "value": "val197",
        "name": "Swiss"
    },
    {
        "value": "val198",
        "name": "Syrian"
    },
    {
        "value": "val199",
        "name": "Taiwanese"
    },
    {
        "value": "val200",
        "name": "Tajik"
    },
    {
        "value": "val201",
        "name": "Tanzanian"
    },
    {
        "value": "val202",
        "name": "Thai"
    },
    {
        "value": "val203",
        "name": "Togolese"
    },
    {
        "value": "val204",
        "name": "Tongan"
    },
    {
        "value": "val205",
        "name": "Trinidadian"
    },
    {
        "value": "val206",
        "name": "Tristanian"
    },
    {
        "value": "val207",
        "name": "Tunisian"
    },
    {
        "value": "val208",
        "name": "Turkish"
    },
    {
        "value": "val209",
        "name": "Turkmen"
    },
    {
        "value": "val210",
        "name": "Turks and Caicos Islander"
    },
    {
        "value": "val211",
        "name": "Tuvaluan"
    },
    {
        "value": "val212",
        "name": "Ugandan"
    },
    {
        "value": "val213",
        "name": "Ukrainian"
    },
    {
        "value": "val214",
        "name": "Uruguayan"
    },
    {
        "value": "val215",
        "name": "Uzbek"
    },
    {
        "value": "val216",
        "name": "Vatican citizen"
    },
    {
        "value": "val217",
        "name": "Venezuelan"
    },
    {
        "value": "val218",
        "name": "Vietnamese"
    },
    {
        "value": "val219",
        "name": "Vincentian"
    },
    {
        "value": "val220",
        "name": "Wallisian"
    },
    {
        "value": "val221",
        "name": "Welsh"
    },
    {
        "value": "val222",
        "name": "Yemeni"
    },
    {
        "value": "val223",
        "name": "Zambian"
    },
    {
        "value": "val224",
        "name": "Zimbabwean"
    }
]



export const COUNTRIES = [
    { name: "Afghanistan", code: "AF" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Brazil", code: "BR" },
    { name: "Brunei", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cabo Verde", code: "CV" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo, Democratic Republic of the", code: "CD" },
    { name: "Congo, Republic of the", code: "CG" },
    { name: "Costa Rica", code: "CR" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Eswatini", code: "SZ" },
    { name: "Ethiopia", code: "ET" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Greece", code: "GR" },
    { name: "Grenada", code: "GD" },
    { name: "Guatemala", code: "GT" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Honduras", code: "HN" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Korea, North", code: "KP" },
    { name: "Korea, South", code: "KR" },
    { name: "Kosovo", code: "XK" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Laos", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia", code: "FM" },
    { name: "Moldova", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "North Macedonia", code: "MK" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestine", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Qatar", code: "QA" },
    { name: "Romania", code: "RO" },
    { name: "Russia", code: "RU" },
    { name: "Rwanda", code: "RW" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Sudan", code: "SS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syria", code: "SY" },
    { name: "Taiwan", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Vatican City", code: "VA" },
    { name: "Venezuela", code: "VE" },
    { name: "Vietnam", code: "VN" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
];

