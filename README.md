# Triangle Civil Services — Website

Rebuild of [tcsinc.build](https://tcsinc.build/) for **Triangle Concrete Services, Inc.** (d.b.a. **Triangle Civil Services**) — a self-performing concrete and heavy-civil contractor in Beaumont, TX.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **react-hook-form + zod** for form validation
- **lucide-react** icons
- Deployed to **Vercel**

## Local development

```bash
npm install
npm run dev
```

Dev server runs at http://localhost:3000.

## Useful scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # run production build locally
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project layout

```
src/
  app/                     # routes (App Router)
    api/contact            # contact form handler (stub)
    api/quote              # RFP intake handler (stub)
    services/[slug]        # per-service pages
    projects/[slug]        # per-project pages
    layout.tsx             # root layout + fonts
    page.tsx               # home
    sitemap.ts / robots.ts # crawler metadata
  components/
    site/                  # header, footer, hero, cta, sections
    ui/                    # primitives: button, input, etc.
  content/
    services.ts            # service data
    projects.ts            # project data
  lib/
    site.ts                # site-wide config (nav, contact, company)
    cn.ts                  # tailwind className helper
```

Content lives as typed TypeScript modules for now. MDX/CMS migration is planned once the content surface stabilizes.

## What's next

Upcoming phases:

1. Real brand assets (logo, palette, type) and project photography
2. Resend wiring for contact/quote forms + file upload handling
3. Google Maps embed on contact page
4. JSON-LD schema (Organization, LocalBusiness, Service)
5. Analytics + Lighthouse pass
6. DNS cutover and 301s from the legacy WordPress URLs
