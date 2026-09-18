import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Scope from '../components/Scope'
import { Section, SectionHead, Reveal, cx } from '../components/primitives'
import { Parallax, ScrollScale, WordFade, DrawLine } from '../components/scroll'
import { useTheme } from '../theme/ThemeProvider'
import { EASE } from '../motion/variants'

/**
 * Nine fully-authored "worlds". Each is a real mini-layout rendered in its own
 * style/palette/font scope — the clearest possible demonstration that one
 * codebase can speak nine different design languages.
 */
const WORLDS = [
  {
    key: 'swiss',
    tab: 'Swiss',
    styleId: 'swiss-international',
    paletteId: 'true-mono',
    fontId: 'inter-tight--inter',
    kicker: '01 / Grid & Silence',
    title: 'Order is the argument.',
    body: 'A strict column grid, one weight of rule, and the discipline to leave three-quarters of the page empty. Nothing decorative survives the edit.',
    cta: 'Read the system',
    meta: ['Grid: 12 col', 'Rule: 1px', 'Scale: 1.333'],
  },
  {
    key: 'brutal',
    tab: 'Neo-Brutalist',
    styleId: 'neo-brutalist',
    paletteId: 'acid-paper',
    fontId: 'archivo-black--archivo',
    kicker: '02 / No Apology',
    title: 'LOUD ON PURPOSE.',
    body: 'Three-pixel borders. Hard offset shadows. Colour that argues with you. Built for brands that would rather be remembered than liked.',
    cta: 'HIT IT',
    meta: ['Border: 3px', 'Shadow: 6px 6px', 'Radius: 0'],
  },
  {
    key: 'glass',
    tab: 'Aurora Glass',
    styleId: 'aurora-glass',
    paletteId: 'iris-void',
    fontId: 'instrument-serif--geist',
    kicker: '03 / Depth Without Weight',
    title: 'Lit from behind.',
    body: 'Frosted planes floating over slow-moving colour fields. Blur as hierarchy, luminance as elevation — no shadow required.',
    cta: 'Enter the light',
    meta: ['Blur: 28px', 'Alpha: 0.45', 'Motion: drift'],
  },
  {
    key: 'editorial',
    tab: 'Editorial',
    styleId: 'editorial-print',
    paletteId: 'linen-paper',
    fontId: 'bodoni-moda--jost',
    kicker: '04 / The Long Read',
    title: 'Set like a magazine.',
    body: 'Generous measure, 1.8 leading, hairline rules between thoughts. Type that respects the reader enough to slow them down.',
    cta: 'Start reading',
    meta: ['Measure: 62ch', 'Leading: 1.8', 'Rules: hairline'],
  },
  {
    key: 'cyber',
    tab: 'Cyberpunk',
    styleId: 'cyberpunk',
    paletteId: 'lagoon-void',
    fontId: 'jetbrains-mono--inter',
    kicker: '05 / SIGNAL_ACQUIRED',
    title: 'NEON BLEED.',
    body: 'Scanlines, chromatic edges and a glow that leaks past its container. Interfaces for worlds where the electricity is never quite stable.',
    cta: 'JACK IN',
    meta: ['GLOW: 24px', 'SCAN: 4px', 'TRACK: +0.04em'],
  },
  {
    key: 'clay',
    tab: 'Claymorphism',
    styleId: 'claymorphism',
    paletteId: 'blush-paper',
    fontId: 'baloo-2--inter',
    kicker: '06 / Soft Power',
    title: 'Everything looks squeezable.',
    body: 'Inflated 3D forms with inner shadow and a bounce on tap. Warmth engineered for products that want to feel approachable.',
    cta: 'Give it a squeeze',
    meta: ['Radius: 32px', 'Inset: -8px', 'Spring: 300/20'],
  },
  {
    key: 'deco',
    tab: 'Art Deco',
    styleId: 'art-deco',
    paletteId: 'marigold-midnight',
    fontId: 'cormorant-garamond--inter',
    kicker: '07 / MCMXXV',
    title: 'SYMMETRY & GILDING',
    body: 'Vertical ambition, mirrored composition, and letterspacing wide enough to walk through. Luxury that predates the internet by a century.',
    cta: 'ENTER THE SALON',
    meta: ['TRACK: 0.18EM', 'FRAME: DOUBLE', 'AXIS: VERTICAL'],
  },
  {
    key: 'memphis',
    tab: 'Memphis',
    styleId: 'memphis',
    paletteId: 'magenta-paper',
    fontId: 'righteous--poppins',
    kicker: '08 / Milan 1981',
    title: 'CLASH ON PURPOSE',
    body: 'Terrazzo speckle, primary confetti and shapes that refuse to line up. Designed to make a spreadsheet feel like a party.',
    cta: 'JOIN IN',
    meta: ['Shadow: 6px flat', 'Radius: mixed', 'Rotate: yes'],
  },
  {
    key: 'terminal',
    tab: 'Terminal',
    styleId: 'terminal',
    paletteId: 'fern-void',
    fontId: 'ibm-plex-mono--ibm-plex-sans',
    kicker: '> 09 / TTY',
    title: '~/nuance $ render',
    body: 'Monospace everything, phosphor glow, blinking caret. For developer tools and anyone who thinks a GUI is a compromise.',
    cta: 'RUN ./demo',
    meta: ['COLS: 80', 'CARET: 1s', 'GLOW: on'],
  },
]

