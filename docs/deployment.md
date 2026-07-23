# Production Deployment Guide

Step-by-step guide for deploying the Van Conversion website to production.

**Architecture:**

| Component       | Suggested host                             | Output                     |
| --------------- | ------------------------------------------ | -------------------------- |
| Public client   | Vercel or Netlify                          | Static SPA (`client/dist`) |
| Admin dashboard | Vercel or Netlify                          | Static SPA (`admin/dist`)  |
| API server      | Hostinger VPS, Railway, Render, or AWS EC2 | Node.js (`server/`)        |
| Database        | Hostinger MySQL, PlanetScale, or AWS RDS   | MySQL 8.x                  |
| Media           | Cloudinary (recommended)                   | CDN image URLs             |

---

## 1. Prepare the database

1. Create a MySQL 8 database named `van_conversion`.
2. Note the connection string for `DATABASE_URL`.

**Run migrations** (from your machine or CI, with production `DATABASE_URL`):

```bash
cd server
cp .env.production.example .env
# Edit .env with real DATABASE_URL

npm run db:migrate:deploy
npm run db:seed   # optional — only for initial demo data; change admin password after
```

---

## 2. Deploy the API server

1. Copy [`server/.env.production.example`](../server/.env.production.example) to `server/.env` on the host.
2. Fill in all required values (see [Environment variables](#environment-variables)).
3. Install and start:

```bash
npm install
npm run db:generate -w server
npm run start -w server
```

Use a process manager (PM2, systemd) or platform start command:

```bash
pm2 start server/src/index.js --name van-api
```

4. Verify: `https://api.yourdomain.com/api/health` returns `{ "status": "ok" }`.

### API reverse proxy (nginx example)

```nginx
server {
  listen 443 ssl;
  server_name api.yourdomain.com;

  location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

---

## 3. Deploy the public client

### Build

Set environment variables from [`client/.env.production.example`](../client/.env.production.example), then:

```bash
npm run build -w client
```

Upload `client/dist/` to your static host, or connect the repo to Vercel/Netlify with:

- **Root directory:** `client`
- **Build command:** `npm run build`
- **Output directory:** `dist`

### API proxy (required)

The client calls relative `/api/*` paths. Your static host must proxy those to the API:

**Vercel** (`client/vercel.json`):

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://api.yourdomain.com/api/$1" },
    { "source": "/uploads/(.*)", "destination": "https://api.yourdomain.com/uploads/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify** (`client/public/_redirects`):

```
/api/*    https://api.yourdomain.com/api/:splat    200
/uploads/* https://api.yourdomain.com/uploads/:splat 200
/*        /index.html    200
```

Replace `api.yourdomain.com` with your real API domain.

---

## 4. Deploy the admin dashboard

Same process as the client:

- **Root directory:** `admin`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **URL:** `https://admin.yourdomain.com`

Add the same `/api` and `/uploads` proxy rules as the public client.

Ensure `CORS_ORIGIN` on the server includes the admin URL.

---

## 5. DNS & SSL

| Record                 | Points to                  |
| ---------------------- | -------------------------- |
| `yourdomain.com`       | Vercel / Netlify (client)  |
| `www.yourdomain.com`   | Redirect to apex or client |
| `admin.yourdomain.com` | Admin static host          |
| `api.yourdomain.com`   | API server / VPS           |

Enable HTTPS on all hosts (automatic on Vercel/Netlify; Let's Encrypt on VPS).

---

## 6. Database backups

### Hostinger / cPanel

- Enable automatic backups in the hosting panel, or
- Schedule `mysqldump` via cron:

```bash
mysqldump -h HOST -u USER -p van_conversion > backup-$(date +%F).sql
```

### AWS RDS

- Enable automated backups (retention 7–35 days).
- Consider manual snapshots before major releases.

### Restore test

Periodically verify backups by restoring to a staging database.

---

## 7. Post-deploy smoke test

| Check            | How                                            |
| ---------------- | ---------------------------------------------- |
| Homepage loads   | Visit `https://yourdomain.com`                 |
| API health       | `GET /api/health`                              |
| Contact form     | Submit test inquiry; check admin + email       |
| reCAPTCHA        | Form works without errors                      |
| Admin login      | Sign in at admin URL                           |
| Admin CRUD       | Create/edit a FAQ item; confirm on public site |
| Portfolio / blog | Open a detail page                             |
| Sitemap          | `https://yourdomain.com/sitemap.xml`           |
| robots.txt       | `https://yourdomain.com/robots.txt`            |
| HTTPS            | No mixed-content warnings in browser console   |
| Admin protected  | `GET /api/admin/dashboard` without token → 401 |

---

## 8. Google Search Console

1. Add property for `https://yourdomain.com`.
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`.
3. Request indexing for the homepage.

---

## Environment variables

See templates:

- [`server/.env.production.example`](../server/.env.production.example)
- [`client/.env.production.example`](../client/.env.production.example)

Full security notes: [security.md](./security.md)

---

## Client handoff

Give site owners: [admin-guide.md](./admin-guide.md)
