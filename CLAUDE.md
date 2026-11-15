@AGENTS.md

# Sisu Danışmanlık — website

Marketing site for **Sisu Danışmanlık** (Istanbul), a change-management and corporate-culture
consultancy founded by Mehmet Kurma. Single landing page + blog, in Turkish (default), English and German.

## Stack

- **Next.js 16 (App Router) + TypeScript**, exported as a fully static site (`output: "export"` → `out/`).
- **Tailwind CSS v4** (config lives in CSS: `src/app/globals.css`, no `tailwind.config`).
- **React Three Fiber + three.js** for the 3D compass. **GSAP ScrollTrigger + Lenis** for scroll choreography.
- **marked** for blog Markdown. React Compiler is enabled (`reactCompiler: true`).
- Hosted on **GitHub Pages**, deployed by `.github/workflows/deploy.yml` on every push to `main`.

> This Next.js version has breaking changes vs. older docs (see AGENTS.md). Check
> `node_modules/next/dist/docs/` before using an API you're unsure about. Notable here:
> `params` is a Promise (`await params`), and `PageProps<"/route">` / `LayoutProps<"/route">` are global types.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /tr/
npm run build      # static export into out/
npm run lint
npx tsc --noEmit
```

Preview the production build: `npx serve out` (or `python3 -m http.server -d out`).

## Layout

```
src/
  app/
    (root)/            "/" only: picks /tr, /en or /de from the browser language (static, client-side)
    [lang]/            real root layout per language (html lang, fonts, nav, footer)
      page.tsx         home page — composes the sections below
      blog/            blog index + [slug] posts (generateStaticParams, dynamicParams = false)
    globals.css        design tokens, blueprint grid, component classes (.btn, .label, .display, …)
  components/
    compass/           the 3D compass (see below)
    sections/          Hero, Manifesto, Expertise, Numbers, Founder, Approach, Journal, Contact
    Nav.tsx Footer.tsx SmoothScroll.tsx Fig.tsx
  content/posts/<lang>/<slug>.md   blog posts
  lib/
    i18n.ts            ALL copy for tr/en/de + contact details + form endpoint
    posts.ts           Markdown loader (front-matter parser, TR fallback)
    compass-store.ts   mutable state shared between DOM and the WebGL loop
    fonts.ts           Archivo (width axis) + IBM Plex Mono via next/font
```

## Design language — keep it consistent

- **"Nordic ice" + technical drawing.** Ice-white background with a cobalt blueprint grid, cobalt (`--cobalt`)
  as the only accent, ink text. No dark theme, no gradients-on-black, no serif headlines — the client
  explicitly rejected the generic "AI-made site" look.
- Headlines: `.display` (Archivo, expanded via `font-stretch`). Small caps-style labels: `.label` (IBM Plex Mono).
- Section captions read like drawing figures: `<Fig>FIG. 02 — …</Fig>`. Ornaments: `.crop` (corner marks),
  `.dim` (dimension line), `.hatch`.
- Custom component classes are inside `@layer components` so Tailwind utilities can override them —
  keep new ones there (unlayered CSS beats utilities like `hidden`).

## The compass (src/components/compass)

- **Line drawing only** — the client prefers the technical-drawing look; there is intentionally no solid/glass
  version. Cardinal letters are always **N / E / S / W** in every language (client request).
- `CompassStage` = fixed full-screen layer behind the page + all ScrollTriggers + pointer handling.
  `CompassCanvas` = the R3F `<Canvas>`. `Compass` = geometry + per-frame animation. `dial.ts` = canvas texture.
- Scroll story: draws itself on load → sits right of the hero → glides left as `#expertise` enters →
  the needle swings to each expertise's heading (`stepHeading(i)` in compass-store) → fades out after `#expertise`.
  On phones it dims behind the full-width `#manifesto` text.
- Interaction: needle follows the mouse, drag rotates (mouse only), click/tap spins it back to north with a ripple.
  Hit-testing uses `compass.screen` (projected centre/radius written every frame).
- Needle motion is an underdamped spring (`k`, `damp` in `useFrame`) — that wobble is deliberate.
- `prefers-reduced-motion` disables Lenis, the draw-on animation and needle physics.
- **React Compiler:** mutate three.js objects inside `useFrame` *through refs* (`ref.current.material.opacity = …`),
  not through values from `useMemo` — the `react-hooks/immutability` lint rule rejects the latter.

## Content tasks

- **Copy:** edit `src/lib/i18n.ts`. The `Dict` type is inferred from the Turkish object, so TS will flag any
  key missing from `en`/`de`.
- **Expertise areas:** the compass dial has 7 markers; changing the count means updating the dial too.
- **Blog post:** add `src/content/posts/tr/<slug>.md` with front-matter (`title`, `date`, `excerpt`, optional
  `sample: true`). Optional translations go in `en/` / `de/` with the same slug; missing ones fall back to Turkish.
  The two current posts are placeholders marked `sample: true` — delete them when real posts arrive.
- **Founder photo:** placeholder in `sections/Founder.tsx`. Put the file in `public/` and reference it with
  `${process.env.NEXT_PUBLIC_BASE_PATH}/founder.jpg` (raw `<img>` paths are not base-path aware).
- **Contact form:** `contact.formEndpoint` in `i18n.ts`. Empty → the form opens the visitor's mail app.
  Paste a Formspree (or similar) endpoint to receive submissions directly.
- **Pending from the client:** client list/logos, founder photo, real blog posts, confirmation of the
  career-table wording (role ↔ company mapping was inferred from the old site).

## Deployment & URLs

- GitHub Actions builds with `BASE_PATH` from `actions/configure-pages` (e.g. `/sisu-website` for a project site,
  empty for a custom domain or an org root site). `next.config.ts` reads it into `basePath`.
- Pages source must be set to **GitHub Actions** (repo → Settings → Pages).
- Planned: move the repo to a `sisudanismanlik` GitHub org (→ `sisudanismanlik.github.io`), then point
  `sisudanismanlik.com` at it (currently on the old site's host). No code change needed — `BASE_PATH` adapts.

## Conventions

- Everything in the repo (code, comments, commits, PRs, docs) is in **English**; site copy lives in `i18n.ts`.
- Keep the site fully static: no Server Actions, route handlers with `Request`, `cookies()`, redirects/rewrites
  or `next/image` optimisation (`images.unoptimized` is on).
