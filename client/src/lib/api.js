const FALLBACK_SERVICES = [
  {
    id: 1,
    title: 'Full Van Conversion',
    slug: 'full-van-conversion',
    description:
      'Complete interior and exterior transformation tailored to your adventure lifestyle — from insulation and cabinetry to electrical, plumbing, and finishing touches.',
    imageUrl: null,
    sortOrder: 1,
  },
  {
    id: 2,
    title: 'Interior Fit-Out',
    slug: 'interior-fit-out',
    description:
      'Custom cabinetry, sleeping, kitchen, and storage solutions designed around your layout.',
    imageUrl: null,
    sortOrder: 2,
  },
  {
    id: 3,
    title: 'Electrical & Solar',
    slug: 'electrical-solar',
    description:
      'Off-grid power systems, lithium batteries, and solar panel installation for true independence.',
    imageUrl: null,
    sortOrder: 3,
  },
  {
    id: 4,
    title: 'Pop-Top Roof Installation',
    slug: 'pop-top-roof',
    description:
      'Standing room and extra sleeping space with professionally installed pop-top roofs.',
    imageUrl: null,
    sortOrder: 4,
  },
  {
    id: 5,
    title: 'Insulation & Ventilation',
    slug: 'insulation-ventilation',
    description: 'Thermal and acoustic insulation plus roof vents and fans for year-round comfort.',
    imageUrl: null,
    sortOrder: 5,
  },
  {
    id: 6,
    title: 'Custom Upholstery',
    slug: 'custom-upholstery',
    description: 'Premium cushions, curtains, and soft furnishings in fabrics built for van life.',
    imageUrl: null,
    sortOrder: 6,
  },
];

const FALLBACK_FAQ = [
  {
    id: 1,
    question: 'Do you work with vans I already own?',
    answer:
      'Yes — we convert customer-owned vehicles as well as sourcing base vans on request. We will assess your van during the initial consultation to confirm it is a suitable platform.',
    category: 'General',
    sortOrder: 1,
  },
  {
    id: 2,
    question: 'What areas do you serve?',
    answer:
      'We are based in Portland, Oregon and serve clients across the Pacific Northwest. We also accept projects from out-of-state clients who can deliver their vehicle to our workshop.',
    category: 'General',
    sortOrder: 2,
  },
  {
    id: 3,
    question: 'How much does a full van conversion cost?',
    answer:
      'Full conversions typically range from $65,000 to $150,000+ depending on the base vehicle, layout complexity, and systems. We provide itemised quotes after the design phase.',
    category: 'Pricing',
    sortOrder: 1,
  },
  {
    id: 4,
    question: 'Do you offer payment plans?',
    answer:
      'We require a deposit to begin design and milestone payments throughout the build. Third-party financing options are available — ask us for recommended partners.',
    category: 'Pricing',
    sortOrder: 2,
  },
  {
    id: 5,
    question: 'How long does a full conversion take?',
    answer:
      'Most full conversions take 8–16 weeks depending on complexity and custom features. We provide a detailed timeline during the design phase.',
    category: 'Timeline',
    sortOrder: 1,
  },
  {
    id: 6,
    question: 'Can I visit the workshop during my build?',
    answer:
      'Absolutely. We encourage visits at key milestones and send weekly photo updates if you cannot visit in person.',
    category: 'Timeline',
    sortOrder: 2,
  },
  {
    id: 7,
    question: 'Can I choose my own materials and appliances?',
    answer:
      'Yes — we work with you to select finishes, fabrics, and appliances that match your style and budget. We will advise on what works best in a mobile environment.',
    category: 'Customization',
    sortOrder: 1,
  },
  {
    id: 8,
    question: 'Do you install 4x4 or lift kits?',
    answer:
      'We partner with trusted specialists for suspension lifts and 4x4 conversions. We can coordinate these as part of your overall project.',
    category: 'Customization',
    sortOrder: 2,
  },
];

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Mercedes Sprinter Adventure',
    slug: 'mercedes-sprinter-adventure',
    description: 'A fully equipped overland Sprinter with pop-top roof and full kitchen.',
    vehicleModel: 'Mercedes Sprinter LWB',
    beforeImage: 'https://placehold.co/1200x800/2A2F3D/8899AA?text=Before',
    afterImage: 'https://placehold.co/1200x800/1C2541/3A86FF?text=After',
    gallery: [
      'https://placehold.co/800x600/1C2541/3A86FF?text=Gallery+1',
      'https://placehold.co/800x600/1C2541/6EA8FF?text=Gallery+2',
    ],
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Ford Transit Family Explorer',
    slug: 'ford-transit-family-explorer',
    description: 'A family-friendly Transit with bunk beds, full bathroom, and ample storage.',
    vehicleModel: 'Ford Transit High Roof',
    beforeImage: 'https://placehold.co/1200x800/2A2F3D/8899AA?text=Before',
    afterImage: 'https://placehold.co/1200x800/1C2541/4CC9F0?text=After',
    gallery: ['https://placehold.co/800x600/1C2541/4CC9F0?text=Transit+Gallery'],
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Ram ProMaster Urban Camper',
    slug: 'ram-promaster-urban-camper',
    description: 'Compact city-friendly ProMaster with murphy bed and modular kitchen pod.',
    vehicleModel: 'Ram ProMaster 159',
    beforeImage: 'https://placehold.co/1200x800/2A2F3D/8899AA?text=Before',
    afterImage: 'https://placehold.co/1200x800/1C2541/8338EC?text=After',
    gallery: ['https://placehold.co/800x600/1C2541/8338EC?text=ProMaster+Gallery'],
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Sprinter Off-Grid Weekender',
    slug: 'sprinter-off-grid-weekender',
    description: 'Solar-powered weekend warrior with lithium bank and outdoor shower.',
    vehicleModel: 'Mercedes Sprinter 144',
    beforeImage: 'https://placehold.co/1200x800/2A2F3D/8899AA?text=Before',
    afterImage: 'https://placehold.co/1200x800/1C2541/3A86FF?text=After',
    gallery: ['https://placehold.co/800x600/1C2541/3A86FF?text=Weekender'],
    isFeatured: false,
  },
];

