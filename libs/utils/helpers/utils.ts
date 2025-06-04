import { PrismaClient } from '@prisma/core/client';
import * as bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import { Parser } from 'json2csv';
import * as fs from 'fs';
import { parseISO, isValid } from 'date-fns';


// Encryption imports
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


export interface IOPagination {
    data: any;
    page: number;
    page_size: number;
    totalCount: number
}


const prisma = new PrismaClient()

export async function hashPassword(password: string, saltOrRounds: number = 10) {
    const hashed = await bcrypt.hash(password, saltOrRounds);
    return hashed
}

export async function generateToken(prefix?: string, suffix?: string) {
    // Generate a password reset token with a length of 32 bytes (length/2 hex characters)
    let token = await crypto.randomBytes(8).toString('hex');
    if (prefix) {
        token = prefix + token
    }
    if (suffix) {
        token += suffix
    }
    return token
}

export async function generateNumericToken() {
    return Math.floor(100000 + Math.random() * 900000)
}

export async function generateActivationToken() {
    const token = await generateNumericToken()
    const existingUser = await prisma.user.findUnique({
        where: {
            activation_token: token
        }
    })
    if (existingUser && (existingUser.activation_token === token)) {
        generateActivationToken()
    }
    return token
}

export async function generateResetToken() {
    const token = await generateNumericToken()
    const existingUser = await prisma.user.findUnique({
        where: {
            password_reset_token: token
        }
    })
    if (existingUser && (existingUser.password_reset_token === token)) {
        generateActivationToken()
    }
    return token
}

export async function generateLoginOtp() {
    const token = Math.floor(100000 + Math.random() * 900000)
    const existingUser = await prisma.user.findUnique({
        where: {
            login_token: token
        }
    })
    if (existingUser && (existingUser.login_token === token)) {
        generateLoginOtp()
    }
    return token
}

export async function paginate(data: IOPagination) {
    const currentPage = +data.page || 1;
    const pageSize = +data.page_size || 20;
    const totalPages = Math.ceil(data.totalCount / pageSize);

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const previousPage = currentPage > 1 ? currentPage - 1 : null;

    console.log("DATA: ", data)

    return { 
        results: data.data, 
        count: data.totalCount, 
        nextPage, 
        previousPage 
    }
}

export async function pagingData(data, page, limit, records) {
    const { count: totalItems, rows: result } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, records, totalPages, currentPage };
}


export async function writeToCsv(fileName: string, data) {
    // Create a new parser instance
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    // Write CSV to a file
    await fs.writeFile(`${fileName}.csv`, csv, (err) => {
        if (err) {
            console.error('Error writing CSV file', err);
        } else {
            console.log('CSV file saved successfully');
        }
    });
}



const _scrypt = promisify(scrypt);

export class Encryption {
    private static password = process.env.ENCRYPTION_PASSWORD ?? 'YourStrongPassword';

    private static async getKey(): Promise<Buffer> {
        return (await _scrypt(Encryption.password, 'salt', 32)) as Buffer;
    }

    static async encryptData(data: string, suffix?: string): Promise<{ encryptedData: string; iv: string }> {
        // Encrypt some data with some an optional suffix
        const iv = randomBytes(16); // Generate a new IV for each encryption
        const key = await Encryption.getKey();
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        let dataToEncrypt = data;

        if (suffix) {
            dataToEncrypt = `${data}-${suffix}`
        }

        const encryptedText = Buffer.concat([
            cipher.update(dataToEncrypt),
            cipher.final(),
        ]);

        console.log("encryptedText: ", encryptedText)

        // Return both encrypted text and IV as hex strings (not Buffers)
        return {
            encryptedData: encryptedText.toString('hex'),
            iv: iv.toString('hex'),
        };
    }

    static async decryptData(encryptedData: string, iv: string, suffix?: boolean): Promise<string> {
        // Decrypt some data which has an optional suffix - "True" shows that the original data has a suffix which should be stripped in the response
        const key = await Encryption.getKey();
        const ivBuf = Buffer.from(iv, 'hex')
        const decipher = createDecipheriv('aes-256-ctr', key, ivBuf);

        const encryptedBuf = Buffer.from(encryptedData, 'hex')

        const decryptedText = Buffer.concat([
            decipher.update(encryptedBuf),
            decipher.final(),
        ]);

        const output = decryptedText.toString();

        if (suffix) {
            return output.split("-")[0]
        }

        return output
    }
}



export const transformDate = (value: any): string | null => {
    if (!value) {
        return null;
    }
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
        // Try to fix a "YYYY-MM-DD" format manually
        try {
            const fixed = `${value}T00:00:00.000Z`;
            parsed = new Date(fixed);
        } catch {
            return null;
        }
    }

    return isValid(parsed) ? parsed.toISOString() : null;
}