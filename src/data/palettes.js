/**
 * Nu.ance — Palette Engine
 * 161 palettes generated from 40 curated hue recipes × 4 tonal treatments,
 * plus one pure achromatic. Colors are emitted as OKLCH for perceptual
 * consistency across every hue, so no palette ever looks muddy or blown out.
 */

const SEEDS = [
  { key: 'obsidian', name: 'Obsidian', h: 265, c: 0.02, family: 'Neutral' },
  { key: 'graphite', name: 'Graphite', h: 240, c: 0.012, family: 'Neutral' },
  { key: 'bone', name: 'Bone', h: 75, c: 0.018, family: 'Neutral' },
  { key: 'linen', name: 'Linen', h: 55, c: 0.03, family: 'Neutral' },
  { key: 'ink', name: 'Ink Blue', h: 255, c: 0.14, family: 'Blue' },
  { key: 'cobalt', name: 'Cobalt', h: 262, c: 0.19, family: 'Blue' },
  { key: 'azure', name: 'Azure', h: 232, c: 0.16, family: 'Blue' },
  { key: 'glacier', name: 'Glacier', h: 215, c: 0.1, family: 'Blue' },
  { key: 'teal', name: 'Deep Teal', h: 195, c: 0.13, family: 'Cyan' },
  { key: 'lagoon', name: 'Lagoon', h: 186, c: 0.15, family: 'Cyan' },
  { key: 'mint', name: 'Mint', h: 168, c: 0.13, family: 'Green' },
  { key: 'jade', name: 'Jade', h: 158, c: 0.15, family: 'Green' },
  { key: 'fern', name: 'Fern', h: 145, c: 0.14, family: 'Green' },
  { key: 'moss', name: 'Moss', h: 132, c: 0.09, family: 'Green' },
  { key: 'olive', name: 'Olive', h: 115, c: 0.11, family: 'Green' },
  { key: 'citron', name: 'Citron', h: 103, c: 0.17, family: 'Lime' },
  { key: 'acid', name: 'Acid Lime', h: 128, c: 0.22, family: 'Lime' },
  { key: 'chartreuse', name: 'Chartreuse', h: 118, c: 0.2, family: 'Lime' },
  { key: 'sand', name: 'Sand', h: 82, c: 0.07, family: 'Earth' },
  { key: 'wheat', name: 'Wheat', h: 88, c: 0.12, family: 'Earth' },
  { key: 'amber', name: 'Amber', h: 72, c: 0.17, family: 'Amber' },
  { key: 'honey', name: 'Honey', h: 80, c: 0.15, family: 'Amber' },
  { key: 'marigold', name: 'Marigold', h: 68, c: 0.19, family: 'Amber' },
  { key: 'clay', name: 'Clay', h: 48, c: 0.11, family: 'Earth' },
  { key: 'terracotta', name: 'Terracotta', h: 42, c: 0.14, family: 'Earth' },
  { key: 'rust', name: 'Rust', h: 38, c: 0.16, family: 'Orange' },
  { key: 'ember', name: 'Ember', h: 45, c: 0.2, family: 'Orange' },
  { key: 'tangerine', name: 'Tangerine', h: 55, c: 0.21, family: 'Orange' },
  { key: 'coral', name: 'Coral', h: 28, c: 0.17, family: 'Red' },
  { key: 'vermillion', name: 'Vermillion', h: 32, c: 0.21, family: 'Red' },
  { key: 'scarlet', name: 'Scarlet', h: 25, c: 0.22, family: 'Red' },
  { key: 'rosewood', name: 'Rosewood', h: 15, c: 0.13, family: 'Red' },
  { key: 'blush', name: 'Blush', h: 10, c: 0.09, family: 'Pink' },
  { key: 'fuchsia', name: 'Fuchsia', h: 350, c: 0.2, family: 'Pink' },
  { key: 'magenta', name: 'Magenta', h: 338, c: 0.23, family: 'Pink' },
  { key: 'orchid', name: 'Orchid', h: 322, c: 0.17, family: 'Purple' },
  { key: 'violet', name: 'Violet', h: 300, c: 0.19, family: 'Purple' },
  { key: 'amethyst', name: 'Amethyst', h: 292, c: 0.16, family: 'Purple' },
  { key: 'iris', name: 'Iris', h: 278, c: 0.18, family: 'Purple' },
  { key: 'plum', name: 'Plum', h: 330, c: 0.11, family: 'Purple' },
]

