# Triangle Civil Services — Website

Rebuild of [tcsinc.build](https://tcsinc.build/) for **Triangle Concrete Services, Inc.** (d.b.a. **Triangle Civil Services**) — a self-performing concrete and heavy-civil contractor in Beaumont, TX.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme via `@theme`)
- **react-hook-form + zod** for form validation
- **lucide-react** icons
- **Playwright** for smoke + accessibility tests
- Deployed to **Vercel**

## Local development

```bash
npm install
npm run dev
```

Dev server runs at http://localhost:3000.

## Scripts

```bash
npm run dev         # start dev server
npm run build       # production build
npm run start       # run production build locally
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run test        # Playwright smoke + a11y tests (headless)
npm run test:ui     # Playwright UI mode
```

## Project layout

```
src/
  app/                       # routes (App Router)
    api/contact              # contact form handler (stub)
    api/quote                # RFP intake handler (stub)
    careers/[slug]           # per-role detail + apply form
    projects/[slug]          # per-project detail
    services/[slug]          # per-service detail
    layout.tsx               # root layout + fonts + JSON-LD
    page.tsx                 # home
    opengraph-image.tsx      # root OG image (dynamic)
    sitemap.ts / robots.ts   # crawler metadata
  components/
    site/                    # header, footer, hero, cta, sections, awards
    ui/                      # primitives: button, input
  content/
    services.ts              # service catalog
    projects.ts              # project portfolio
    careers.ts               # open roles
  lib/
    site.ts                  # site-wide config (nav, contact, company, awards)
    structured-data.ts       # JSON-LD helpers
    cn.ts                    # tailwind className helper
tests/
  smoke.spec.ts              # route smoke tests
  a11y.spec.ts               # axe-core accessibility checks
```

Content lives as typed TypeScript modules. MDX/CMS migration is planned once the content surface stabilizes.

## Editing content

| Change                | File                                 |
| --------------------- | ------------------------------------ |
| Company facts / nav   | [src/lib/site.ts](src/lib/site.ts)   |
| Services              | [src/content/services.ts](src/content/services.ts) |
| Projects              | [src/content/projects.ts](src/content/projects.ts) |
| Open roles            | [src/content/careers.ts](src/content/careers.ts)   |
| Awards / affiliations | `site.awards` in [src/lib/site.ts](src/lib/site.ts) |

### Adding a new project

1. Add an entry to the `projects` array in [src/content/projects.ts](src/content/projects.ts) — give it a unique `slug`.
2. Drop a hero photo into `public/projects/<slug>.jpg` (once imagery is wired up).
3. Run `npm run build` — the detail route and sitemap update automatically via `generateStaticParams`.

### Adding a new service

1. Add an entry to `services` in [src/content/services.ts](src/content/services.ts).
2. Confirm it shows on `/services` and `/services/<slug>`.

## What's next (real build)

1. Real brand assets + project photography to replace gradient placeholders
2. Resend (or equivalent) wiring for `/api/quote` and `/api/contact` with file upload handling
3. Real safety metrics (TRIR / EMR / DART) on `/safety`
4. Spam protection (Turnstile/hCaptcha + honeypot)
5. Analytics (Vercel Analytics or Plausible) + Lighthouse pass
6. DNS cutover and 301s from the legacy WordPress URLs
