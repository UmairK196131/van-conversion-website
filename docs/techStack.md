# Van Conversion Website — Technology Stack

**Reference:** [Van_Conversion_Website_SRS.md](./Van_Conversion_Website_SRS.md)  
**Reference Site:** https://multicoolvan.com/home  
**Version:** 1.0

---

## Overview

This document defines the technology stack for the Van Conversion & Camper Website. The SRS listed multiple options for several layers; this document resolves those choices into a single, cohesive stack centered on **Node.js + Express** with a JavaScript full-stack approach.

### Architecture

```mermaid
flowchart TB
    subgraph client [Client]
        PublicSite[Public Website]
        AdminPanel[Admin Dashboard]
    end
    subgraph server [Server]
        API[Express REST API]
        Auth[JWT Auth]
    end
    subgraph data [Data]
        MySQL[(MySQL)]
        CDN[Cloudinary / S3 CDN]
    end
    PublicSite --> API
    AdminPanel --> API
    API --> Auth
    API --> MySQL
    API --> CDN
```

### Repository Structure

```
van-conversion-website/
├── client/          # Public website (Vite + HTML/CSS/JS + Tailwind)
├── admin/           # Admin dashboard (React + Tailwind)
├── server/          # Express API + Prisma
├── docs/            # Project documentation
└── .github/         # CI/CD workflows
```

---

## Frontend (Public Website)

| Technology        | Purpose                                                                       |
| ----------------- | ----------------------------------------------------------------------------- |
| HTML5             | Semantic markup, accessibility                                                |
| CSS3              | Custom styles, animations                                                     |
| JavaScript (ES6+) | Interactivity, API calls                                                      |
| **Tailwind CSS**  | Utility-first styling (chosen over Bootstrap for premium/minimal UI)          |
| **GSAP**          | Scroll animations, hero transitions (chosen over AOS for richer interactions) |
| **Vite**          | Build tool — fast HMR, code splitting, asset optimization                     |
| **Poppins**       | Heading font (Google Fonts)                                                   |
| **Inter**         | Body font (Google Fonts)                                                      |

### Design Tokens (from SRS)

| Token      | Value     |
| ---------- | --------- |
| Primary    | `#0B132B` |
| Secondary  | `#1C2541` |
| Accent     | `#3A86FF` |
| Background | `#F8F9FA` |
| Text       | `#222222` |

### UI/UX Requirements

- Modern minimalist interface with premium typography
- Fully responsive (mobile-first)
- Large imagery with lazy loading
- Smooth GSAP scroll/entrance animations
- Optional dark/light mode toggle

---

## Backend

| Technology              | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| **Node.js 20 LTS**      | Runtime                                  |
| **Express 4**           | REST API framework                       |
| **Prisma ORM**          | Database access, migrations, type safety |
| **JWT + bcrypt**        | Admin authentication                     |
| **express-validator**   | Request/form validation                  |
| **helmet**              | HTTP security headers                    |
| **cors**                | Cross-origin policy                      |
| **express-rate-limit**  | Brute-force protection                   |
| **Nodemailer**          | Inquiry notification emails              |
| **Google reCAPTCHA v3** | Spam protection on forms                 |

### API Endpoints (v1)

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | `/api/services`       | List all services           |
| GET    | `/api/projects`       | List portfolio projects     |
| GET    | `/api/projects/:slug` | Project detail              |
| GET    | `/api/testimonials`   | List testimonials           |
| GET    | `/api/blog`           | List blog posts             |
| GET    | `/api/blog/:slug`     | Blog post detail            |
| GET    | `/api/faq`            | FAQ items                   |
| POST   | `/api/inquiries`      | Submit contact/inquiry form |
| POST   | `/api/newsletter`     | Newsletter signup           |
| POST   | `/api/auth/login`     | Admin login                 |
| CRUD   | `/api/admin/*`        | Protected admin endpoints   |

---

## Database

**Engine:** MySQL 8.x

### Core Tables

| Table          | Key Fields                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `users`        | id, email, password_hash, role, created_at                                                          |
| `services`     | id, title, slug, description, image_url, sort_order, is_active                                      |
| `projects`     | id, title, slug, description, vehicle_model, before_image, after_image, gallery (JSON), is_featured |
| `testimonials` | id, client_name, quote, rating, image_url, is_active                                                |
| `blog_posts`   | id, title, slug, content, excerpt, cover_image, author_id, published_at, is_published               |
| `inquiries`    | id, name, email, phone, vehicle_model, service, budget, message, status, created_at                 |
| `faq_items`    | id, question, answer, category, sort_order                                                          |
| `media`        | id, filename, url, mime_type, size, uploaded_at                                                     |

