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
    prisma.service.upsert({
      where: { slug: 'pop-top-roof' },
      update: {},
      create: {
        title: 'Pop-Top Roof Installation',
        slug: 'pop-top-roof',
        description:
          'Standing room and extra sleeping space with professionally installed pop-top roofs.',
        sortOrder: 4,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'insulation-ventilation' },
      update: {},
      create: {
        title: 'Insulation & Ventilation',
        slug: 'insulation-ventilation',
        description:
          'Thermal and acoustic insulation plus roof vents and fans for year-round comfort.',
        sortOrder: 5,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'custom-upholstery' },
      update: {},
      create: {
        title: 'Custom Upholstery',
        slug: 'custom-upholstery',
        description:
          'Premium cushions, curtains, and soft furnishings in fabrics built for van life.',
        sortOrder: 6,
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
      beforeImage: 'https://placehold.co/1200x800/2A2F3D/8899AA?text=Before',
      afterImage: 'https://placehold.co/1200x800/1C2541/3A86FF?text=After',
      isFeatured: true,
      gallery: [
        'https://placehold.co/800x600/1C2541/3A86FF?text=Gallery+1',
        'https://placehold.co/800x600/1C2541/6EA8FF?text=Gallery+2',
      ],
    },
  });

  await prisma.project.upsert({
    where: { slug: 'ford-transit-family-explorer' },
    update: {},
    create: {
      title: 'Ford Transit Family Explorer',
      slug: 'ford-transit-family-explorer',
      description: 'A family-friendly Transit with bunk beds, full bathroom, and ample storage.',
      vehicleModel: 'Ford Transit High Roof',
      beforeImage: 'https://placehold.co/1200x800/2A2F3D/8899AA?text=Before',
      afterImage: 'https://placehold.co/1200x800/1C2541/4CC9F0?text=After',
      isFeatured: true,
      gallery: ['https://placehold.co/800x600/1C2541/4CC9F0?text=Transit+Gallery'],
    },
  });

  await prisma.project.upsert({
    where: { slug: 'ram-promaster-urban-camper' },
    update: {},
    create: {
      title: 'Ram ProMaster Urban Camper',
      slug: 'ram-promaster-urban-camper',
      description: 'Compact city-friendly ProMaster with murphy bed and modular kitchen pod.',
      vehicleModel: 'Ram ProMaster 159',
      beforeImage: 'https://placehold.co/1200x800/2A2F3D/8899AA?text=Before',
      afterImage: 'https://placehold.co/1200x800/1C2541/8338EC?text=After',
      isFeatured: true,
      gallery: ['https://placehold.co/800x600/1C2541/8338EC?text=ProMaster+Gallery'],
    },
  });

  await prisma.project.upsert({
    where: { slug: 'sprinter-off-grid-weekender' },
    update: {},
    create: {
      title: 'Sprinter Off-Grid Weekender',
      slug: 'sprinter-off-grid-weekender',
      description: 'Solar-powered weekend warrior with lithium bank and outdoor shower.',
      vehicleModel: 'Mercedes Sprinter 144',
      beforeImage: 'https://placehold.co/1200x800/2A2F3D/8899AA?text=Before',
      afterImage: 'https://placehold.co/1200x800/1C2541/3A86FF?text=After',
      isFeatured: false,
      gallery: ['https://placehold.co/800x600/1C2541/3A86FF?text=Weekender'],
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

  await prisma.testimonial.upsert({
    where: { id: 2 },
    update: {},
    create: {
      clientName: 'James Rivera',
      quote:
        'From design to delivery, the craftsmanship was outstanding. We are living our dream on the road.',
      rating: 5,
    },
  });

  await prisma.testimonial.upsert({
    where: { id: 3 },
    update: {},
    create: {
      clientName: 'Emma & Tom Walsh',
      quote:
        'They listened to every detail and built exactly what we envisioned. Could not recommend more highly.',
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

  await prisma.faqItem.deleteMany({});

  await prisma.faqItem.createMany({
    data: [
      {
        question: 'Do you work with vans I already own?',
        answer:
          'Yes — we convert customer-owned vehicles as well as sourcing base vans on request. We will assess your van during the initial consultation.',
        category: 'General',
        sortOrder: 1,
      },
      {
        question: 'What areas do you serve?',
        answer:
          'We are based in Portland, Oregon and serve clients across the Pacific Northwest. Out-of-state clients can deliver their vehicle to our workshop.',
        category: 'General',
        sortOrder: 2,
      },
      {
        question: 'How much does a full van conversion cost?',
        answer:
          'Full conversions typically range from $65,000 to $150,000+ depending on the base vehicle, layout complexity, and systems.',
        category: 'Pricing',
        sortOrder: 1,
      },
      {
        question: 'Do you offer payment plans?',
        answer:
          'We require a deposit to begin design and milestone payments throughout the build. Third-party financing options are available.',
        category: 'Pricing',
        sortOrder: 2,
      },
      {
        question: 'How long does a full conversion take?',
        answer:
          'Most full conversions take 8–16 weeks depending on complexity and custom features.',
        category: 'Timeline',
        sortOrder: 1,
      },
      {
        question: 'Can I visit the workshop during my build?',
        answer:
          'Absolutely. We encourage visits at key milestones and send weekly photo updates if you cannot visit in person.',
        category: 'Timeline',
        sortOrder: 2,
      },
      {
        question: 'Can I choose my own materials and appliances?',
        answer:
          'Yes — we work with you to select finishes, fabrics, and appliances that match your style and budget.',
        category: 'Customization',
        sortOrder: 1,
      },
      {
        question: 'Do you install 4x4 or lift kits?',
        answer:
          'We partner with trusted specialists for suspension lifts and 4x4 conversions as part of your overall project.',
        category: 'Customization',
        sortOrder: 2,
      },
    ],
  });

  console.log(
    `Seeded: admin user, ${services.length} services, ${4} projects, testimonials, blog post, FAQ items`
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
