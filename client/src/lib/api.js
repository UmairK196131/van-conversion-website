const FALLBACK_SERVICES = [
  {
    id: 1,
    title: 'Full Van Conversion',
    slug: 'full-van-conversion',
    description:
      'Complete interior and exterior transformation tailored to your adventure lifestyle.',
    imageUrl: null,
    sortOrder: 1,
  },
  {
    id: 2,
    title: 'Interior Fit-Out',
    slug: 'interior-fit-out',
    description: 'Custom cabinetry, sleeping, kitchen, and storage solutions.',
    imageUrl: null,
    sortOrder: 2,
  },
  {
    id: 3,
    title: 'Electrical & Solar',
    slug: 'electrical-solar',
    description: 'Off-grid power systems, lithium batteries, and solar panel installation.',
    imageUrl: null,
    sortOrder: 3,
  },
];

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Mercedes Sprinter Adventure',
    slug: 'mercedes-sprinter-adventure',
    description: 'A fully equipped overland Sprinter with pop-top roof and full kitchen.',
    vehicleModel: 'Mercedes Sprinter LWB',
    afterImage: null,
    gallery: ['https://placehold.co/800x600/1C2541/3A86FF?text=Sprinter+Adventure'],
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

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
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
    return data?.length ? data : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
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