Prisma manages migrations and provides compile-time type safety for all queries.

---

## Admin Dashboard

| Technology        | Purpose                             |
| ----------------- | ----------------------------------- |
| **React 18**      | Component-based admin UI            |
| **Tailwind CSS**  | Consistent styling with public site |
| **React Router**  | Client-side routing                 |
| **Axios / fetch** | API communication                   |

### Admin Features (SRS §8)

- Dashboard overview (inquiry count, recent activity)
- Manage services (CRUD)
- Manage projects / portfolio (CRUD)
- Manage blog posts (CRUD with rich text editor)
- Manage testimonials (CRUD)
- View and manage inquiries (read, mark responded/archived)

---

## Third-Party Integrations

| Service                        | Feature                   | SRS Reference |
| ------------------------------ | ------------------------- | ------------- |
| WhatsApp Business API / widget | Floating chat button      | §13           |
| Cloudinary or AWS S3           | Image/video hosting + CDN | §11           |
| Calendly (embed)               | Appointment booking       | §13           |
| Tawk.to or Crisp               | Live chat widget          | §13           |
| Mailchimp or Buttondown        | Newsletter subscriptions  | §13           |
| Google reCAPTCHA v3            | Form spam protection      | §12           |

---

## SEO & Performance

| Requirement        | Implementation                                       |
| ------------------ | ---------------------------------------------------- |
| SEO-friendly URLs  | Slug-based routing (`/services/van-conversion`)      |
| Meta tags          | Per-page `<title>`, `<meta description>`, Open Graph |
| Sitemap            | Auto-generated `sitemap.xml`                         |
| Robots.txt         | Standard crawl directives                            |
| Image optimization | WebP format, lazy loading, responsive `srcset`       |
| PageSpeed target   | 90+ (Lighthouse)                                     |
| CDN                | Cloudinary or CloudFront for static assets           |

---

## Security (SRS §12)

| Threat        | Mitigation                                       |
| ------------- | ------------------------------------------------ |
| Transport     | HTTPS everywhere (Let's Encrypt / platform SSL)  |
| Form abuse    | reCAPTCHA v3 + server-side validation            |
| SQL Injection | Prisma parameterized queries                     |
| XSS           | Output encoding, Content-Security-Policy headers |
| CSRF          | SameSite cookies, CSRF tokens on admin forms     |
| Brute force   | Rate limiting on auth endpoints                  |
| Headers       | helmet middleware (HSTS, X-Frame-Options, etc.)  |

---

## Hosting & DevOps

### Recommended Setup

| Layer          | Platform                                               |
| -------------- | ------------------------------------------------------ |
| Public website | **Vercel** or **Netlify** (static/SSR deploy from Git) |
| API server     | **Hostinger VPS** or **AWS EC2**                       |
| Database       | **Hostinger MySQL** or **AWS RDS**                     |
| Media/CDN      | **Cloudinary** (free tier) or **AWS S3 + CloudFront**  |
| CI/CD          | **GitHub Actions** (lint, test, deploy on push)        |
| Domain/SSL     | Platform-managed or Let's Encrypt                      |

### Environment Variables

```
DATABASE_URL=mysql://user:pass@host:3306/van_conversion
JWT_SECRET=<random-secret>
RECAPTCHA_SECRET_KEY=<google-key>
SMTP_HOST / SMTP_USER / SMTP_PASS
CLOUDINARY_URL=<cloudinary-dsn>
```

---

## Pages (SRS §5)

| Page         | Route           |
| ------------ | --------------- |
| Home         | `/`             |
| About        | `/about`        |
| Services     | `/services`     |
| Portfolio    | `/portfolio`    |
| Process      | `/process`      |
| Testimonials | `/testimonials` |
| Blog         | `/blog`         |
| FAQ          | `/faq`          |
| Contact      | `/contact`      |

---

## Future Enhancements (Out of Scope — SRS §17)

The following are planned for Phase 2 and are **not** part of the v1 stack:

- Online booking system
- Customer portal
- Payment integration (Stripe)
- AI chatbot
- Multi-language support (i18n)
- CRM integration (HubSpot, Salesforce)

---

## Version Pinning (Recommended)

```json
{
  "node": ">=20.0.0",
  "express": "^4.21.0",
  "prisma": "^6.0.0",
  "vite": "^6.0.0",
  "tailwindcss": "^4.0.0",
  "gsap": "^3.12.0"
}
```
