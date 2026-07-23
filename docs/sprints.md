# Van Conversion Website — Sprint Plan

**Reference:** [Van_Conversion_Website_SRS.md](./Van_Conversion_Website_SRS.md)  
**Tech Stack:** [techStack.md](./techStack.md)  
**Sprint Duration:** 2 weeks each  
**Total Timeline:** ~16 weeks (8 sprints)

---

## Sprint Overview

| Sprint | Name                     | Duration    | Focus                                               |
| ------ | ------------------------ | ----------- | --------------------------------------------------- |
| 0      | Foundation               | Weeks 1–2   | Repo, tooling, design system, DB schema             |
| 1      | Core Layout              | Weeks 3–4   | Global shell, navigation, responsive grid           |
| 2      | Homepage                 | Weeks 5–6   | All 9 homepage sections                             |
| 3      | Static Pages             | Weeks 7–8   | About, Services, Process, FAQ                       |
| 4      | Portfolio & Social Proof | Weeks 9–10  | Gallery, project detail, before/after, testimonials |
| 5      | Blog & Contact           | Weeks 11–12 | Blog, inquiry form, lead capture API                |
| 6      | Admin Dashboard          | Weeks 13–14 | CMS with full CRUD                                  |
| 7      | Premium & Polish         | Weeks 15–16 | Premium features, animations, widgets               |
| 8      | Launch                   | Weeks 17–18 | SEO, performance, security, deployment              |

---

## Sprint 0 — Foundation

**Goal:** Establish project infrastructure, design tokens, and database schema so all subsequent sprints can build on a stable base.

**Duration:** 2 weeks

### Tasks

- [x] Initialize monorepo (`client/`, `admin/`, `server/`, `docs/`)
- [x] Set up Git repository with `.gitignore` and branch strategy (`main`, `develop`)
- [x] Configure Vite for the public client with Tailwind CSS
- [x] Configure Express server with folder structure (routes, controllers, middleware)
- [x] Set up Prisma with MySQL — define initial schema (all core tables)
- [x] Run first migration and seed sample data
- [x] Configure ESLint + Prettier for consistent code style
- [x] Set up GitHub Actions CI skeleton (lint + type check on PR)
- [x] Define Tailwind design tokens (colors, fonts, spacing) from SRS palette
- [x] Create base HTML template with Poppins + Inter fonts loaded
- [x] Document local dev setup in `README.md`

### Acceptance Criteria

- `npm run dev` starts both client and server locally
- Database connects and migrations run without errors
- Tailwind tokens match SRS color palette and typography
- CI pipeline passes on a test commit

### Dependencies

None — this is the starting sprint.

---

## Sprint 1 — Core Layout

**Goal:** Build the global UI shell that every page will share.

**Duration:** 2 weeks

### User Stories

- As a visitor, I can navigate between all main pages from a persistent header.
- As a visitor, I can access the site comfortably on mobile, tablet, and desktop.
- As a visitor, I can toggle between light and dark mode.

### Tasks

- [x] Build responsive header with logo, navigation links, and mobile hamburger menu
- [x] Build footer with company info, quick links, social icons, and copyright
- [x] Create page layout wrapper (header + main content + footer)
- [x] Implement dark/light mode toggle with `localStorage` persistence
- [x] Set up client-side routing for all 9 pages (placeholder content)
- [x] Add scroll-to-top button
- [x] Implement sticky header with background transition on scroll
- [x] Ensure WCAG 2.1 AA contrast ratios for both themes

### Acceptance Criteria

- Navigation works across all 9 routes on mobile and desktop
- Dark/light mode persists across page reloads
- Layout is pixel-stable from 320px to 1920px viewport
- Lighthouse accessibility score ≥ 90

### Dependencies

Sprint 0

---

## Sprint 2 — Homepage

**Goal:** Deliver the full homepage with all 9 sections specified in SRS §6.

**Duration:** 2 weeks

### User Stories

- As a visitor, I can understand the company's value proposition immediately from the hero.
- As a visitor, I can browse featured services and see portfolio highlights without leaving the homepage.

### Tasks

- [x] **Hero Banner** — Full-width hero with headline, subtext, CTA buttons, background video/image support
- [x] **Featured Services** — Card grid pulling from `/api/services` (or static seed data)
- [x] **About Company** — Brief intro with image and "Learn More" link to `/about`
- [x] **Why Choose Us** — Icon/feature grid (4–6 differentiators)
- [x] **Portfolio Preview** — Featured project cards with hover effects, link to `/portfolio`
- [x] **Testimonials** — Carousel or card slider with client quotes and ratings
- [x] **CTA Banner** — Full-width call-to-action ("Start Your Build" → `/contact`)
- [x] **Contact Snippet** — Mini contact form or quick-contact info
- [x] **Footer** — Finalize with all links and social media
- [x] Add GSAP scroll-triggered entrance animations for each section

### Acceptance Criteria

- All 9 homepage sections render with real content structure
- GSAP animations fire on scroll without jank
- Hero supports video background (with image fallback)
- Homepage loads in < 3s on 4G connection

