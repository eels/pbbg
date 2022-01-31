import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function UserSeeder() {
  await prisma.user.upsert({
    create: {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    update: {
      //
    },
    where: {
      id: 1,
    },
  });

  await prisma.$disconnect();
}
