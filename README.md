# Van Conversion & Camper Website

Modern, responsive website for a van conversion and camper customization company. Built as a monorepo with a public Vite client, Express API, and admin dashboard (Sprint 6+).

**Docs:** [SRS](./docs/Van_Conversion_Website_SRS.md) · [Tech Stack](./docs/techStack.md) · [Sprint Plan](./docs/sprints.md) · [Security](./docs/security.md) · [Deployment](./docs/deployment.md) · [Admin Guide](./docs/admin-guide.md)

## Repository Structure

```
van-conversion-website/
├── client/          # Public website (Vite + HTML/CSS/JS + Tailwind)
├── admin/           # Admin dashboard (React — Sprint 6)
├── server/          # Express API + Prisma
├── docs/            # Project documentation
└── .github/         # CI/CD workflows
```

## Prerequisites

- **Node.js** 20+ ([`.nvmrc`](./.nvmrc) pins v20)
- **npm** 10+
- **MySQL** 8.x (local install or Docker)

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url> van-conversion-website
cd van-conversion-website
npm install
```

### 2. Start MySQL

**Option A — Docker (recommended):**

```bash
docker compose up -d
```

**Option B — Local MySQL:** Create a database named `van_conversion`.

### 3. Configure environment

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Default `DATABASE_URL` matches the Docker Compose setup:

```
mysql://root:password@localhost:3306/van_conversion
```

See [Environment variables](#environment-variables) for all options.

### 4. Run migrations and seed

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 5. Start development servers

```bash
npm run dev
```

| Service         | URL                              |
| --------------- | -------------------------------- |
| Public client   | http://localhost:5173            |
| Admin dashboard | http://localhost:5174            |
| API server      | http://localhost:3001            |
| Health check    | http://localhost:3001/api/health |

The Vite dev servers proxy `/api` requests to the Express server.

## Environment Variables

Copy `.env.example` files for local development. Use `.env.production.example` as templates for production.

### Server (`server/.env`)

| Variable                                | Required    | Description                       |
| --------------------------------------- | ----------- | --------------------------------- |
| `DATABASE_URL`                          | Yes         | MySQL connection string           |
| `PORT`                                  | No          | API port (default `3001`)         |
| `NODE_ENV`                              | No          | `development` or `production`     |
| `JWT_SECRET`                            | Yes (prod)  | Secret for admin JWT tokens       |
| `JWT_EXPIRES_IN`                        | No          | Token lifetime (default `24h`)    |
| `API_BASE_URL`                          | Prod        | Public API URL for upload links   |
| `CORS_ORIGIN`                           | Yes         | Comma-separated allowed origins   |
| `RECAPTCHA_SECRET_KEY`                  | Yes (prod)  | Google reCAPTCHA v3 secret        |
| `ADMIN_EMAIL`                           | No          | Receives inquiry notifications    |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` | Recommended | Outbound email                    |
| `SMTP_FROM`                             | No          | From address for emails           |
| `CLOUDINARY_URL`                        | Recommended | Image CDN for production uploads  |
| `MAILCHIMP_*` / `BUTTONDOWN_API_KEY`    | Optional    | Newsletter provider sync          |
| `BROCHURE_URL`                          | No          | Path to downloadable brochure PDF |

Template: [`server/.env.example`](./server/.env.example) · Production: [`server/.env.production.example`](./server/.env.production.example)

### Client (`client/.env`)

| Variable                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- |
| `VITE_SITE_URL`                                 | Public site URL (SEO, sitemap, canonical links) |
| `VITE_RECAPTCHA_SITE_KEY`                       | reCAPTCHA v3 site key                           |
| `VITE_WHATSAPP_NUMBER`                          | WhatsApp widget number                          |
| `VITE_CALENDLY_URL`                             | Calendly embed URL                              |
| `VITE_TAWK_PROPERTY_ID` / `VITE_TAWK_WIDGET_ID` | Live chat widget                                |
| `VITE_PANORAMA_URL`                             | 360° viewer image URL                           |
| `SITEMAP_API_URL`                               | API base for build-time sitemap (production CI) |

