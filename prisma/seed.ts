import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
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
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
