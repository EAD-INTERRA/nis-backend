
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class AuditMiddleware implements NestMiddleware {
//     use(req: Request & {
//         user: any
//     }, res: Response, next: NextFunction) {
//         console.log('Request...');
//         console.log('Request User: ', req.user);
//         console.log('Request Response: ', res.json());
//         next();
//     }
// }
// // Compare this snippet from apps/auth/src/auth.module.ts:
// // import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';


import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export function auditLogger(req: Request & { user: any }, res: Response, next: NextFunction) {
    console.log(`Request...`);
    console.log('Request User: ', req.user);
    // Capture the original send method
    const originalSend = res.send;

    // Override the send method to capture the response body
    // res.send = function (body) {
    //     console.log('Response Body: ', body);
    //     res.send = originalSend; // Restore the original send method
    //     return res.send(body); // Send the response
    // };

    // Log the response status code instead of calling res.json()
    res.on('finish', async () => {
        console.log('Response Status: ', res.statusCode);

        // Create a new audit record
        await prisma.audit.create({
            data: {
                user_id: req.user?.sub || null, // Use 'anonymous' if user is not defined
                ip: req.ip,
                action: req.method,
                path: req.originalUrl,
                description: `Response Status: ${res.statusCode}`
            }
        });
    });
    next();
    // next();
};
