# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/blog site for Srivatsa RV built with Astro (static site generation), styled with a HUD/industrial light theme using Tailwind CSS. Uses React for interactive components (via `client:load` directive) and MDX for blog content.

## Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start dev server (Astro) |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build |

No test suite or linter is configured.

## Architecture

- **Layout**: Single layout (`src/layouts/Layout.astro`) wraps all pages. Supports a `transparent` mode for the full-screen landing hero.
- **Pages**: Astro file-based routing in `src/pages/`. Blog post pages use dynamic route `blog/[...slug].astro`.
- **Content**: Blog posts live in `src/content/blog/` as Markdown files. Schema defined in `src/content/config.ts` with Zod (title, description, author, pubDate, tags, classification).
- **Interactive components**: React components (`Hero.tsx`, `FilterHub.tsx`, `CareerTimeline.tsx`, `KartingChart.tsx`) hydrated client-side with `client:load`. Static components use `.astro` files.
- **Career data**: Work history stored in `src/data/career.ts`, rendered by `CareerTimeline.tsx`.

## Design System

Tailwind config defines a custom `hud` color palette (light theme with cool grays, white backgrounds, ink text, technical blue accent). Fonts: Inter (sans), JetBrains Mono (mono). The `@tailwindcss/typography` plugin is used for prose content.

## Integrations

- `@astrojs/react` — React islands
- `@astrojs/tailwind` — Tailwind CSS
- `@astrojs/mdx` — MDX content
- `posthog-js` — Analytics (via `Analytics.astro`)
- `framer-motion` — Animations in React components
- `recharts` — Charts (karting data)
- `lucide-react` — Icons

## Deployment

Site is configured for `https://srivatsa.dev` (set in `astro.config.mjs`).