const FALLBACK_BLOG_POSTS = [
  {
    id: 1,
    title: 'Choosing the Right Base Van for Your Conversion',
    slug: 'choosing-the-right-base-van',
    excerpt: 'A practical guide to selecting the perfect platform for your camper build.',
    coverImage: 'https://placehold.co/1200x675/1C2541/3A86FF?text=Base+Van+Guide',
    publishedAt: '2025-06-15T10:00:00.000Z',
    authorName: 'Admin',
    content: `<h2>Why the base van matters</h2>
<p>Starting with the right base van is the most important decision in any conversion project. Wheelbase, roof height, drivetrain, and payload capacity all shape what you can build.</p>
<h2>Popular platforms</h2>
<p>The Mercedes Sprinter, Ford Transit, and Ram ProMaster each have strengths. Sprinters offer premium finishes and 4x4 options; Transits are widely available; ProMasters have a square interior for easier cabinetry.</p>
<h3>Questions to ask</h3>
<ul>
<li>How many people need to sleep comfortably?</li>
<li>Will you drive off-pavement regularly?</li>
<li>What is your realistic payload after water, gear, and passengers?</li>
</ul>
<p>Book a consultation and we will help you match a base van to your travel style and budget.</p>`,
    relatedPosts: [
      {
        id: 2,
        title: '5 Essential Electrical Upgrades for Off-Grid Van Life',
        slug: 'essential-electrical-upgrades',
        excerpt: 'Power systems that keep you comfortable miles from the nearest outlet.',
        publishedAt: '2025-05-20T10:00:00.000Z',
      },
      {
        id: 3,
        title: 'Planning Your Van Kitchen Layout',
        slug: 'planning-van-kitchen-layout',
        excerpt: 'Counter space, appliances, and storage trade-offs for mobile cooking.',
        publishedAt: '2025-04-10T10:00:00.000Z',
      },
    ],
  },
  {
    id: 2,
    title: '5 Essential Electrical Upgrades for Off-Grid Van Life',
    slug: 'essential-electrical-upgrades',
    excerpt: 'Power systems that keep you comfortable miles from the nearest outlet.',
    coverImage: 'https://placehold.co/1200x675/1C2541/4CC9F0?text=Electrical+Upgrades',
    publishedAt: '2025-05-20T10:00:00.000Z',
    authorName: 'Admin',
    content: `<h2>Start with your daily usage</h2>
<p>Before choosing batteries and inverters, list every device you run and how long you use it each day.</p>
<h2>Our top five upgrades</h2>
<ol>
<li>Lithium house battery bank sized for 2–3 days off-grid</li>
<li>MPPT solar charge controller with 400W+ of roof panels</li>
<li>Multi-plus inverter/charger for shore power and alternator charging</li>
<li>Dedicated 12V fuse panel with labelled circuits</li>
<li>Battery monitor with shunt for accurate state-of-charge</li>
</ol>`,
    relatedPosts: [],
  },
  {
    id: 3,
    title: 'Planning Your Van Kitchen Layout',
    slug: 'planning-van-kitchen-layout',
    excerpt: 'Counter space, appliances, and storage trade-offs for mobile cooking.',
    coverImage: 'https://placehold.co/1200x675/1C2541/8338EC?text=Kitchen+Layout',
    publishedAt: '2025-04-10T10:00:00.000Z',
    authorName: 'Admin',
    content: `<h2>Galley vs. pull-out pod</h2>
<p>Fixed galley layouts maximise counter space along one wall. Pull-out kitchen pods free up floor space when cooking is not the priority.</p>
<h2>Appliance choices</h2>
<p>Compressor fridges, two-burner cooktops, and shallow sinks each affect cabinet depth.</p>`,
    relatedPosts: [],
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    clientName: 'Sarah Mitchell',
    quote: 'The team exceeded every expectation. Our van feels like a boutique hotel on wheels.',
    rating: 5,
    imageUrl: null,
  },
  {
    id: 2,
    clientName: 'James Rivera',
    quote:
      'From design to delivery, the craftsmanship was outstanding. We are living our dream on the road.',
    rating: 5,
    imageUrl: null,
  },
  {
    id: 3,
    clientName: 'Emma & Tom Walsh',
    quote:
      'They listened to every detail and built exactly what we envisioned. Could not recommend more highly.',
    rating: 5,
    imageUrl: null,
  },
];

