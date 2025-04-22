
import * as crypto from "crypto"
import axios from "axios";
import { NotificationType, PrismaClient } from "@prisma/core/client";

const prisma = new PrismaClient();

function generateRandomString(prefix: string="", length?: number, suffix: string="") {
    const result = crypto.randomBytes(length ?? 16).toString('hex');
    return `${prefix}-${result}-${suffix}`
  }

const baseUrlAT = "https://api.africastalking.com/version1/messaging"
const AT_username = process.env.AFRICASTALKING_USERNAME
const AT_shortCode = process.env.AFRICASTALKING_SHORTCODE

const axiosInstance = axios.create({
    headers: {
        'apiKey': process.env.AFRICASTALKING_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export async function sendSMS(phoneNumbers: string[], message?: string) {
    // const formatted = phoneNumbers.map((p) => `+234${p.slice(1)}`)
    const numbers = phoneNumbers.join()
    const msg = encodeURIComponent(message)

    try {
        const response = await axiosInstance.post(baseUrlAT, `username=${AT_username}&to=${numbers}&message=${msg}&from=${AT_shortCode}`);
         // Create notification log
         const provider = await prisma.notificationProvider.findUnique({
            where: {
                name: "AFRICASTALKING"
            }
        });
        const smsChannel = await prisma.notificationChannel.findUnique({
            where: {
                name: "SMS"
            }
        });
        // Create notification log
        await prisma.notificationLog.create({
            data: {
                channel: { connect: { id: smsChannel.id } }, // SMS channel ID in the notification_channels table,
                status_code: (response.data?.status ?? response.data?.statusCode) ?? response.status,
                content: msg,
                phone_numbers: phoneNumbers,
                provider: { connect: { id: provider.id } }, // Africa's Talking ID in the notification_providers table,
                received_at: null,
                type: NotificationType.OUTGOING
            }
        })
        console.log('SMS notification(s) sent successfully:');
    } catch (error) {
        console.error('Error sending SMS notifications:', error);
    }
}

// sendSMS(["+2347054300575", "+2348166640168", "+2348124140098", "+2348161797075", "+2348077460330"], "Testing+123")
// .catch(e => {
//     console.error(e);
//     process.exit(1);
// })
const baseUrlCOURE = "https://gtw.coure-tech.com/dssms/api/OutboundMessages/SendSms"

const axiosInstanceCoure = axios.create({
    headers: {
        'x-authKey': process.env.COURE_API_KEY,
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
    }
});

export async function notifyCoure(phoneNumber: string, patientCode, message?: string) {
    const formattedNumber = `234${phoneNumber.slice(1)}`;

    const payload = {
        senderId: "3340",
        originatingNo: "3340",
        destinationNo: formattedNumber,
        referenceNo: generateRandomString(patientCode, 16),
        messageId: generateRandomString(patientCode, 16),
        dateCreated: new Date(),
        messageContent: message,
        userChannelType: 1
    }

    try {
        const response = await axiosInstanceCoure.post(baseUrlCOURE, payload);
        // Create notification log
        const provider = await prisma.notificationProvider.findUnique({
            where: {
                name: "COURE"
            }
        });
        const smsChannel = await prisma.notificationChannel.findUnique({
            where: {
                name: "SMS"
            }
        });
        await prisma.notificationLog.create({
            data: {
                channel: { connect: { id: smsChannel?.id } }, // SMS channel ID in the notification_channels table,
                status_code: (response.data?.status ?? response.data?.statusCode) ?? response.status,
                content: message,
                phone_numbers: [phoneNumber],
                provider: { connect: { id: provider.id } }, // COURE ID in the notification_providers table,
                reference_no: response.data.messageId,
                received_at: null,
                type: NotificationType.OUTGOING
            }
        })
        console.log('SMS notification sent to COURE: ', response.data);
    } catch (error) {
        console.error('Error sending SMS notification to COURE: ', error);
    }
}
