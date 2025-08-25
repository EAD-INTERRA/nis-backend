import { seedCountries, seedNationalities, seedNotificationChannels, seedNotificationProviders, seedPassportTypes, seedPermissions, seedStatesInNigeria, seedVisaRequirements, seedVisaTypes } from '../libs/db/src/seeders/utils.seed';
import { createSuperAdmin } from '../libs/db/src/seeders/superadmin.seed'
import { PrismaClient } from '@prisma/core/client'
const prisma = new PrismaClient()

// createSuperAdmin(prisma)
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

  // Main seeding function
export async function seedAll() {
    const prisma = new PrismaClient();

    try {
        await createSuperAdmin(prisma)
        await seedNotificationProviders(prisma);
        await seedNotificationChannels(prisma);
        await seedCountries(prisma);
        await seedVisaTypes(prisma);
        await seedPassportTypes(prisma);
        await seedStatesInNigeria(prisma);
        await seedNationalities(prisma);
        await seedVisaRequirements(prisma);
        await seedPermissions(prisma);
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the main seeding function
seedAll();