function getApiErrorMessage(body, status) {
  if (typeof body.error === 'string') return body.error;
  if (body.error?.message) return body.error.message;
  return `Request failed: ${status}`;
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(getApiErrorMessage(body, response.status));
    error.status = response.status;
    error.fieldErrors = body.errors;
    throw error;
  }
  return body;
}

export async function fetchServices() {
  try {
    const { data } = await fetchJson('/api/services');
    return data?.length ? data : FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function fetchFeaturedProjects() {
  try {
    const { data } = await fetchJson('/api/projects/featured');
    return data?.length ? data : FALLBACK_PROJECTS.filter((project) => project.isFeatured);
  } catch {
    return FALLBACK_PROJECTS.filter((project) => project.isFeatured);
  }
}

function filterFallbackProjects(vehicle) {
  if (!vehicle || vehicle === 'all') return FALLBACK_PROJECTS;

  const term = vehicle.toLowerCase();
  return FALLBACK_PROJECTS.filter((project) => project.vehicleModel.toLowerCase().includes(term));
}

export async function fetchProjects(vehicle) {
  try {
    const query = vehicle ? `?vehicle=${encodeURIComponent(vehicle)}` : '';
    const { data } = await fetchJson(`/api/projects${query}`);
    return data?.length ? data : filterFallbackProjects(vehicle);
  } catch {
    return filterFallbackProjects(vehicle);
  }
}

export async function fetchProject(slug) {
  try {
    const { data } = await fetchJson(`/api/projects/${encodeURIComponent(slug)}`);
    return data ?? null;
  } catch {
    return FALLBACK_PROJECTS.find((project) => project.slug === slug) ?? null;
  }
}

export async function fetchTestimonials() {
  try {
    const { data } = await fetchJson('/api/testimonials');
    return data?.length ? data : FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function fetchFaq() {
  try {
    const { data } = await fetchJson('/api/faq');
    return data?.length ? data : FALLBACK_FAQ;
  } catch {
    return FALLBACK_FAQ;
  }
}

export async function fetchBlogPosts() {
  try {
    const { data } = await fetchJson('/api/blog');
    return data?.length ? data : FALLBACK_BLOG_POSTS;
  } catch {
    return FALLBACK_BLOG_POSTS;
  }
}

export async function fetchBlogPost(slug) {
  try {
    const { data } = await fetchJson(`/api/blog/${encodeURIComponent(slug)}`);
    return data ?? null;
  } catch {
    return FALLBACK_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
  }
}

export async function submitInquiry(payload) {
  const { data } = await fetchJson('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data;
}

export async function subscribeNewsletter(payload) {
  const { data } = await fetchJson('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data;
}

export async function requestBrochure(payload) {
  const { data } = await fetchJson('/api/newsletter/brochure', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data;
}
