import { motion } from 'framer-motion'
import { Section, SectionHead, Reveal, Stagger, StaggerItem, Button } from '../components/primitives'
import { useTheme } from '../theme/ThemeProvider'
import { STYLE_COUNT } from '../data/styles'
import { PALETTE_COUNT } from '../data/palettes'
import { FONT_COUNT } from '../data/fonts'

/* ═══════════════════════════════════════════════════════════════
   Design Playground (homepage teaser) — the pitch and the
   controls stay here; the deep end (the style gallery and the
   full component kit) lives on its own page at #/playground so
   it never interrupts the homepage scroll.
   ═══════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    n: '01',
    title: 'Open the Design Studio.',
    body: 'It lives bottom-right, on every screen. Inside: every style, palette and type pairing we work in, searchable, filterable, switchable in one click.',
  },
  {
    n: '02',
    title: 'Change one thing.',
    body: 'Swap the typeface. Flip the palette to dark. Pick a style you would never have asked for. Or hit shuffle and let the studio choose for you.',
  },
  {
    n: '03',
    title: 'Watch the whole page follow.',
    body: 'Every section re-renders from the same token set. Nothing cracks, nothing drifts. That is what a system buys you, and it is the depth you are hiring.',
  },
]

export default function Playground() {
  const { random } = useTheme()

  return (
    <Section id="playground">
      <SectionHead
        eyebrow="Start here · Design Playground"
        title="Design Playground"
        sub="Most studios show you a portfolio. This is better: a studio you can operate. Every colour, typeface, corner and motion on this page is a token. Change one and the whole site re-authors itself in front of you. The deep end, the style gallery and the full component kit, lives on its own page behind the button below, so it never interrupts the scroll here."
        split
      />

      {/* ── how to shift it ───────────────────────────────── */}
      <Stagger className="grid md:grid-cols-3 gap-4" amount={0.09}>
        {STEPS.map((s) => (
          <StaggerItem key={s.n}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="nu-surface p-6 h-full"
            >
              <div className="flex items-baseline justify-between gap-3 mb-3.5">
                <span className="nu-eyebrow">Step</span>
                <span className="nu-display tabular-nums text-[0.8rem]" style={{ color: 'var(--c-accent)' }}>{s.n}</span>
              </div>
              <h4 className="nu-display mb-2.5" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', lineHeight: 1.25, textTransform: 'none' }}>
                {s.title}
              </h4>
              <p className="text-[0.88rem]" style={{ color: 'var(--c-muted)', lineHeight: 1.7 }}>{s.body}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* ── the ask, and the depth behind it ──────────────── */}
      <Reveal delay={0.1}>
        <div className="mt-6 nu-surface p-6 md:p-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div>
            <div className="nu-eyebrow mb-2">Try it right now</div>
            <p className="text-[0.95rem]" style={{ color: 'var(--c-muted)', maxWidth: '52ch' }}>
              One click re-skins everything you have read so far. Underneath it:{' '}
              <b style={{ color: 'var(--c-text)' }}>{STYLE_COUNT} design styles</b>,{' '}
              <b style={{ color: 'var(--c-text)' }}>{PALETTE_COUNT} colour palettes</b>,{' '}
              <b style={{ color: 'var(--c-text)' }}>{FONT_COUNT} type pairings</b> and{' '}
              <b style={{ color: 'var(--c-text)' }}>100+ components</b>, all real, all shipping.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Long label: the Button base forces whitespace-nowrap, which pushed this
                one off-screen on phones — let it wrap below the sm breakpoint. */}
            <Button
              as="a"
              href="#/playground"
              variant="solid"
              size="lg"
              magnetic
              className="!whitespace-normal sm:!whitespace-nowrap"
            >
              Explore styles &amp; components
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Button>
            <Button onClick={random} variant="outline" size="lg" magnetic>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
              Shuffle
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
