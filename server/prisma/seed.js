import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@vanconversion.local' },
    update: {},
    create: {
      email: 'admin@vanconversion.local',
      passwordHash,
      role: 'ADMIN',
    },
  });

  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'full-van-conversion' },
      update: {},
      create: {
        title: 'Full Van Conversion',
        slug: 'full-van-conversion',
        description:
          'Complete interior and exterior transformation tailored to your adventure lifestyle.',
        sortOrder: 1,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'interior-fit-out' },
      update: {},
      create: {
        title: 'Interior Fit-Out',
        slug: 'interior-fit-out',
        description: 'Custom cabinetry, sleeping, kitchen, and storage solutions.',
        sortOrder: 2,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'electrical-solar' },
      update: {},
      create: {
        title: 'Electrical & Solar',
        slug: 'electrical-solar',
        description: 'Off-grid power systems, lithium batteries, and solar panel installation.',
        sortOrder: 3,
      },
    }),
  ]);

  await prisma.project.upsert({
    where: { slug: 'mercedes-sprinter-adventure' },
    update: {},
    create: {
      title: 'Mercedes Sprinter Adventure',
      slug: 'mercedes-sprinter-adventure',
      description: 'A fully equipped overland Sprinter with pop-top roof and full kitchen.',
      vehicleModel: 'Mercedes Sprinter LWB',
      isFeatured: true,
      gallery: ['https://placehold.co/800x600/1C2541/3A86FF?text=Gallery+1'],
    },
  });

  await prisma.testimonial.upsert({
    where: { id: 1 },
    update: {},
    create: {
      clientName: 'Sarah Mitchell',
      quote: 'The team exceeded every expectation. Our van feels like a boutique hotel on wheels.',
      rating: 5,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'choosing-the-right-base-van' },
    update: {},
    create: {
      title: 'Choosing the Right Base Van for Your Conversion',
      slug: 'choosing-the-right-base-van',
      excerpt: 'A practical guide to selecting the perfect platform for your camper build.',
      content:
        '<p>Starting with the right base van is the most important decision in any conversion project...</p>',
      authorId: admin.id,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  await prisma.faqItem.createMany({
    data: [
      {
        question: 'How long does a full conversion take?',
        answer:
          'Most full conversions take 8–16 weeks depending on complexity and custom features.',
        category: 'Process',
        sortOrder: 1,
      },
      {
        question: 'Do you work with vans I already own?',
        answer:
          'Yes — we convert customer-owned vehicles as well as sourcing base vans on request.',
        category: 'General',
        sortOrder: 2,
      },
    ],
    skipDuplicates: true,
  });

  console.log(
    `Seeded: admin user, ${services.length} services, sample project, testimonial, blog post, FAQ items`
  );
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
