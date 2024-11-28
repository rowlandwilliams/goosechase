import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import locations from './sample-data/locations.json';

const prisma = new PrismaClient();

async function main() {
    await prisma.surfSession.deleteMany({});
    await prisma.location.deleteMany({});
    await prisma.user.deleteMany({});

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash('password', 10);

    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'admin@email.com',
            password: hashedPassword,
        },
    });

    console.log('User created:', user);

    // Seed locations from JSON
    const locationPromises = locations.map((location) =>
        prisma.location.create({
            data: {
                name: location.name,
                surfForecastUrlString: location.surfForecastUrlString,
                latitude: location.latitude,
                longitude: location.longitude,
                breakType: location.breakType,
            },
        })
    );

    const seededLocations = await Promise.all(locationPromises);

    console.log('Locations seeded:', seededLocations.length);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
