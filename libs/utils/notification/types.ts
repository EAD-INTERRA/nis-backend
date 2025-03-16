export enum EmailType {
    activate = "activate",
    change_password = "change_password",
    inquiry_received = "inquiry_received",
    new_inquiry = "new_inquiry",
    activation_success = "activation_success",
    change_password_success = "change_password_success",
    login_otp = "login_otp"
}

export class EmailTemplateDto {
    recipientName?: string;
    senderName?: string;
    senderEmail?: string;
    senderPhone?: string;
    token?: string;
    message?: string;
    type?: EmailType
}


export interface SendEmailDto {
    sender: string; 
    recipient?: string; 
    subject?: string; 
    message?: string; 
    recipientName?: string; 
    senderName?: string; 
    senderEmail?: string; 
    senderPhone?: string; 
    type?: EmailType 
    token?: string; 
    filePath?: string; 
    fileName?: string; 
    template?: string;
}