function WorldCard({ w, active }) {
  return (
    <Scope
      styleId={w.styleId}
      paletteId={w.paletteId}
      fontId={w.fontId}
      className="relative overflow-hidden"
      style={{ borderRadius: 'var(--r-lg)', border: 'var(--bw) var(--bs) var(--c-border)', display: 'flex', flexDirection: 'column' }}
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          background:
            'radial-gradient(38rem 26rem at 8% -10%, color-mix(in oklab, var(--c-accent) 26%, transparent), transparent 62%),' +
            'radial-gradient(32rem 24rem at 102% 108%, color-mix(in oklab, var(--c-accent-2) 24%, transparent), transparent 60%)',
        }}
      />

      <div className="relative grid md:grid-cols-[1.15fr_.85fr] gap-0 flex-1 items-stretch">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="nu-eyebrow mb-5">{w.kicker}</div>
          <h3 className="nu-display mb-5" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.3rem)' }}>
            {w.title}
          </h3>
          <p className="mb-8" style={{ color: 'var(--c-muted)', maxWidth: '44ch', fontSize: '1rem' }}>
            {w.body}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={
                w.styleId === 'neo-brutalist' ? { x: -4, y: -4, boxShadow: '10px 10px 0 var(--c-text)' }
                  : w.styleId === 'claymorphism' ? { scaleX: 1.05, scaleY: 0.94 }
                    : w.styleId === 'memphis' ? { rotate: -3, scale: 1.04 }
                      : { y: -3, boxShadow: 'var(--sh-lg)' }
              }
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              className="px-6 py-3 text-[0.88rem]"
              style={{
                fontFamily: 'var(--f-display)', fontWeight: 600, textTransform: 'var(--tt)',
                background: 'var(--c-accent)', color: 'var(--c-on-accent)',
                border: 'var(--bw) var(--bs) var(--c-accent)',
                borderRadius: 'var(--r-sm)', boxShadow: 'var(--sh)',
              }}
            >
              {w.cta}
            </motion.button>
            <motion.button
              whileHover={{ opacity: 0.6 }}
              className="px-6 py-3 text-[0.88rem]"
              style={{
                fontFamily: 'var(--f-display)', fontWeight: 600, textTransform: 'var(--tt)',
                background: 'transparent', color: 'var(--c-text)',
                border: 'var(--bw) var(--bs) var(--c-text)', borderRadius: 'var(--r-sm)',
              }}
            >
              Details
            </motion.button>
          </div>
        </div>

        {/* spec column */}
        <div
          className="p-8 md:p-10 flex flex-col justify-center gap-3"
          style={{ borderLeft: 'var(--bw) var(--bs) var(--c-border)', background: 'color-mix(in oklab, var(--c-surface) calc(var(--surface-a) * 100%), transparent)', backdropFilter: 'blur(var(--blur))' }}
        >
          {w.meta.map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, x: 14 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.5, ease: EASE.out }}
              className="flex items-center justify-between gap-3 pb-3 text-[0.78rem]"
              style={{ borderBottom: 'var(--bw) var(--bs) var(--c-border)', fontFamily: 'var(--f-display)' }}
            >
              <span style={{ color: 'var(--c-muted)' }}>{m.split(':')[0]}</span>
              <span style={{ color: 'var(--c-accent)', fontWeight: 700 }}>{m.split(':')[1] ?? ''}</span>
            </motion.div>
          ))}

          <div className="mt-4 grid grid-cols-5 gap-1.5">
            {['--c-accent', '--c-accent-2', '--c-text', '--c-muted', '--c-surface-2'].map((v) => (
              <div key={v} className="aspect-square" style={{ background: `var(${v})`, borderRadius: 'var(--r-sm)', border: 'var(--bw) var(--bs) var(--c-border)' }} />
            ))}
          </div>
        </div>
      </div>
    </Scope>
  )
}

export default function Showcase() {
  const [i, setI] = useState(0)
  const w = WORLDS[i]

  return (
    <Section id="showcase">
      <SectionHead
        eyebrow="One codebase, nine dialects"
        title="Range, demonstrated."
        sub="Each panel below is the same component tree rendered under a different design system — its own radii, shadow logic, type scale, texture and motion personality. Click through and watch it become a different studio."
        split
      />

      <DrawLine className="w-full mb-8" />

      {/* tabs */}
      <Reveal>
        <div className="flex flex-wrap gap-1.5 mb-7">
          {WORLDS.map((world, idx) => (
            <button
              key={world.key}
              onClick={() => setI(idx)}
              className="relative px-4 py-2 text-[0.78rem] font-semibold transition-colors"
              style={{
                fontFamily: 'var(--f-display)',
                borderRadius: 'var(--r-sm)',
                border: 'var(--bw) var(--bs) ' + (i === idx ? 'transparent' : 'var(--c-border)'),
                color: i === idx ? 'var(--c-on-accent)' : 'var(--c-muted)',
                zIndex: 1,
              }}
            >
              {i === idx && (
                <motion.span
                  layoutId="nu-world-tab"
                  className="absolute inset-0"
                  style={{ background: 'var(--c-accent)', borderRadius: 'var(--r-sm)', zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {world.tab}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={w.key}
            initial={{ opacity: 0, y: 34, filter: 'blur(10px)', scale: 0.985 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: -22, filter: 'blur(10px)', scale: 0.99 }}
            transition={{ duration: 0.55, ease: EASE.out }}
          >
            <WorldCard w={w} active />
          </motion.div>
        </AnimatePresence>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-5 text-[0.8rem]" style={{ color: 'var(--c-muted)' }}>
          Not a screenshot. Every panel is live React — same buttons, same cards, different design tokens.
          The whole page can do this too: open <b style={{ color: 'var(--c-text)' }}>Design Studio</b> bottom-right.
        </p>
      </Reveal>
    </Section>
  )
}
