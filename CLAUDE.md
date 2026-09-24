# CLAUDE.md — Carter French Bulls

Project conventions for future edits. Read this before making changes.

---

## Stack

- **Astro 7** with `output: 'hybrid'` (static by default, SSR for `/api/*` and `/keystatic/*`)
- **Tailwind CSS v4** — design tokens in `src/styles/global.css` under `@theme`, NOT in a JS config file
- **Keystatic** — git-based CMS at `/keystatic` (local storage mode in dev)
- **Resend** — email delivery for the reservation form
- **Vercel** adapter

## Key files

| File | Purpose |
|------|---------|
| `site.config.ts` | All placeholder tokens — edit here, never in templates |
| `src/styles/global.css` | Design tokens (`@theme`), base styles, layout helpers |
| `src/content/config.ts` | Zod schemas for `puppies` and `parents` collections |
| `src/content/puppies/*.yaml` | One file per puppy — edit via Keystatic or directly |
| `keystatic.config.ts` | Keystatic schema (must mirror `src/content/config.ts`) |
| `src/pages/api/reserve.ts` | Reservation form endpoint (SSR, rate-limited, honeypot) |
| `DECISIONS.md` | Placeholders and design decisions — update as items are resolved |

## Conventions

- **No hardcoded strings** from `site.config.ts` in components. Always import config.
- **No lorem ipsum** anywhere. Use placeholder tokens from `site.config.ts` instead.
- **Health block is data-driven.** If a date is missing, the row shows as unchecked. Never fake health data.
- **No claims not in config.** Delivery, registry, and health guarantee language must come from `site.config.ts` tokens filled by the breeder.
- **Semantic HTML.** No `<div>` where a `<section>`, `<nav>`, `<article>`, or `<button>` is correct.
- **Minimal JS.** Only menu, gallery, filters, FAQ, and form need JavaScript. Everything else is static.
- **Tailwind v4 tokens** live in `@theme` in CSS. Use `--color-*`, `--font-*`, etc. Class names match token names (`bg-warm-white`, `text-ink`, etc.).
- **Radii:** 12px for inputs/buttons (`var(--radius-input)`), 20px for cards/images (`var(--radius-card)`), 999px for pills (`var(--radius-pill)`).
- **Motion:** 200ms ease-out for all interactions. One hero fade-in only. No scroll animations.
- **Copy:** Sentence case. No emojis. No exclamation marks. Buttons say exactly what happens.
- **Accessibility:** WCAG AA. All tap targets ≥ 48px. Focus ring via `:focus-visible`. `prefers-reduced-motion` respected (hero fade is the only animation that must be suppressed).

## Images

- Puppy photos live in `public/images/puppies/[slug]/[slug]-N.jpg`
- Content files reference them by public path, e.g. `/images/puppies/loki/loki-1.jpg`
- Sandy's photo goes at `public/images/sandy.jpg` (referenced in About page)
- OG image goes at `public/og-default.jpg` (1200×630)

## Environment variables (Vercel)

```
RESEND_API_KEY=re_...
BREEDER_EMAIL=sandy@...
FROM_EMAIL=no-reply@carterfrenchbulls.com
```

See `.env.example` for the full list.

## Adding a new puppy

1. Run the dev server and go to `/keystatic`
2. Create a new puppy entry with all fields filled
3. Drop photos in `public/images/puppies/[slug]/`
4. Reference them in the gallery field as `/images/puppies/[slug]/[slug]-1.jpg` etc.
5. Commit the new YAML file and images

## Development

```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm preview    # preview production build
```

## Documentation

- Astro: https://docs.astro.build
- Tailwind v4: https://tailwindcss.com/docs
- Keystatic: https://keystatic.com/docs
- Resend: https://resend.com/docs
