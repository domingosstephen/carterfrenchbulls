# DECISIONS.md

Decisions and placeholders that must be resolved before launch.
Created during the initial build — update as items are confirmed.

---

## Placeholders still needed from Sandy

| Item | Token | Where used | Status |
|------|-------|-----------|--------|
| Phone number | `{{PHONE}}` | Header, footer, contact page, sticky bar | **NEEDED** |
| Email address | `{{EMAIL}}` | Footer, contact page, legal | **NEEDED** |
| Breeder email (for receiving reservations) | `BREEDER_EMAIL` env var | `.env` on Vercel | **NEEDED** |
| Resend API key | `RESEND_API_KEY` env var | `.env` on Vercel | **NEEDED** |
| Verified "From" domain on Resend | `FROM_EMAIL` env var | `.env` on Vercel | **NEEDED** |
| Deposit amount | `{{DEPOSIT}}` | `site.config.ts` → `deposit` | NEEDED |
| Response time | `{{RESPONSE_TIME}}` | `site.config.ts` → `responseTime` | NEEDED |
| Delivery options | `{{DELIVERY_OPTIONS}}` | `site.config.ts` → `deliveryOptions` | NEEDED |
| Sandy's photo | `/public/images/sandy.jpg` | About page | NEEDED |
| Registry (per puppy) | discussed per buyer | Health block, puppy pages | By design — no blanket claim |
| OG / social image | `/public/og-default.jpg` | All pages | NEEDED |
| Apple touch icon | `/public/apple-touch-icon.png` | HTML head | NEEDED |

---

## Puppy data — review before launch

All four puppies are marked **available** with placeholder dates. Sandy must confirm:

| Puppy | Sex | Color confirmed? | Birth date | Ready date | Status |
|-------|-----|---------|-----------|-----------|--------|
| Charlie | Male (assumed) | Cream | **PLACEHOLDER** | **PLACEHOLDER** | Available |
| Flor | Female (assumed) | Black pied | **PLACEHOLDER** | **PLACEHOLDER** | Available |
| Loki | Male (assumed) | Lilac fawn | **PLACEHOLDER** | **PLACEHOLDER** | Available |
| Sherif | Male (assumed) | Blue merle | **PLACEHOLDER** | **PLACEHOLDER** | Available |

> **Note:** Charlie's photos show what appears to be a full-grown adult dog rather than a puppy.
> Please confirm: Is Charlie a puppy for sale, or a parent (sire or dam)?
> If Charlie is a parent, move Charlie's data to `src/content/parents/charlie.yaml` and remove
> from the puppies collection.

---

## Design decisions (brief was silent — simplest option chosen)

| Decision | Choice | Reason |
|---------|--------|--------|
| Font hosting | Fontsource npm package (`@fontsource-variable/figtree`) | Truly self-hosted; no Google Fonts CDN request |
| Content format | `.yaml` files in `src/content/puppies/` | Data-only collection, no rich text body needed |
| Image format | Original JPEGs in `/public/images/puppies/` | Astro Image pipeline can optimize on build; Keystatic writes paths pointing here |
| CMS | Keystatic (local storage mode) | Writes YAML to git; breeder edits via `/keystatic` in dev, or via GitHub UI |
| Output mode | `hybrid` | Needed for API route (`/api/reserve`) and Keystatic handler; all other pages prerender as static |
| Form email delivery | Resend | Simple API, generous free tier, good deliverability |
| Reviews section | Omitted | Brief says "only when real ones exist" — no placeholder testimonials |
| Sandy's About copy | Placeholder text | Must be replaced with Sandy's own words before launch |
| Legal page | Placeholder copy | Must be reviewed by a lawyer before launch |
| OG image | Placeholder token | Generate a real OG card (1200×630) using a puppy photo |

---

## How to fill placeholders

1. Edit `site.config.ts` for all `{{TOKEN}}` values
2. Add env vars on Vercel dashboard (Settings → Environment Variables):
   - `RESEND_API_KEY`
   - `BREEDER_EMAIL`
   - `FROM_EMAIL`
3. Add `/public/images/sandy.jpg` and `/public/og-default.jpg`
4. Edit `src/content/puppies/*.yaml` to confirm dates, sex, and status
5. Replace About page copy in `src/pages/about.astro`
6. Have a lawyer review `src/pages/legal.astro`
