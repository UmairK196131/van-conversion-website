# Van Conversion & Camper Website

Modern, responsive website for a van conversion and camper customization company. Built as a monorepo with a public Vite client, Express API, and admin dashboard (Sprint 6+).

**Docs:** [SRS](./docs/Van_Conversion_Website_SRS.md) · [Tech Stack](./docs/techStack.md) · [Sprint Plan](./docs/sprints.md)

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
```

Default `DATABASE_URL` matches the Docker Compose setup:

```
mysql://root:password@localhost:3306/van_conversion
```

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

| Service       | URL                              |
| ------------- | -------------------------------- |
| Public client | http://localhost:5173            |
| API server    | http://localhost:3001            |
| Health check  | http://localhost:3001/api/health |

The Vite dev server proxies `/api` requests to the Express server.

## Scripts

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Start client + server concurrently          |
| `npm run dev:client` | Vite dev server only                        |
| `npm run dev:server` | Express API only                            |
| `npm run build`      | Production build (client)                   |
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

## License

Private — all rights reserved.
