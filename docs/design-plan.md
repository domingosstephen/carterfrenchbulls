# Design plan — Carter French Bulls

## Token summary

| Token | Value |
|-------|-------|
| Page background | `#FFFBF5` warm white |
| Section alt bg | `#F6EBDD` sand |
| Health block bg | `#FFF1CC` butter |
| Primary action | `#F2A93B` marigold, ink text |
| Hover | `#E39A26` marigold deep |
| Primary text | `#2A2320` ink |
| Secondary text | `#6E625A` stone |
| Borders / dividers | `#EADFD0` line |
| Check icons / Available | `#4E8B62` sage |

**Type family:** Figtree Variable (self-hosted via Fontsource).

**Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.

**Radii:** 12 (inputs, buttons) · 20 (cards, images) · 999 (pills).

---

## One-sentence layout concept per page

| Page | Layout concept |
|------|---------------|
| Home | Full-bleed hero photo (4:5) beside headline. Below: card grid (1→3 col) → health block → 4-step HOW → breeder intro → FAQ → CTA strip. |
| Puppies | Sticky filter bar + card grid that filters client-side with no page reload. |
| Puppy detail | Dark gallery rail (scroll-snap) fills the top. White details panel below. Sticky bottom bar on mobile for reserve action. |
| Health | Health block full-width, then 2-col explanatory grid per item, then anti-scam box. |
| How it works | Numbered steps in a list (the only numbered content on the site). Aside box reinforces "video call first". |
| Delivery | Single column, honest note about cross-border variability. No promises not in config. |
| About | Photo column + text, then 2×2 values grid. |
| Contact | Form (max 600px) beside sticky aside with other contact options. |
| Legal | Single prose column, max 68ch. |

---

## Anti-generic checklist (brief §5)

- [x] No cream + terracotta or dark + neon
- [x] No paw prints, bones, cartoon dogs, puns
- [x] No gradients, heavy shadows, glassmorphism
- [x] No ALL CAPS labels
- [x] No single word in different color or italic in a headline
- [x] No numbered markers except the 4-step "How it works"
- [x] No fade/slide on every section — only one hero fade-in
- [x] No hover lift on cards — border color shift only
- [x] No emojis or exclamation marks in copy

---

## Performance decisions

- Hero `<img>` has `fetchpriority="high"` and `decoding="sync"` for fast LCP
- Gallery images below fold use `loading="lazy"` and `decoding="async"`
- Figtree loaded via Fontsource with `font-display: swap` built in
- No heavy JS frameworks on content pages — only vanilla JS for menu, gallery, filters, FAQ, form
- Tailwind v4 → CSS is generated at build time; no runtime overhead
- Astro static output for all pages except `/api/reserve` and `/keystatic/*`