Template: [`client/.env.example`](./client/.env.example) · Production: [`client/.env.production.example`](./client/.env.production.example)

> Vite exposes only variables prefixed with `VITE_` to the browser.

## Production Deployment

Full guide: **[docs/deployment.md](./docs/deployment.md)**

### Quick overview

1. **Database** — Create MySQL 8, run `npm run db:migrate:deploy -w server`.
2. **API** — Deploy `server/` with production `.env`; expose at `https://api.yourdomain.com`.
3. **Client** — Build with `npm run build -w client`; deploy `client/dist` to Vercel/Netlify.
4. **Admin** — Build with `npm run build -w admin`; deploy `admin/dist` to a separate subdomain.
5. **Proxy** — Configure `/api` and `/uploads` rewrites on static hosts to the API.
6. **DNS & SSL** — Point domains; enable HTTPS everywhere.
7. **Verify** — Run the [smoke test checklist](./docs/deployment.md#7-post-deploy-smoke-test).
8. **Handoff** — Share [docs/admin-guide.md](./docs/admin-guide.md) with the client.

### Production build

```bash
# Set env vars in host dashboard or .env files first
npm run build                    # client + admin
npm run db:migrate:deploy -w server
npm run start -w server          # on API host
```

### Database backups

Schedule regular MySQL dumps or use your host's automated backup feature. See [deployment guide — backups](./docs/deployment.md#6-database-backups).

## Scripts

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Start client + server concurrently          |
| `npm run dev:client` | Vite dev server only                        |
| `npm run dev:server` | Express API only                            |
| `npm run build`      | Production build (client + admin)           |
| `npm run lint`       | ESLint across the monorepo                  |
| `npm run format`     | Prettier write                              |
| `npm run ci`         | Run all CI checks locally (run before push) |
| `npm run typecheck`  | TypeScript check (server)                   |
| `npm run db:migrate` | Run Prisma migrations                       |
| `npm run db:seed`    | Seed sample data                            |
| `npm run db:studio`  | Open Prisma Studio                          |

## Design Tokens

From the SRS color palette and typography:

| Token      | Value     |
| ---------- | --------- |
| Primary    | `#0B132B` |
| Secondary  | `#1C2541` |
| Accent     | `#3A86FF` |
| Background | `#F8F9FA` |
| Text       | `#222222` |
| Headings   | Poppins   |
| Body       | Inter     |

Tokens are defined in [`client/src/styles/main.css`](./client/src/styles/main.css) as Tailwind `@theme` variables.

## Branch Strategy

| Branch    | Purpose                                   |
| --------- | ----------------------------------------- |
| `main`    | Production-ready releases                 |
| `develop` | Integration branch for active development |

Feature branches merge into `develop` via pull request. CI runs lint, format check, type check, and client build on every PR.

Before pushing, run `npm run ci` locally (or rely on the pre-push hook) to avoid failed checks on GitHub.

## Database Schema

Core tables (managed by Prisma):

- `users` — admin accounts
- `services` — service offerings
- `projects` — portfolio items
- `testimonials` — client reviews
- `blog_posts` — blog content
- `inquiries` — contact form submissions
- `faq_items` — FAQ entries
- `media` — uploaded file metadata

See [`server/prisma/schema.prisma`](./server/prisma/schema.prisma) for the full schema.

## Seed Credentials

After running `npm run db:seed`:

- **Email:** `admin@vanconversion.local`
- **Password:** `admin123`

Change these before any production deployment.

## Admin Dashboard

Local URL: **http://localhost:5174**

User guide for content managers: **[docs/admin-guide.md](./docs/admin-guide.md)**

## License

Private — all rights reserved.
