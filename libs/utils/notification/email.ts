import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv';
import { NotificationType, PrismaClient } from '@prisma/core/client';
import { EmailTemplateDto, EmailType, SendEmailDto } from './types';

dotenv.config()

// Initialize Prisma client
const prisma = new PrismaClient();

const transport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 2525,
    auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
    }
});


const emailTemplate = ({
    recipientName,
    senderName,
    message,
    token,
    type,
    senderEmail,
    senderPhone
}: EmailTemplateDto) => {
    if (type === EmailType.activate) {
        return `
      <!DOCTYPE html>
      <html lang="en">
          <head>
          Here is your activation token: ${token}
          <style>
          </head>
        </html?
        `
    } else if (type === EmailType.activation_success) {
        return `
      <!DOCTYPE html>
      <html lang="en">
          <head>
          Account activated successfully
          <style>
          </head>
        </html?
        `
    } else if (type === EmailType.change_password) {
        return `
      <!DOCTYPE html>
      <html lang="en">
          <head>
          Here is your password reset token: ${token}
          <style>
          </head>
        </html?
        `
    }
}




export async function sendEmail(data: SendEmailDto): Promise<any> {
    // if (!data.sender || !data.recipient || !data.subject || !data.message) {
    //     throw new Error('Missing required fields');
    // }

    data.template = data.template ? data.template : emailTemplate({
        recipientName: data.recipientName,
        senderName: data.senderName,
        senderEmail: data.sender,
        senderPhone: data.senderPhone,
        message: data.message,
        token: data.token,
        type: data.type
    })

    try {
        let info;
        if (data.fileName) {
            info = await transport.sendMail({
                from: `${data.senderName} <${data.sender}>`,
                to: data.recipient,
                subject: data.subject,
                html: data.template,
                attachments: [
                    {
                        filename: data.fileName, // Change to your desired filename
                        path: data.filePath// Path to the file you want to attach
                    }
                ]
            });
        } else {
            info = await transport.sendMail({
                from: `${data.senderName} <${data.sender}>`,
                to: data.recipient,
                subject: data.subject,
                html: data.template,
            });
        }

        const result: string = info.response
        const statusCode = parseInt(result.split(" ")[0])

         // Create notification log
         const provider = await prisma.notificationProvider.findUnique({
            where: {
                name: "SENDGRID"
            }
        });
        const channel = await prisma.notificationChannel.findUnique({
            where: {
                name: "EMAIL"
            }
        });

        // Create notification log
        await prisma.notificationLog.create({
            data: {
                channel: { connect: { id: channel.id } }, // EMAIL channel ID in the notification_channels table (EMAIL)
                status_code: statusCode ?? 200,
                content: data.type,
                emails: info.envelope?.to,
                provider: { connect: { id: provider.id } }, // EMAIL provider ID in the notification_providers table (SENDGRID)
                reference_no: info.messageId,
                received_at: null,
                type: NotificationType.OUTGOING
            }
        })

        console.log('Email INFO: ', info);
        console.log('Email sent: ', info.response);

        return {
            emailResponse: info.response
        };
    } catch (err) {
        console.error('Error sending Email notification:', err);

    }
}
