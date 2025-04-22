import { PrismaClient } from "@prisma/core/client";
import { COMMON_UPLOADS, COUNTRIES, NATIONALITIES, PASSPORT_TYPES, PORTS_OF_ENTRY, STATES_IN_NIGERIA, VISA_SPECIFIC_UPLOADS_MAP, VISA_TYPES } from "../data/nationality";

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

export async function seedPortsOfEntry(db: PrismaClient = new PrismaClient()) {
    const prisma = db;

    for (const port of PORTS_OF_ENTRY) {
        try {
            const result = await prisma.portOfEntry.upsert({
                create: {
                    name: port.name,
                },
                where: {
                    name: port.name,
                },
                update: {},
            });

            if (result) {
                console.log(`${port.name} created successfully`);
            }
        } catch (error) {
            console.error('Error creating port of entry:', error);
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
                    key: visaType.key,
                },
                where: {
                    key: visaType.key,
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


export async function seedVisaRequirements(db: PrismaClient = new PrismaClient()) {
    const prisma = db;
  
    for (const visaType of VISA_TYPES) {
      // Seed common uploads for all visa types
      for (const upload of COMMON_UPLOADS) {
        try {
          const existingRequirement = await prisma.visaRequirement.findUnique({
            where: { name: upload.field },
          });
  
          if (existingRequirement) {
            await prisma.visaRequirement.update({
              where: { id: existingRequirement.id },
              data: {
                visa_types: {
                  connect: { key: visaType.key },
                },
              },
            });
          } else {
            await prisma.visaRequirement.create({
              data: {
                name: upload.field,
                field: upload.field,
                label: upload.label,
                required: upload.required,
                visa_types: {
                  connect: { key: visaType.key },
                },
              },
            });
          }
  
          console.log(`${upload.field} for ${visaType.name} processed successfully`);
        } catch (error) {
          console.error(`Error processing ${upload.field} for ${visaType.name}:`, error);
        }
      }
  
      // Seed visa-specific uploads
      const specificUploads = VISA_SPECIFIC_UPLOADS_MAP[visaType.key];
      if (specificUploads) {
        for (const upload of specificUploads) {
          try {
            const existingRequirement = await prisma.visaRequirement.findUnique({
              where: { name: upload.field },
            });
  
            if (existingRequirement) {
              await prisma.visaRequirement.update({
                where: { id: existingRequirement.id },
                data: {
                  visa_types: {
                    connect: { key: visaType.key },
                  },
                },
              });
            } else {
              await prisma.visaRequirement.create({
                data: {
                  name: upload.field,
                  field: upload.field,
                  label: upload.label,
                  required: upload.required,
                  visa_types: {
                    connect: { key: visaType.key },
                  },
                },
              });
            }
  
            console.log(`${upload.field} for ${visaType.name} processed successfully`);
          } catch (error) {
            console.error(`Error processing ${upload.field} for ${visaType.name}:`, error);
          }
        }
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