### Dependencies

Sprint 1

---

## Sprint 3 — Static Pages

**Goal:** Build the About, Services, Process, and FAQ pages with full content and animations.

**Duration:** 2 weeks

### User Stories

- As a visitor, I can learn about the company, its team, and its mission on the About page.
- As a visitor, I can browse all services with descriptions and pricing indicators.
- As a visitor, I can understand the conversion process step-by-step.
- As a visitor, I can find answers to common questions on the FAQ page.

### Tasks

- [ ] **About Page** — Company story, team section, values/mission, timeline or stats
- [ ] **Services Page** — Full service listing with detail cards, icons, and "Get a Quote" CTAs
- [ ] **Process Page** — Step-by-step visual timeline (Consultation → Design → Build → Delivery)
- [ ] **FAQ Page** — Accordion-style Q&A, categorized (General, Pricing, Timeline, Customization)
- [ ] Connect Services and FAQ pages to API endpoints (or static JSON during dev)
- [ ] Add per-page SEO meta tags (title, description, Open Graph)
- [ ] GSAP animations on scroll for each page section

### Acceptance Criteria

- All 4 pages are fully responsive and content-complete
- FAQ accordion expands/collapses smoothly
- Each page has unique, valid meta tags
- Process timeline is visually clear on mobile (vertical) and desktop (horizontal)

### Dependencies

Sprint 1, Sprint 2

---

## Sprint 4 — Portfolio & Social Proof

**Goal:** Showcase completed conversion projects and customer testimonials.

**Duration:** 2 weeks

### User Stories

- As a visitor, I can browse the portfolio filtered by vehicle type or service category.
- As a visitor, I can view project details including before/after comparisons.
- As a visitor, I can read customer testimonials to build trust.

### Tasks

- [x] **Portfolio Page** — Grid layout with filter tabs (All, Sprinter, Transit, ProMaster, etc.)
- [x] **Project Detail Page** — `/portfolio/:slug` with image gallery, description, specs, before/after
- [x] **Before/After Slider** — Interactive drag comparison component (SRS §13)
- [x] **Testimonials Page** — Full testimonial grid with star ratings, client photos, and quotes
- [x] Connect to `/api/projects` and `/api/testimonials`
- [x] Image lazy loading and WebP optimization for gallery images
- [x] Add structured data (JSON-LD) for projects

### Acceptance Criteria

- Portfolio filters work without page reload
- Before/after slider is touch-friendly on mobile
- Project detail pages have unique SEO meta and Open Graph images
- Testimonials display star ratings correctly

### Dependencies

Sprint 0 (API), Sprint 1

---

## Sprint 5 — Blog & Contact

**Goal:** Enable content marketing via blog and capture leads through the inquiry form.

**Duration:** 2 weeks

### User Stories

- As a visitor, I can read blog articles about van life, conversions, and travel tips.
- As a visitor, I can submit an inquiry with my vehicle details and budget.
- As an admin, I receive an email notification when a new inquiry is submitted.

### Tasks

- [x] **Blog List Page** — `/blog` with post cards (cover image, title, excerpt, date)
- [x] **Blog Detail Page** — `/blog/:slug` with full content, author, date, related posts
- [x] **Contact Page** — Contact form, company address/map embed, phone, email, hours
- [x] **Inquiry Form** — Fields per SRS §9: Name, Email, Phone, Vehicle Model, Required Service, Budget, Message
- [x] `POST /api/inquiries` — Server-side validation, reCAPTCHA v3 verification, DB storage
- [x] Email notification to admin on new inquiry (Nodemailer)
- [x] Form success/error states with user-friendly messages
- [x] Rate limiting on inquiry endpoint

### Acceptance Criteria

- Form rejects invalid email, empty required fields, and failed reCAPTCHA
- Successful submission stores record in `inquiries` table and sends admin email
- Blog posts render with proper heading hierarchy and meta tags
- Contact page map embed loads correctly on mobile

### Dependencies

Sprint 0 (API + DB), Sprint 1

---

## Sprint 6 — Admin Dashboard

**Goal:** Build a secure admin panel for managing all website content and viewing inquiries.

**Duration:** 2 weeks

### User Stories

- As an admin, I can log in securely to access the dashboard.
- As an admin, I can create, edit, and delete services, projects, blog posts, and testimonials.
- As an admin, I can view and manage customer inquiries.

### Tasks

- [x] Admin login page with JWT authentication
- [x] Protected route middleware (redirect to login if unauthenticated)
- [x] **Dashboard Home** — Summary cards (total inquiries, recent posts, active services)
- [x] **Services Manager** — CRUD with image upload
- [x] **Projects Manager** — CRUD with gallery upload and before/after images
- [x] **Blog Manager** — CRUD with rich text editor (TipTap or similar)
- [x] **Testimonials Manager** — CRUD with rating and image
- [x] **Inquiries Viewer** — Table with status filters (new, responded, archived), detail view
- [x] **FAQ Manager** — CRUD with category and sort order
- [x] Image upload integration (Cloudinary or S3)
- [x] Admin activity logging

