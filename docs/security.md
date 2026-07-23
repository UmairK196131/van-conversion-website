# Security Overview

Security controls for the Van Conversion website API, public forms, and admin dashboard. Use this document during deployment checklists and handoff.

**Related:** [Tech Stack — Security](./techStack.md#security-srs-12) · [SRS §12](./Van_Conversion_Website_SRS.md)

---

## Summary

| Area               | Status    | Implementation                                                                   |
| ------------------ | --------- | -------------------------------------------------------------------------------- |
| HTTPS              | Hosting   | Enforced by platform SSL (Vercel/Netlify/Hostinger); API sets HSTS in production |
| Security headers   | Covered   | `helmet` via `server/src/middleware/security.js`                                 |
| SQL injection      | Covered   | Prisma parameterized queries                                                     |
| XSS (public forms) | Covered   | Server-side sanitization in `server/src/lib/sanitize.js`                         |
| XSS (blog HTML)    | Covered   | `sanitize-html` allowlist on admin blog save                                     |
| Form spam          | Covered   | reCAPTCHA v3 + rate limits                                                       |
| Brute force (auth) | Covered   | Rate limit on `/api/auth/login`                                                  |
| Admin access       | Covered   | JWT Bearer auth on all `/api/admin/*` routes                                     |
| CSRF (public API)  | N/A       | Stateless JSON API; no session cookies on public forms                           |
| CSRF (admin)       | Mitigated | JWT in `Authorization` header (not cookie-based)                                 |
| File uploads       | Covered   | Image MIME filter, 10 MB limit, auth required                                    |
| Production secrets | Covered   | Startup validation in `server/src/config/validateEnv.js`                         |

---

## HTTP Security Headers (Helmet)

Configured in `server/src/middleware/security.js`:

| Header                            | Purpose                                                       |
| --------------------------------- | ------------------------------------------------------------- |
| `Strict-Transport-Security`       | Forces HTTPS in production (1 year)                           |
| `X-Content-Type-Options: nosniff` | Prevents MIME sniffing                                        |
| `X-Frame-Options: DENY`           | API responses cannot be embedded in iframes                   |
| `Referrer-Policy`                 | `strict-origin-when-cross-origin`                             |
| `Cross-Origin-Resource-Policy`    | `cross-origin` so uploaded images work from the client domain |

**Note:** Content-Security-Policy (CSP) is **not** set on the API. Configure CSP on the static site host (Vite client) where HTML, scripts, and third-party embeds are served.

---

## Input Validation & Sanitization

All sanitization lives in `server/src/lib/sanitize.js`.

### Public forms

| Endpoint                        | Fields                                                | Controls                                                             |
| ------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
| `POST /api/inquiries`           | name, email, phone, vehicle, service, budget, message | Trim, strip HTML/control chars, max lengths, email format, reCAPTCHA |
| `POST /api/newsletter`          | email, source                                         | Email validation, length limits                                      |
| `POST /api/newsletter/brochure` | email                                                 | Email validation                                                     |

**Field length limits:**

| Field         | Max length |
| ------------- | ---------- |
| Name          | 100        |
| Email         | 254        |
| Phone         | 30         |
| Vehicle model | 100        |
| Service       | 200        |
| Budget        | 50         |
| Message       | 5,000      |

### Admin content

| Endpoint   | Sanitization                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Blog posts | Title/excerpt: plain text; content: HTML allowlist (`sanitize-html`); cover image: HTTPS URL only |
| Other CRUD | Trim on save; Prisma stores parameterized values                                                  |

Blog HTML allows safe tags only (headings, lists, links, images). Scripts, `on*` handlers, and `javascript:` URLs are stripped. Links get `rel="noopener noreferrer"`.

### Request body size

JSON and URL-encoded bodies are limited to **100 KB** to reduce abuse.

---

## Rate Limiting

| Route                           | Limit       | Window      |
| ------------------------------- | ----------- | ----------- |
| `POST /api/inquiries`           | 5 requests  | 15 min / IP |
| `POST /api/newsletter`          | 10 requests | 15 min / IP |
| `POST /api/newsletter/brochure` | 10 requests | 15 min / IP |
| `POST /api/auth/login`          | 10 requests | 15 min / IP |

In production, `trust proxy` is enabled so limits work behind reverse proxies.

---

## Authentication & Authorization

- **Admin routes** (`/api/admin/*`) require `Authorization: Bearer <JWT>`.
- Passwords hashed with **bcrypt** before storage.
- JWT signed with `JWT_SECRET`; default expiry 24h (`JWT_EXPIRES_IN`).
- Login attempts are rate-limited.
- Admin activity logged via `activityLog`.

---

## reCAPTCHA

- Public inquiry form uses **reCAPTCHA v3** (client token + server verification).
- Minimum score threshold: **0.5** (`server/src/lib/recaptcha.js`).
- In production, `RECAPTCHA_SECRET_KEY` is **required** (server refuses to start without it).

---

## CORS

- Allowed origins from `CORS_ORIGIN` env var (comma-separated).
- Defaults to `http://localhost:5173` and `http://localhost:5174` in development.
- In production, set to your real client and admin URLs only.

---

## File Uploads

`POST /api/admin/upload` (auth required):

- **Images only** (`image/*` MIME)
- **Max size:** 10 MB
- Filenames sanitized on disk
- Optional Cloudinary upload when `CLOUDINARY_URL` is set

---

## Production Checklist

Before deploying with `NODE_ENV=production`, ensure:

| Variable               | Required    | Notes                                     |
| ---------------------- | ----------- | ----------------------------------------- |
| `DATABASE_URL`         | Yes         | MySQL connection string                   |
| `JWT_SECRET`           | Yes         | Strong random value — not the dev default |
| `RECAPTCHA_SECRET_KEY` | Yes         | From Google reCAPTCHA admin               |
| `CORS_ORIGIN`          | Yes         | Production client + admin origins         |
| `API_BASE_URL`         | Recommended | Public API URL for upload links           |
| `SMTP_*`               | Recommended | Inquiry email notifications               |

The server **exits on startup** if production env validation fails (`validateProductionEnv`).

### HTTPS

- Terminate SSL at your host (Vercel, Netlify, load balancer).
- API sends HSTS headers when `NODE_ENV=production`.
- Redirect HTTP → HTTPS at the hosting layer.

### Post-deploy verification

1. Confirm `https://your-api.com/api/health` responds over HTTPS.
2. Submit a test inquiry — verify reCAPTCHA and email delivery.
3. Confirm `/api/admin/*` returns `401` without a token.
4. Check response headers include `strict-transport-security` (production).
5. Change default seed admin password.

---

## Out of Scope (v1)

| Item                  | Notes                                      |
| --------------------- | ------------------------------------------ |
| CSP on static client  | Configure at CDN/host when domain is known |
| WAF / DDoS            | Use platform or Cloudflare if needed       |
| 2FA for admin         | Future enhancement                         |
| Cookie-based sessions | JWT Bearer used instead                    |

---

## Key Files

```
server/src/middleware/security.js    # Helmet configuration
server/src/lib/sanitize.js           # Input sanitization helpers
server/src/config/validateEnv.js     # Production env checks
server/src/middleware/rateLimiter.js   # Public form rate limits
server/src/middleware/authRateLimiter.js
server/src/middleware/auth.js        # JWT guard
server/src/lib/recaptcha.js
server/src/lib/upload.js
```
