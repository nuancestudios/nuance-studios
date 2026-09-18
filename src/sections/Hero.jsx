import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'
import { Button, Reveal, SplitText, Magnetic } from '../components/primitives'
import { STYLES } from '../data/styles'
import { PALETTES } from '../data/palettes'
import { FONT_PAIRS } from '../data/fonts'
import { EASE } from '../motion/variants'

const CLIENTS = ['Meridian', 'Kaya Labs', 'Northbound', 'Orbit&Co', 'Vellum', 'Studio Ferro', 'Halcyon', 'Praxis']

/* ═══════════════════════════════════════════════════════════════
   The Specimen — the hero's signature artifact.
   Every serious brand system leads with one object that IS the
   product. For a studio selling design range, that object is a
   live type-and-colour specimen card reading the active theme.
   ═══════════════════════════════════════════════════════════════ */
function Specimen() {
  const { style, palette, font, styleId } = useTheme()
  const swatches = [
    ['accent', palette.colors.accent],
    ['accent-2', palette.colors.accent2],
    ['surface-2', palette.colors.surface2],
    ['muted', palette.colors.muted],
    ['ink', palette.colors.text],
  ]

  return (
    <div
      className="relative select-none"
      style={{
        border: '1px solid var(--c-border)',
        background: 'var(--c-surface)',
        borderRadius: 'var(--r)',
      }}
    >
      {/* card chrome — mono label row, hairline divider */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-2.5"
        style={{ borderBottom: '1px solid var(--c-border)' }}
      >
        <span className="flex items-center gap-1.5">
          {['#e5484d', '#f5a524', '#30a46c'].map((c) => (
            <span key={c} style={{ width: 8, height: 8, borderRadius: 999, background: c, opacity: 0.85 }} />
          ))}
        </span>
        <span
          className="text-[0.64rem] uppercase tracking-[0.18em] tabular-nums"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--c-muted)' }}
        >
          specimen — {String(STYLES.findIndex((s) => s.id === styleId) + 1).padStart(2, '0')}/{STYLES.length}
        </span>
      </div>

      {/* the letterform */}
      <div className="relative overflow-hidden" style={{ borderBottom: '1px solid var(--c-border)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={font.id + palette.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE.out }}
            className="flex items-center justify-between gap-4 px-7 pt-6 pb-4"
          >
            <span
              style={{
                fontFamily: font.display,
                fontWeight: style.tokens.displayWeight,
                fontSize: 'clamp(5.5rem, 13vw, 11rem)',
                lineHeight: 0.78,
                letterSpacing: style.tokens.displayTracking,
                color: 'var(--c-text)',
              }}
            >
              Aa
            </span>
            <div className="text-right shrink-0">
              <div
                className="text-[0.62rem] uppercase tracking-[0.16em] mb-1"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--c-muted)' }}
              >
                display
              </div>
              <div className="text-[0.84rem] font-semibold mb-3" style={{ fontFamily: font.display }}>
                {font.displayName}
              </div>
              <div
                className="text-[0.62rem] uppercase tracking-[0.16em] mb-1"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--c-muted)' }}
              >
                text
              </div>
              <div className="text-[0.84rem]" style={{ fontFamily: font.body, color: 'var(--c-muted)' }}>
                {font.bodyName}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* palette strip — full-bleed, no gaps, like a paint chip */}
      <div className="flex" style={{ borderBottom: '1px solid var(--c-border)' }}>
        {swatches.map(([name, c], i) => (
          <motion.div
            key={name}
            className="group relative flex-1"
            style={{ height: 52, background: c }}
            whileHover={{ flex: 1.6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            <span
              className="absolute inset-x-0 bottom-1 text-center text-[0.52rem] uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                fontFamily: 'ui-monospace, monospace',
                color: i >= 3 ? palette.colors.bg : palette.colors.bg,
                mixBlendMode: 'difference',
              }}
            >
              {name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* spec readout — tabular mono, the "engineered" signal */}
      <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-1.5">
        {[
          ['style', style.name],
          ['era', style.era],
          ['palette', palette.name],
          ['mode', palette.mode],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3 min-w-0">
            <span
              className="text-[0.62rem] uppercase tracking-[0.14em] shrink-0"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--c-muted)' }}
            >
              {k}
            </span>
            <span
              className="text-[0.72rem] truncate text-right"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--c-text)' }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Rotating word in the headline: proves range in one glance ── */
const ROTATE = ['brutalist.', 'editorial.', 'luminous.', 'kinetic.', 'restrained.', 'unmistakable.']

function RotatingWord() {
  const [i, setI] = useState(0)
  const { reduced } = useTheme()
  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setI((v) => (v + 1) % ROTATE.length), 2200)
    return () => clearInterval(t)
  }, [reduced])

  return (
    <span className="relative inline-block align-bottom" style={{ minWidth: '4ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '0.9em', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.9em', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: EASE.out }}
          style={{ color: 'var(--c-accent)' }}
        >
          {ROTATE[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const { random } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, 90])
  const ySpec = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative z-10 min-h-[100svh] flex flex-col justify-center pt-32 pb-16 px-[clamp(1.1rem,5vw,5rem)]"
    >
      <div className="nu-wrap w-full">
        <motion.div style={{ opacity }} className="grid lg:grid-cols-[1.05fr_.95fr] gap-x-16 gap-y-12 items-center">
          {/* ── left: the argument ── */}
          <motion.div style={{ y: yText }}>
            <Reveal>
              <div
                className="flex items-center gap-2.5 mb-8 text-[0.66rem] uppercase tracking-[0.2em]"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--c-muted)' }}
              >
                <span style={{ width: 22, height: 1, background: 'var(--c-accent)' }} />
                Design studio · Bengaluru
              </div>
            </Reveal>

            {/* Headline: tight leading, aggressive negative tracking — the
                single most consistent signal across every brand system. */}
            <h1
              className="mb-8"
              style={{
                fontFamily: 'var(--f-display)',
                fontWeight: 'var(--fw-display)',
                fontSize: 'clamp(2.9rem, 6.4vw, 6.2rem)',
                lineHeight: 0.94,
                letterSpacing: '-0.042em',
                textTransform: 'var(--tt)',
              }}
            >
              <SplitText text="Your website" by="word" />
              <br />
              <SplitText text="should look" by="word" delay={0.12} />
              <br />
              <RotatingWord />
            </h1>

            <Reveal delay={0.3}>
              <p
                className="mb-10"
                style={{
                  color: 'var(--c-muted)',
                  maxWidth: '46ch',
                  fontSize: 'clamp(0.98rem, 1.15vw, 1.12rem)',
                  lineHeight: 1.6,
                }}
              >
                Most studios show you a portfolio. We hand you the controls. Every
                typeface, colour and structural decision on this page is live —
                change it and watch the whole site re-author itself.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-3">
                <Button as="a" href="#contact" variant="solid" size="lg" magnetic>
                  Start a project
                </Button>
                <button
                  onClick={random}
                  className="group inline-flex items-center gap-2.5 px-6 py-4 text-[0.9rem]"
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 600,
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--r-sm)',
                    color: 'var(--c-text)',
                    background: 'transparent',
                  }}
                >
                  <motion.span
                    className="inline-block"
                    whileHover={{ rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                    </svg>
                  </motion.span>
                  Shuffle the design
                </button>
              </div>
            </Reveal>
          </motion.div>

          {/* ── right: the artifact ── */}
          <motion.div style={{ y: ySpec }}>
            <Reveal delay={0.2}>
              <Specimen />
            </Reveal>
          </motion.div>
        </motion.div>
      </div>

      {/* ── client strip: hairline, quiet, no marquee gimmick ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="nu-wrap w-full mt-20"
      >
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-7" style={{ borderTop: '1px solid var(--c-border)' }}>
          <span
            className="text-[0.62rem] uppercase tracking-[0.18em]"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--c-muted)' }}
          >
            Selected clients
          </span>
          {CLIENTS.slice(0, 6).map((c) => (
            <motion.span
              key={c}
              whileHover={{ opacity: 1, y: -1 }}
              className="text-[0.92rem] cursor-default"
              style={{ fontFamily: 'var(--f-display)', fontWeight: 600, color: 'var(--c-muted)', opacity: 0.55 }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
