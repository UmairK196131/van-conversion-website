export const SITE = {
  name: 'Van Conversion & Camper',
  tagline: 'Bespoke adventure vehicles built for the road ahead.',
  email: 'hello@vanconversion.com',
  phone: '+1 (555) 123-4567',
  address: '123 Workshop Lane, Portland, OR 97201',
  hours: 'Mon–Fri 9:00 AM – 5:00 PM · Sat by appointment',
  mapEmbedUrl: 'https://maps.google.com/maps?q=123+Workshop+Lane,+Portland,+OR+97201&output=embed',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '15551234567',
  whatsappMessage:
    'Hi! I found your website and I am interested in a van conversion. Can you tell me more?',
  calendlyUrl:
    import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/vanconversion/consultation',
  tawkPropertyId: import.meta.env.VITE_TAWK_PROPERTY_ID || '',
  tawkWidgetId: import.meta.env.VITE_TAWK_WIDGET_ID || '',
  brochureUrl: '/brochure/van-conversion-brochure.pdf',
  panoramaUrl: import.meta.env.VITE_PANORAMA_URL || 'https://pannellum.org/images/alma.jpg',
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Process', path: '/process' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Blog', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Cost Estimator', path: '/estimator' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_LINKS = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Our Process', path: '/process' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Blog', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Cost Estimator', path: '/estimator' },
  { label: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: 'instagram',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: 'facebook',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: 'youtube',
  },
];
