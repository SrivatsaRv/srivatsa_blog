Review the proposed or changed UI code against this site's design system. Check every item below and report violations.

## Color Palette (hud-* tokens only)

- `hud-black` (#F0F2F5) — page/layout background
- `hud-dark` (#FFFFFF) — component/card background
- `hud-gray` (#E4E7EB) — hover states
- `hud-border` (#D1D9E0) — borders, dividers
- `hud-text` (#1C2127) — primary text (ink)
- `hud-muted` (#5F6B7C) — secondary/label text
- `hud-accent` (#0052CC) — interactive elements, links, active states (technical blue)
- `hud-warning` (#B46602) — caution, alert, special classification badges
- `hud-success` (#037f4c) — positive indicators

Never use raw hex values or Tailwind defaults (e.g. `text-gray-500`). All colors must use `hud-*` tokens.

## Typography

- **Headings**: `font-mono`, `uppercase`, `tracking-tight` or `tracking-tighter`, `font-black` or `font-bold`
- **Labels/metadata**: `font-mono`, `text-[10px]`, `uppercase`, `tracking-widest`, `text-hud-muted`
- **Body text**: `font-sans` (Inter), `text-sm` or `text-base`, `text-hud-text` or `text-hud-text/80`
- **Code/data values**: `font-mono`
- Section headers use the `// SECTION_NAME` comment syntax (e.g., `// TELEMETRY_DATA`, `// ORIGIN_SEQUENCE`)

## Component Patterns

- **Cards/panels**: `bg-hud-black border border-hud-border` with `hover:border-hud-text` or `hover:border-hud-accent`, no rounded corners (use `rounded-sm` at most for small badges)
- **Stat blocks**: Label on top (`text-[10px] font-mono uppercase tracking-widest text-hud-muted`), value below (`text-lg font-bold text-hud-text`)
- **Buttons/toggles**: `font-mono text-xs uppercase tracking-wider border`, active state uses `bg-hud-accent text-white border-hud-accent`
- **Pill badges**: `text-[10px] font-mono px-2 py-0.5 border border-hud-accent/30 rounded-full`
- **Empty states**: `border border-dashed border-hud-border` with `font-mono text-hud-muted uppercase tracking-widest` message using `// ERROR:` prefix
- **Hover effects**: Subtle — `transition-colors duration-300`, accent-tinted overlays (`bg-hud-accent/5`), never dramatic transforms

## Layout Rules

- Max content width: `max-w-4xl mx-auto`
- Page header pattern: `mb-12 pt-8 border-b border-hud-border pb-6` with `text-2xl md:text-3xl` heading
- Spacing is deliberate — use Tailwind spacing scale, avoid arbitrary values
- Grid backgrounds and scan-line effects are purely decorative (`pointer-events-none`, very low opacity)

## React Islands

- Interactive components use `.tsx` with `client:load` or `client:visible`
- Animations via `framer-motion` — `motion.div` with `initial/animate/exit`, subtle transitions (`opacity`, `y: 20`)
- Charts via `recharts` — use CSS custom properties for colors (`var(--color-hud-*)`)

## Anti-Patterns to Flag

- Using Tailwind color defaults instead of `hud-*` tokens
- Rounded corners larger than `rounded-sm` on cards/panels
- Sans-serif fonts on headings or labels
- Missing `uppercase` on labels/metadata
- Using `shadow-lg` or heavy shadows (keep to `shadow-sm` max)
- Decorative emoji anywhere
- Non-monospace fonts on data values or stats