const TREATMENTS = [
  {
    key: 'paper',
    label: 'Paper',
    mode: 'light',
    build: (s) => ({
      bg: ok(0.985, s.c * 0.06, s.h),
      surface: ok(1, 0, s.h),
      surface2: ok(0.955, s.c * 0.1, s.h),
      text: ok(0.2, s.c * 0.3, s.h),
      muted: ok(0.53, s.c * 0.22, s.h),
      border: ok(0.885, s.c * 0.14, s.h),
      accent: ok(0.55, s.c, s.h),
      accent2: ok(0.68, s.c * 0.85, rot(s.h, 42)),
      onAccent: s.c < 0.05 ? ok(0.99, 0, s.h) : ok(0.99, 0.01, s.h),
      glow: ok(0.55, s.c, s.h),
    }),
  },
  {
    key: 'wash',
    label: 'Wash',
    mode: 'light',
    build: (s) => ({
      bg: ok(0.955, Math.min(s.c * 0.3, 0.05), s.h),
      surface: ok(0.985, Math.min(s.c * 0.16, 0.03), s.h),
      surface2: ok(0.915, Math.min(s.c * 0.34, 0.06), s.h),
      text: ok(0.24, s.c * 0.42, rot(s.h, -6)),
      muted: ok(0.52, s.c * 0.3, s.h),
      border: ok(0.855, s.c * 0.2, s.h),
      accent: ok(0.5, s.c * 1.02, s.h),
      accent2: ok(0.62, s.c * 0.9, rot(s.h, -38)),
      onAccent: ok(0.985, 0.008, s.h),
      glow: ok(0.62, s.c, s.h),
    }),
  },
  {
    key: 'midnight',
    label: 'Midnight',
    mode: 'dark',
    build: (s) => ({
      bg: ok(0.16, Math.min(s.c * 0.28, 0.045), s.h),
      surface: ok(0.215, Math.min(s.c * 0.3, 0.05), s.h),
      surface2: ok(0.275, Math.min(s.c * 0.32, 0.055), s.h),
      text: ok(0.965, s.c * 0.06, s.h),
      muted: ok(0.7, s.c * 0.14, s.h),
      border: ok(0.35, s.c * 0.26, s.h),
      accent: ok(0.74, s.c * 0.95, s.h),
      accent2: ok(0.8, s.c * 0.72, rot(s.h, 48)),
      onAccent: ok(0.16, s.c * 0.2, s.h),
      glow: ok(0.74, s.c, s.h),
    }),
  },
  {
    key: 'void',
    label: 'Void',
    mode: 'dark',
    build: (s) => ({
      bg: ok(0.09, Math.min(s.c * 0.18, 0.03), s.h),
      surface: ok(0.135, Math.min(s.c * 0.22, 0.04), s.h),
      surface2: ok(0.19, Math.min(s.c * 0.26, 0.05), s.h),
      text: ok(0.98, s.c * 0.04, s.h),
      muted: ok(0.64, s.c * 0.12, s.h),
      border: ok(0.28, s.c * 0.3, s.h),
      accent: ok(0.82, Math.min(s.c * 1.15, 0.24), s.h),
      accent2: ok(0.7, s.c, rot(s.h, -54)),
      onAccent: ok(0.1, s.c * 0.2, s.h),
      glow: ok(0.82, Math.min(s.c * 1.2, 0.26), s.h),
    }),
  },
]

function ok(l, c, h) {
  return `oklch(${round(l)} ${round(c)} ${round(h, 1)})`
}
function round(n, p = 3) {
  const f = Math.pow(10, p)
  return Math.round(n * f) / f
}
function rot(h, d) {
  return (h + d + 360) % 360
}

const generated = []
SEEDS.forEach((seed) => {
  TREATMENTS.forEach((t) => {
    generated.push({
      id: `${seed.key}-${t.key}`,
      name: `${seed.name} ${t.label}`,
      family: seed.family,
      mode: t.mode,
      hue: seed.h,
      colors: t.build(seed),
    })
  })
})

// The 161st — pure achromatic, the designer's reset button.
generated.push({
  id: 'true-mono',
  name: 'True Mono',
  family: 'Neutral',
  mode: 'light',
  hue: 0,
  colors: {
    bg: ok(1, 0, 0),
    surface: ok(0.975, 0, 0),
    surface2: ok(0.93, 0, 0),
    text: ok(0.12, 0, 0),
    muted: ok(0.5, 0, 0),
    border: ok(0.85, 0, 0),
    accent: ok(0.12, 0, 0),
    accent2: ok(0.45, 0, 0),
    onAccent: ok(1, 0, 0),
    glow: ok(0.4, 0, 0),
  },
})

export const PALETTES = generated
export const PALETTE_FAMILIES = [...new Set(PALETTES.map((p) => p.family))]
export const getPalette = (id) => PALETTES.find((p) => p.id === id) || PALETTES[0]
export const PALETTE_COUNT = PALETTES.length
