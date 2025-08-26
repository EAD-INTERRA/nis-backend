import { Processor, WorkerHost } from '@nestjs/bullmq';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { SAMPLE_PAYLOAD } from './data';


const FILE_KEYS = [
    "passport",
    "profile_picture",
    "applicant_photo",
    "return_ticket",
    "sufficient_fund",
    "hotel_or_home_address",
    "mou_or_letter_from_relevant_government_agency",
    "invitation_letter_from_nigeria_institution",
    "academic_credential",
    "acceptance_letter_from_home_institution",
    "invitation_letter_from_event_organizer",
    "endorsement_for_cultural_activities",
    "tournament_event_invitation",
    "athlete_credentials",
    "letter_from_organizer",
    "invitation_letter_from_nigerian_host",
    "copy_of_nigerian_passport_strok_residency_permit_of_host",
    "bank_statement",
    "minimum_investment",
    "verification_letter_from_nipc",
    "cac_certificate",
    "invitation_letter_from_nigerian_company",
    "invitation_letter_from_nigerian_company_with_letterhead",
    "onward_ticket",
    "visa_to_final_destination",
    "parental_consent",
    "birth_certificate",
    "birth_cert_minor",
    "application_letter_parent",
    "parent_letter_consent",
    "sporting_fixtures_evidence",
    "cultural_mou",
    "ngo_employment",
    "parent_datapage",
    "passport_parent",
    "proof_parentage",
    "passport_minor",
    "photo_parent",
    "sports_commission_letter",
    "parent_letter_consent"
];


@Processor('e-visa')
export class EVisaConsumer extends WorkerHost {
    async process(job: any): Promise<any> {
        const data = job.data;
        // const data = SAMPLE_PAYLOAD

        const formData = new FormData();

        // Iterate over the JSON data
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];

                // Check if the key is one where we expect a base64 string as the value
                if (typeof value === 'string' && this.isBase64(key)) {
                    const { buffer, extension, mimeType } = this.decodeBase64(value);

                    // Convert Buffer to Blob
                    const arrayBuffer = Uint8Array.from(buffer).buffer as ArrayBuffer;
                    const blob = new Blob([arrayBuffer], { type: mimeType });

                    // Append the Blob to FormData
                    formData.append(key, blob, `${key}.${extension}`);
                } else {
                    // Append other data as plain fields
                    formData.append(key, value);
                }
            }
        }

        // Make the HTTP request
        try {
            console.log('Data sent to external API:', formData);
            const response = await axios.post(
                process.env.WEBHOOK_URL,
                formData,
                {
                    headers: {
                        "X-Webhook-Signature": "passed"
                    },
                }
            );
            console.log('Response from external API:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error sending data to external API:', error);
            throw error;
        }
    }

    private isBase64(str: string): boolean {
        try {
            return (FILE_KEYS.includes(str))
        } catch (err) {
            return false;
        }
    }

    private decodeBase64(base64String: string): { buffer: Buffer; extension: string; mimeType: string } {
        // Check if the base64 string has a data URI prefix
        const signatures = {
            JVBERi0: 'application/pdf',
            // R0lGODdh: 'image/gif',
            // R0lGODlh: 'image/gif',
            iVBORw0KGgo: 'image/png',
            '/9j/': 'image/jpg',
        };
        
        let extension = 'bin'; // Default extension
        let mimeType = 'application/octet-stream'; // Default MIME type

        for(const sign in signatures) {
            if(base64String.startsWith(sign)) {
                mimeType = signatures[sign];
                extension = mimeType.split('/')[1]
            }
        }
        const buffer = Buffer.from(base64String, 'base64');
        return { buffer, extension, mimeType };
    }

    private getMimeType (base64: string) {
        const signatures = {
            JVBERi0: 'application/pdf',
            R0lGODdh: 'image/gif',
            R0lGODlh: 'image/gif',
            iVBORw0KGgo: 'image/png',
            '/9j/': 'image/jpg',
        };

        for(const sign in signatures) {
            if(base64.startsWith(sign)) {
                return {extension: sign, mimeType: (signatures[sign]).split('/')[1]};
            }
        }
    };
}