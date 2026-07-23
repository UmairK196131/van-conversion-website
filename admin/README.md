# Admin Dashboard

React + Tailwind + React Router admin panel for managing website content.

## Development

```bash
# From repo root (starts client, server, and admin)
npm run dev

# Or admin only
npm run dev:admin
```

Admin runs at **http://localhost:5174** and proxies API requests to the server on port 3001.

**Client handoff guide:** [docs/admin-guide.md](../docs/admin-guide.md)

## Default credentials

- Email: `admin@vanconversion.local`
- Password: `admin123`

(Set via database seed — change in production.)

## Features

- JWT authentication with protected routes
- Dashboard with inquiry/service summaries and activity log
- CRUD managers for services, projects, blog, testimonials, and FAQ
- Inquiry viewer with status management (NEW → RESPONDED → ARCHIVED)
- Image upload (local storage in dev, Cloudinary when `CLOUDINARY_URL` is set)
- TipTap rich text editor for blog posts
