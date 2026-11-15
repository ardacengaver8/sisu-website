# Sisu Danışmanlık — Website

Website for **Sisu Danışmanlık**, an Istanbul-based consultancy for change management,
institutionalisation, strategic planning and corporate culture.

🌐 **Live:** https://ardacengaver8.github.io/sisu-website/

> *Sisu* (Finnish): inner strength, resilience, perseverance and determination in the face of adversity.

## Highlights

- **3D compass** drawn as a technical line drawing (React Three Fiber). It draws itself on load, follows the
  mouse, can be dragged and clicked, and as you scroll through the seven areas of expertise its needle swings
  to each one's heading.
- **"Nordic ice" blueprint design** — ice-white grid paper, cobalt line-work, figure captions like an engineering drawing.
- **Three languages:** Turkish (default), English, German — `/tr`, `/en`, `/de`.
- **Blog** written in Markdown files.
- **Fully static** — Next.js static export, deployed to GitHub Pages by GitHub Actions.

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript, static export |
| Styling | Tailwind CSS v4 |
| 3D | three.js + React Three Fiber + drei |
| Motion | GSAP ScrollTrigger, Lenis smooth scroll |
| Content | Markdown (marked) |
| Hosting | GitHub Pages via GitHub Actions |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run lint
```

Requires Node.js 20+.

## Project structure

```
src/
  app/                 routes: / (language redirect), /[lang], /[lang]/blog, /[lang]/blog/[slug]
  components/
    compass/           3D compass (scene, dial texture, scroll + pointer wiring)
    sections/          page sections (Hero, Expertise, Founder, Contact, …)
  content/posts/       blog posts, one folder per language
  lib/i18n.ts          all site copy (tr / en / de) and contact details
```

## Editing content

| To change… | Edit |
|---|---|
| Any text on the site | `src/lib/i18n.ts` |
| Contact details / form endpoint | `contact` object at the bottom of `src/lib/i18n.ts` |
| Colours, fonts, grid | `src/app/globals.css` |
| Blog posts | add a `.md` file to `src/content/posts/tr/` (translations in `en/`, `de/`) |

Blog post front-matter:

```md
---
title: Post title
date: 2026-11-15
excerpt: One-sentence summary
---

Markdown body…
```

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`). The base path is detected automatically, so moving to a custom
domain (e.g. `sisudanismanlik.com`) requires no code changes.

## For contributors / AI agents

See [`CLAUDE.md`](CLAUDE.md) for architecture notes, design rules and open content tasks.