### Acceptance Criteria

- Unauthenticated users cannot access any `/admin/*` route
- All CRUD operations persist to MySQL and reflect on the public site
- Image uploads return CDN URLs stored in the database
- Inquiry status can be updated (new → responded → archived)

### Dependencies

Sprint 0 (API + DB + Auth), Sprint 5 (inquiries table populated)

---

## Sprint 7 — Premium Features & Polish

**Goal:** Implement premium interactive features from SRS §13 and refine the overall user experience.

**Duration:** 2 weeks

### User Stories

- As a visitor, I can chat with the company via WhatsApp directly from the site.
- As a visitor, I can estimate conversion costs using an interactive tool.
- As a visitor, I can download a company brochure and subscribe to the newsletter.

### Tasks

- [ ] **WhatsApp Chat Widget** — Floating button with pre-filled message
- [ ] **Cost Estimator** — Multi-step form (vehicle type, features, finish level → estimated range)
- [ ] **Newsletter Signup** — Footer/modal form → `POST /api/newsletter` → Mailchimp/Buttondown
- [ ] **Brochure Download** — PDF download gated by email capture (optional)
- [ ] **Live Chat** — Tawk.to or Crisp widget integration
- [ ] **Appointment Booking** — Calendly embed on Contact page
- [ ] **360° Van Viewer** — If assets available, integrate panorama viewer (Pannellum or similar)
- [ ] **Interactive Hero Video** — Autoplay muted video with play/pause control
- [ ] Final GSAP animation pass across all pages
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility audit and fixes

### Acceptance Criteria

- WhatsApp widget opens correct chat with pre-filled context
- Cost estimator returns a plausible range based on selected options
- Newsletter signup confirms success without page reload
- All premium widgets work on mobile without layout breakage

### Dependencies

Sprint 2 (homepage), Sprint 5 (contact), Sprint 6 (admin for content)

---

## Sprint 8 — Launch

**Goal:** Optimize for SEO and performance, harden security, deploy to production, and deliver documentation.

**Duration:** 2 weeks

### User Stories

- As a visitor, I can find the site via search engines with proper indexing.
- As a visitor, the site loads fast (PageSpeed 90+) on all devices.
- As a developer, I have documentation to maintain and extend the project.

### Tasks

- [ ] Generate `sitemap.xml` for all public routes
- [ ] Create `robots.txt` with crawl directives
- [ ] Add JSON-LD structured data (Organization, LocalBusiness, BlogPosting)
- [ ] Optimize all images (WebP, compression, responsive `srcset`)
- [ ] Enable lazy loading for below-fold images and embeds
- [ ] Run Lighthouse audits — target 90+ on Performance, SEO, Accessibility, Best Practices
- [ ] Security audit: verify HTTPS, helmet headers, CSRF, rate limits, input sanitization
- [ ] Set up production environment (Vercel/Netlify + Hostinger/AWS)
- [ ] Configure environment variables for production
- [ ] Set up database backups
- [ ] Deploy frontend and backend to production
- [ ] Smoke test all pages, forms, and admin CRUD in production
- [ ] Write `README.md` with setup, deployment, and environment variable docs
- [ ] Handoff documentation for client/admin user guide

### Acceptance Criteria

- Lighthouse scores ≥ 90 across all four categories on homepage
- `sitemap.xml` validates and is submitted to Google Search Console
- All forms work in production with reCAPTCHA and email notifications
- HTTPS enforced with valid SSL certificate
- Admin dashboard accessible only to authenticated users in production
- README covers local setup, deployment, and env vars

### Dependencies

All prior sprints

---

## Phase 2 Backlog (Future — SRS §17)

These items are **out of scope** for the v1 sprint plan:

| Feature                | Notes                                         |
| ---------------------- | --------------------------------------------- |
| Online booking system  | Full calendar-based booking with availability |
| Customer portal        | Login for customers to track build progress   |
| Payment integration    | Stripe for deposits and invoicing             |
| AI chatbot             | LLM-powered support agent                     |
| Multi-language support | i18n with language switcher                   |
| CRM integration        | HubSpot or Salesforce sync for inquiries      |

---

## Risk Register

| Risk                                           | Impact                         | Mitigation                                               |
| ---------------------------------------------- | ------------------------------ | -------------------------------------------------------- |
| Client content (images, copy) not ready        | Delays Sprint 2–4              | Use placeholder content; swap in final assets later      |
| 360° viewer assets unavailable                 | Sprint 7 feature dropped       | Make optional; ship without if no panoramas              |
| Third-party API rate limits (reCAPTCHA, email) | Form submissions fail silently | Add retry logic and admin alert on email failure         |
| PageSpeed target missed due to heavy media     | SEO/performance score low      | Aggressive image compression, CDN, defer non-critical JS |

---

## Definition of Done (All Sprints)

- Code reviewed and merged to `develop`
- No console errors in browser
- Responsive on mobile, tablet, and desktop
- Passes ESLint with zero warnings
- Acceptance criteria met and demonstrated
