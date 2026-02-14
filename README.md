# Srivatsa.LOG

Operational mandates, architectural decisions, and infrastructure logs.

## System Architecture

*   **Framework**: Astro (Static Generation)
*   **Styling**: Tailwind CSS (Utility-first)
*   **Aesthetic**: HUD / Industrial / High-Contrast
*   **Content**: MDX (Markdown + Components) with Zod Schema Validation

## Operational Commands

All commands are run from the project root.

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local development server |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

*   `src/content/blog/`: Markdown source files for log entries.
*   `src/layouts/`: Global page shells (Header, Footer, Grid).
*   `src/components/`: Reusable UI modules (PostCard, ShareControl).
*   `astro.config.mjs`: Project configuration and integrations.
*   `tailwind.config.mjs`: Design tokens and theme definitions.