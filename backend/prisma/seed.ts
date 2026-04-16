import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

// Major Ukraine cities
const ukraineCities = [
  'Київ',
  'Львів',
  'Одеса',
  'Дніпро',
  'Харків',
  'Запоріжжя',
  'Кривий Ріг',
];

function getRandomCity(): string {
  return ukraineCities[Math.floor(Math.random() * ukraineCities.length)];
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function getRandomPrice(): number {
  // Realistic train ticket prices in UAH (100-2000 UAH)
  return Math.floor(Math.random() * 1900) + 100;
}

async function main() {
  // Clear existing schedules
  await prisma.schedule.deleteMany();

  // Generate 30 schedules
  const schedules = [];
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < 30; i++) {
    const from = getRandomCity();
    let to = getRandomCity();

    // Ensure from and to are different
    while (from === to) {
      to = getRandomCity();
    }

    const schedule = {
      from,
      to,
      date: getRandomDate(now, twoWeeksLater),
      price: getRandomPrice(),
    };

    schedules.push(schedule);
  }

  // Insert all schedules
  await prisma.schedule.createMany({
    data: schedules,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
