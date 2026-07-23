import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

const SITE_URL = (process.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/+$/, '');
const API_BASE = (process.env.SITEMAP_API_URL || 'http://localhost:3001/api').replace(/\/+$/, '');

const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: '/process', changefreq: 'monthly', priority: '0.7' },
  { path: '/testimonials', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.6' },
  { path: '/estimator', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toIsoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function buildUrlEntry({ path, lastmod, changefreq, priority }) {
  const lines = ['  <url>', `    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`];

  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) lines.push(`    <priority>${priority}</priority>`);

  lines.push('  </url>');
  return lines.join('\n');
}

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`GET ${path} failed with ${response.status}`);
  }
  return response.json();
}

async function fetchDynamicRoutes() {
  const routes = [];

  try {
    const [projects, posts] = await Promise.all([fetchJson('/projects'), fetchJson('/blog')]);

    for (const project of projects.data ?? []) {
      routes.push({
        path: `/portfolio/${project.slug}`,
        lastmod: toIsoDate(project.updatedAt ?? project.createdAt),
        changefreq: 'monthly',
        priority: '0.7',
      });
    }

    for (const post of posts.data ?? []) {
      routes.push({
        path: `/blog/${post.slug}`,
        lastmod: toIsoDate(post.updatedAt ?? post.publishedAt),
        changefreq: 'monthly',
        priority: '0.6',
      });
    }
  } catch (error) {
    console.warn(
      `[sitemap] Could not fetch dynamic routes from ${API_BASE}: ${error.message}. Static routes only.`
    );
  }

  return routes;
}

async function generateSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const staticEntries = STATIC_ROUTES.map((route) => buildUrlEntry({ ...route, lastmod: today }));
  const dynamicEntries = (await fetchDynamicRoutes()).map((route) => buildUrlEntry(route));
  const entries = [...staticEntries, ...dynamicEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  const outputPath = join(publicDir, 'sitemap.xml');
  writeFileSync(outputPath, xml, 'utf8');
  console.log(`[sitemap] Wrote ${entries.length} URLs to ${outputPath}`);
}

generateSitemap();
