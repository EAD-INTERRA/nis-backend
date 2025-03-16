import { PrismaClient } from "@prisma/client";
import { COUNTRIES, NATIONALITIES, PASSPORT_TYPES, STATES_IN_NIGERIA, VISA_TYPES } from "../data/nationality";

const providers = ["COURE", "AFRICASTALKING", "SENDGRID"]
const channels = ["SMS", "EMAIL"]

export async function seedNotificationProviders(db: PrismaClient = new PrismaClient()) {
    const prisma = db;

    for (const p of providers) {
        try {
            const coure = await prisma.notificationProvider.upsert({
                create: {
                    name: p
                },
                where: {
                    name: p
                },
                update: {}
            });

            if (coure) {
                console.log(`${p} created successfully`);
            }
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    }
}

export async function seedNotificationChannels(db: PrismaClient = new PrismaClient()) {
    const prisma = db;

    for (const p of channels) {
        try {
            const coure = await prisma.notificationChannel.upsert({
                create: {
                    name: p
                },
                where: {
                    name: p
                },
                update: {}
            });

            if (coure) {
                console.log(`${p} created successfully`);
            }
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    }
}


export async function seedCountries(db: PrismaClient = new PrismaClient()) {
    const prisma = db;

    for (const country of COUNTRIES) {
        try {
            const result = await prisma.country.upsert({
                create: {
                    name: country.name,
                    code: country.code,
                },
                where: {
                    code: country.code,
                },
                update: {},
            });

            if (result) {
                console.log(`${country.name} created successfully`);
            }
        } catch (error) {
            console.error('Error creating country:', error);
        }
    }
}

export async function seedVisaTypes(db: PrismaClient = new PrismaClient()) {
    const prisma = db;

    for (const visaType of VISA_TYPES) {
        try {
            const result = await prisma.visaType.upsert({
                create: {
                    name: visaType.name,
                },
                where: {
                    name: visaType.name,
                },
                update: {},
            });

            if (result) {
                console.log(`${visaType.name} created successfully`);
            }
        } catch (error) {
            console.error('Error creating visa type:', error);
        }
    }
}

export async function seedPassportTypes(db: PrismaClient = new PrismaClient()) {
    const prisma = db;

    for (const passportType of PASSPORT_TYPES) {
        try {
            const result = await prisma.passportType.upsert({
                create: {
                    name: passportType.name,
                },
                where: {
                    name: passportType.name,
                },
                update: {},
            });

            if (result) {
                console.log(`${passportType.name} created successfully`);
            }
        } catch (error) {
            console.error('Error creating passport type:', error);
        }
    }
}


export async function seedStatesInNigeria(db: PrismaClient = new PrismaClient()) {
    const prisma = db;

    for (const state of STATES_IN_NIGERIA) {
        try {
            const result = await prisma.state.upsert({
                create: {
                    name: state.name,
                },
                where: {
                    name: state.name,
                },
                update: {},
            });

            if (result) {
                console.log(`${state.name} created successfully`);
            }
        } catch (error) {
            console.error('Error creating state:', error);
        }
    }
}


export async function seedNationalities(db: PrismaClient = new PrismaClient()) {
    const prisma = db;

    for (const p of NATIONALITIES) {
        try {
            const coure = await prisma.nationality.upsert({
                create: {
                    name: p.name,
                    external_id: p.value,
                    visa_types: {
                        connect: VISA_TYPES.map((vt) => ({ name: vt.name })),
                    },
                    passport_types: {
                        connect: PASSPORT_TYPES.map((pt) => ({ name: pt.name })),
                    },
                },
                where: {
                    external_id: p.value,
                },
                update: {
                    visa_types: {
                        connect: VISA_TYPES.map((vt) => ({ name: vt.name })),
                    },
                    passport_types: {
                        connect: PASSPORT_TYPES.map((pt) => ({ name: pt.name })),
                    },
                }
            });

            if (coure) {
                console.log(`${p} created successfully`);
            }
        } catch (error) {
            console.error('Error creating Nationality:', error);
        }
    }
}