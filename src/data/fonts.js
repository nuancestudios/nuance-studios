/**
 * Nu.ance — Typography Engine
 * 57 hand-picked pairings. Each one is a display/body relationship that has
 * actually shipped: contrast in weight, width or era — never two fonts doing
 * the same job. Every stack carries a system fallback so nothing ever FOUTs
 * into Times New Roman.
 */

const S = {
  sans: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, Times New Roman, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  cond: 'Arial Narrow, ui-sans-serif, system-ui, sans-serif',
}

const raw = [
  // — Editorial / Swiss —
  ['Playfair Display', 'Inter', 'serif', 'sans', 'Editorial', 'The house classic. High-contrast didone over a neutral grotesque.'],
  ['Cormorant Garamond', 'Inter', 'serif', 'sans', 'Editorial', 'Whisper-thin old style with a workhorse body.'],
  ['DM Serif Display', 'DM Sans', 'serif', 'sans', 'Editorial', 'Same family DNA, opposite temperament.'],
  ['Libre Baskerville', 'Source Sans 3', 'serif', 'sans', 'Editorial', 'Transitional warmth, humanist calm.'],
  ['Lora', 'Karla', 'serif', 'sans', 'Editorial', 'Brushed contrast over quirky grotesque.'],
  ['Crimson Pro', 'Public Sans', 'serif', 'sans', 'Editorial', 'Book type meets civic clarity.'],
  ['EB Garamond', 'Work Sans', 'serif', 'sans', 'Editorial', 'Renaissance bones, modern muscle.'],
  ['Spectral', 'Inter Tight', 'serif', 'sans', 'Editorial', 'Screen-first serif with a tightened sans.'],
  ['Newsreader', 'Figtree', 'serif', 'sans', 'Editorial', 'Long-read comfort with a friendly UI face.'],
  ['Fraunces', 'Manrope', 'serif', 'sans', 'Editorial', 'Wonky optical serif, geometric counterweight.'],
  ['Instrument Serif', 'Geist', 'serif', 'sans', 'Editorial', 'Fashion-week italics over pure neutrality.'],
  ['Bodoni Moda', 'Jost', 'serif', 'sans', 'Editorial', 'Vogue masthead energy.'],

  // — Modern Sans —
  ['Inter Tight', 'Inter', 'sans', 'sans', 'Modern Sans', 'Optical sizing done right: one family, two voices.'],
  ['Geist', 'Geist Mono', 'sans', 'mono', 'Modern Sans', 'The dev-tool default. Precise, cold, expensive.'],
  ['Manrope', 'Inter', 'sans', 'sans', 'Modern Sans', 'Semi-geometric headline, neutral body.'],
  ['Outfit', 'DM Sans', 'sans', 'sans', 'Modern Sans', 'Rounded geometry, soft landing.'],
  ['Space Grotesk', 'Inter', 'sans', 'sans', 'Modern Sans', 'Technical quirk up top, silence below.'],
  ['Sora', 'Inter', 'sans', 'sans', 'Modern Sans', 'Wide apertures, confident stance.'],
  ['Plus Jakarta Sans', 'Inter', 'sans', 'sans', 'Modern Sans', 'SaaS default, tuned.'],
  ['General Sans', 'Inter', 'sans', 'sans', 'Modern Sans', 'Neutral with personality in the details.'],
  ['Satoshi', 'Inter', 'sans', 'sans', 'Modern Sans', 'Geometric with humanist warmth.'],
  ['Onest', 'Inter', 'sans', 'sans', 'Modern Sans', 'Quietly excellent at every size.'],
  ['Schibsted Grotesk', 'Inter', 'sans', 'sans', 'Modern Sans', 'Newsroom grotesque, digital native.'],
  ['Bricolage Grotesque', 'Inter', 'sans', 'sans', 'Modern Sans', 'Deliberately imperfect display.'],

  // — Brutalist / Impact —
  ['Archivo Black', 'Archivo', 'sans', 'sans', 'Impact', 'One family, maximum weight delta.'],
  ['Anton', 'Inter', 'sans', 'sans', 'Impact', 'Poster condensed. Nothing subtle here.'],
  ['Bebas Neue', 'Inter', 'sans', 'sans', 'Impact', 'All caps, all confidence.'],
  ['Oswald', 'Source Sans 3', 'sans', 'sans', 'Impact', 'Condensed gothic, open body.'],
  ['Syne', 'Inter', 'sans', 'sans', 'Impact', 'Art-school wide. Gallery signage.'],
  ['Unbounded', 'Inter', 'sans', 'sans', 'Impact', 'Variable width that shouts.'],
  ['Chivo', 'Inter', 'sans', 'sans', 'Impact', 'Grotesque with a hard jaw.'],
  ['Big Shoulders Display', 'Archivo', 'cond', 'sans', 'Impact', 'Chicago industrial signage.'],
  ['Alfa Slab One', 'Inter', 'serif', 'sans', 'Impact', 'Slab so heavy it dents the page.'],

  // — Technical / Mono —
  ['JetBrains Mono', 'Inter', 'mono', 'sans', 'Technical', 'Terminal headline, human body.'],
  ['IBM Plex Mono', 'IBM Plex Sans', 'mono', 'sans', 'Technical', 'The full Plex system, as intended.'],
  ['Space Mono', 'Space Grotesk', 'mono', 'sans', 'Technical', 'Siblings with a shared strangeness.'],
  ['Geist Mono', 'Geist', 'mono', 'sans', 'Technical', 'Inverted dev-tool stack.'],
  ['Azeret Mono', 'Inter', 'mono', 'sans', 'Technical', 'Mono with unexpected charm.'],
  ['Martian Mono', 'Inter', 'mono', 'sans', 'Technical', 'Extra-wide monospace. Data-heavy.'],
  ['DM Mono', 'DM Sans', 'mono', 'sans', 'Technical', 'Understated technical pairing.'],

  // — Retro / Expressive —
  ['Righteous', 'Poppins', 'sans', 'sans', 'Expressive', 'Seventies signage, clean support.'],
  ['Abril Fatface', 'Poppins', 'serif', 'sans', 'Expressive', 'Fat didone, geometric relief.'],
  ['Yeseva One', 'Inter', 'serif', 'sans', 'Expressive', 'Ornate display, calm below.'],
  ['Silkscreen', 'Inter', 'mono', 'sans', 'Expressive', 'Pixel nostalgia, legible body.'],
  ['VT323', 'IBM Plex Mono', 'mono', 'mono', 'Expressive', 'CRT terminal, full commit.'],
  ['Monoton', 'Inter', 'sans', 'sans', 'Expressive', 'Neon tube lettering.'],
  ['Bungee', 'Inter', 'sans', 'sans', 'Expressive', 'Urban signage, vertical energy.'],
  ['Caprasimo', 'Nunito', 'serif', 'sans', 'Expressive', 'Chunky retro, rounded body.'],
  ['Shrikhand', 'Inter', 'serif', 'sans', 'Expressive', 'Sunset poster, saturated mood.'],

  // — Soft / Human —
  ['Nunito', 'Nunito Sans', 'sans', 'sans', 'Soft', 'Rounded family, gentle hierarchy.'],
  ['Quicksand', 'Nunito Sans', 'sans', 'sans', 'Soft', 'Friendly geometry.'],
  ['Comfortaa', 'Nunito Sans', 'sans', 'sans', 'Soft', 'Maximum roundness, minimum threat.'],
  ['Baloo 2', 'Inter', 'sans', 'sans', 'Soft', 'Playful weight with a straight man.'],
  ['Gantari', 'Inter', 'sans', 'sans', 'Soft', 'Subtly humanist, easy on the eye.'],
  ['Epilogue', 'Inter', 'sans', 'sans', 'Soft', 'Low contrast, high comfort.'],
  ['Familjen Grotesk', 'Inter', 'sans', 'sans', 'Soft', 'Nordic warmth in a grotesque.'],
  ['Hanken Grotesk', 'Inter', 'sans', 'sans', 'Soft', 'Quiet, spacious, trustworthy.'],
]

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const FONT_PAIRS = raw.map(([display, body, dc, bc, category, note]) => ({
  id: `${slug(display)}--${slug(body)}`,
  displayName: display,
  bodyName: body,
  category,
  note,
  display: `'${display}', ${S[dc]}`,
  body: `'${body}', ${S[bc]}`,
}))

export const FONT_CATEGORIES = [...new Set(FONT_PAIRS.map((f) => f.category))]
export const getFontPair = (id) => FONT_PAIRS.find((f) => f.id === id) || FONT_PAIRS[0]
export const FONT_COUNT = FONT_PAIRS.length

/** Unique font families to request from the CDN. */
export const ALL_FAMILIES = [
  ...new Set(FONT_PAIRS.flatMap((f) => [f.displayName, f.bodyName])),
].sort()
