import { PrismaClient } from '@prisma/client';
import { categories, items } from './data';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.category.deleteMany();
    console.log('Deleted records in the `categories` table');

    await prisma.category.createMany({ data: categories });
    console.log('Added category data');

    await prisma.item.deleteMany();
    console.log('Deleted records in the `items` table');

    await prisma.item.createMany({ data: items });
    console.log('Added item data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
