# Van Conversion Website — Admin User Guide

Guide for site owners and content managers using the admin dashboard.

**Admin URL (production):** `https://admin.yourdomain.com`  
**Support:** Contact your developer for login issues or password resets.

---

## Logging In

1. Open the admin dashboard URL in your browser.
2. Enter your **email** and **password**.
3. Click **Sign In**.

If you see “Session expired”, sign in again. Sessions last 24 hours by default.

> **First login:** Your developer will provide credentials. **Change the default password before go-live** (ask your developer to update it in the database until a self-service password change is added).

---

## Dashboard

The home screen shows:

| Widget                         | What it means                            |
| ------------------------------ | ---------------------------------------- |
| **New inquiries**              | Contact form submissions awaiting review |
| **Services / Projects / Blog** | Count of published content               |
| **Recent activity**            | Who changed what and when                |

Use the sidebar to manage content.

---

## Inquiries (Contact Form)

**Path:** Inquiries

Visitors submit inquiries from the **Contact** page. Each inquiry includes name, email, phone, vehicle, service, budget, and message.

### Status workflow

| Status        | When to use                       |
| ------------- | --------------------------------- |
| **NEW**       | Just received — not yet replied   |
| **RESPONDED** | You have replied to the customer  |
| **ARCHIVED**  | Closed / no further action needed |

1. Click an inquiry to view full details.
2. Reply to the customer by email (outside the dashboard).
3. Update status to **RESPONDED**, then **ARCHIVED** when done.

Filter the list by status using the tabs at the top.

---

## Services

**Path:** Services

Manage the services shown on the **Services** page and homepage.

| Action     | Steps                                                                  |
| ---------- | ---------------------------------------------------------------------- |
| **Add**    | Click **Add Service** → fill title, description, optional image → Save |
| **Edit**   | Click a row → update fields → Save                                     |
| **Hide**   | Uncheck **Active** to hide from the public site without deleting       |
| **Delete** | Click **Delete** (permanent)                                           |

**Tips:**

- Use clear, customer-friendly titles (e.g. “Full Van Conversion”).
- Descriptions appear on the public site — avoid jargon where possible.
- **Sort order** controls display order (lower numbers appear first).

---

## Portfolio (Projects)

**Path:** Projects

Showcase completed builds on the **Portfolio** page.

| Field                     | Purpose                                            |
| ------------------------- | -------------------------------------------------- |
| **Title**                 | Project name (e.g. “Sprinter Off-Grid Weekender”)  |
| **Description**           | Short summary for cards and SEO                    |
| **Vehicle model**         | e.g. “Mercedes Sprinter 170” — used for filters    |
| **Before / After images** | Powers the before/after slider on the project page |
| **Gallery**               | Additional photos (upload multiple)                |
| **Featured**              | Show on the homepage portfolio section             |

**Slug** is generated from the title and becomes the URL: `/portfolio/your-project-slug`.

---

## Blog

**Path:** Blog

Publish articles, guides, and build updates.

1. Click **Add Post**.
2. Enter **title**, **excerpt** (short summary), and **content** (rich text editor).
3. Upload a **cover image** (recommended — used in listings and social sharing).
4. Check **Published** to make it live, or leave unchecked for a draft.
5. Save.

**Editor tips:**

- Use headings to structure long posts.
- Add images via the toolbar or image upload field.
- Preview on the public site at `/blog/your-post-slug` after publishing.

---

## Testimonials

**Path:** Testimonials

Manage customer reviews on the **Testimonials** page and homepage.

| Field           | Notes                            |
| --------------- | -------------------------------- |
| **Client name** | Display name                     |
| **Quote**       | The testimonial text             |
| **Rating**      | 1–5 stars                        |
| **Image**       | Optional client photo            |
| **Active**      | Uncheck to hide without deleting |

---

## FAQ

**Path:** FAQ

Manage questions on the **FAQ** page.

1. Add a **question** and **answer**.
2. Set **sort order** (lower = higher on page).
3. Toggle **Active** to show or hide.

---

## Image Uploads

When adding images (services, projects, blog, testimonials):

1. Click **Upload** or drag an image into the upload area.
2. Wait for the preview — the image URL is saved automatically.
3. Supported formats: JPG, PNG, WebP, GIF. Max size: **10 MB**.

In production, images are stored on **Cloudinary** (CDN) when configured by your developer.

---

## What You Cannot Do in Admin (v1)

These require your developer:

- Change your login password (contact developer)
- Edit site-wide settings (phone, address, social links) — in code/config
- View newsletter subscriber list (stored in database; export via developer)
- Manage users / add new admin accounts

---

## Quick Reference

| Task                       | Where                         |
| -------------------------- | ----------------------------- |
| Review contact form leads  | Inquiries                     |
| Add a portfolio project    | Projects → Add                |
| Publish a blog post        | Blog → Add Post → Published ✓ |
| Hide a service temporarily | Services → Edit → Active ✗    |
| Update FAQ                 | FAQ → Edit                    |

---

## Troubleshooting

| Problem                       | Try this                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| Cannot log in                 | Check email/password; contact developer to reset                                   |
| “Session expired”             | Log in again                                                                       |
| Image upload fails            | Use JPG/PNG under 10 MB; check internet connection                                 |
| Changes not on public site    | Hard-refresh the public site (Ctrl+F5); confirm item is **Active** / **Published** |
| Inquiry form not emailing you | Contact developer — SMTP must be configured on the server                          |

---

_Last updated: Sprint 8 — Launch_
