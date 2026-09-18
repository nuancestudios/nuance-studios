# Nu.ance Studios

A sales site that argues for itself. Instead of *claiming* design range, it demonstrates it —
the visitor can re-skin the entire page while reading it.

**59 design styles · 161 colour palettes · 57 font pairings · 100+ components**

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

Stack: Vite · React 19 · Tailwind 3 · Framer Motion.

---

## The idea

Everything visual is a **design token** written to `:root` as a CSS custom property.
No component hardcodes a colour, radius, shadow or font. Change the token set and
the whole page re-authors itself — same DOM, new design language.

```
data/styles.js    59 style grammars  (radii, borders, shadows, type scale,
                                      density, texture, motion personality)
data/palettes.js  161 OKLCH palettes (40 hue recipes × 4 treatments + 1 mono)
data/fonts.js     57 font pairings   (display + body, with system fallbacks)
       ↓
theme/ThemeProvider.jsx  →  writes ~30 CSS variables to :root
       ↓
components/*             →  read var(--r), var(--c-accent), var(--f-display)…
```

### Two ways the range is shown

1. **Design Studio panel** (bottom-right) — search and filter all 277 options.
   The whole site morphs live, with a colour wipe on every style change.
   Selection persists in `localStorage`.
2. **Showcase section** — nine fully-authored worlds rendered *side by side* via
   `<Scope>`, which scopes tokens to a subtree instead of the document. Swiss,
   Neo-Brutalist, Aurora Glass, Editorial, Cyberpunk, Claymorphism, Art Deco,
   Memphis and Terminal — same component tree, nine design languages.

---

## Motion

Each style declares a `reveal` and `hover` personality; `motion/variants.js`
maps those to Framer Motion variants. So one `<Reveal>` component behaves like a
Swiss clip-wipe under one style and a brutalist spring-pop under another.

| Piece | What it does |
|---|---|
| `Curtain` | Opening wordmark wipe on first paint |
| `StyleWipe` | Accent-colour wipe whenever the design language changes |
| `Cursor` | Magnetic dot + ring, grows over interactive elements |
| `SplitText` | Per-word 3D headline stagger |
| `Magnetic` | Cursor-attracted buttons and links (spring physics) |
| `Tilt` | Pointer-reactive 3D card tilt with tracking glare |
| `Reveal` / `Stagger` | Scroll-triggered entrances in the active style's grammar |
| `Counter` | rAF number count-up on scroll into view |
| `Marquee` | Infinite ticker, pauses on hover |

All of it respects `prefers-reduced-motion`.

---

## Structure

```
src/
├── data/            styles · palettes · fonts  (the design DNA)
├── theme/           ThemeProvider — token writer + font loader
├── motion/          reveal & hover variant maps
├── components/      primitives · Scope · ControlPanel · Cursor
└── sections/        Nav · Hero · Showcase · Components · Services · Contact · Footer
```

### Adding to the system

- **A style** → push an object to `STYLES` in `data/styles.js`. It appears in the
  panel immediately and every component obeys it.
- **A palette** → add a seed hue to `SEEDS`; you get four treatments free.
- **A pairing** → add a row to `raw` in `data/fonts.js` (Google Fonts auto-loads it).

---

## Notes

- Colours are **OKLCH** so every palette is perceptually even — no muddy or blown-out hues.
- Fonts load in chunked `<link>` requests to stay under Google's URL cap.
- `Geist`, `Satoshi` and `General Sans` aren't on Google Fonts; they fall back to
  system sans. Self-host them to use for real.
- Contact form is front-end only — wire `onSubmit` in `sections/Contact.jsx` to your endpoint.
