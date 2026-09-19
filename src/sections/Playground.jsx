import { motion } from 'framer-motion'
import { Section, SectionHead, Reveal, Stagger, StaggerItem, Button } from '../components/primitives'
import { useTheme } from '../theme/ThemeProvider'
import { STYLE_COUNT } from '../data/styles'
import { PALETTE_COUNT } from '../data/palettes'
import { FONT_COUNT } from '../data/fonts'
import Showcase from './Showcase'
import Components from './Components'

/* ═══════════════════════════════════════════════════════════════
   Design Playground — the last thing before we ask for anything.
   Read it as: here is the studio, here is how we work, now come
   and play with what we made. Two halves follow the intro: nine
   re-skinned worlds (Showcase), then the component kit they are
   built from (Components).
   ═══════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    n: '01',
    title: 'Open the Design Studio.',
    body: 'It lives bottom-right, on every screen. Inside: every style, palette and type pairing we work in — searchable, filterable, switchable in one click.',
  },
  {
    n: '02',
    title: 'Change one thing.',
    body: 'Swap the typeface. Flip the palette to dark. Pick a style you would never have asked for. Or hit shuffle and let the studio choose for you.',
  },
  {
    n: '03',
    title: 'Watch the whole page follow.',
    body: 'Every section re-renders from the same token set — nothing cracks, nothing drifts. That is what a system buys you, and it is the depth you are hiring.',
  },
]

function SubHead({ n, eyebrow, title, sub }) {
  return (
    <div className="mt-24 mb-10">
      <Reveal>
        <div className="flex items-center gap-4 mb-6">
          <span
            className="nu-display tabular-nums"
            style={{ fontSize: '0.86rem', color: 'var(--c-accent)' }}
          >
            {n}
          </span>
          <span className="flex-1" style={{ height: 'var(--bw)', background: 'var(--c-border)' }} />
          <span className="nu-eyebrow">{eyebrow}</span>
        </div>
      </Reveal>

      <h3 className="nu-display nu-h3 mb-3" style={{ maxWidth: '26ch' }}>
        <Reveal as="span" className="inline-block">{title}</Reveal>
      </h3>

      {sub && (
        <Reveal delay={0.07}>
          <p className="nu-lead" style={{ color: 'var(--c-muted)', maxWidth: '62ch' }}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export default function Playground() {
  const { random, style } = useTheme()

  return (
    <Section id="playground">
      <SectionHead
        eyebrow="Start here · Design Playground"
        title="Design Playground"
        sub="Most studios show you a portfolio. This is better: a studio you can operate. Every colour, typeface, corner and motion on this page is a token — change one and the whole site re-authors itself in front of you. Play for as long as you like, and take any direction you fall for. Use it for inspiration, or use it as a preview of what we would build for you."
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
              <b style={{ color: 'var(--c-text)' }}>100+ components</b> — all real, all shipping.
            </p>
          </div>
          <Button onClick={random} variant="solid" size="lg" magnetic>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
            Shuffle the design language
          </Button>
        </div>
      </Reveal>

      {/* compat anchors — old #showcase / #components links still land here */}
      <span id="showcase" aria-hidden style={{ display: 'block', height: 0 }} />

      <SubHead
        n="01"
        eyebrow="Explore the styles"
        title="Nine design languages, one codebase."
        sub="Each panel below is the same component tree rendered under a different design system — its own radii, shadow logic, type scale, texture and motion personality. Click through and watch it become a different studio."
      />
      <Showcase />

      <span id="components" aria-hidden style={{ display: 'block', height: 0 }} />

      <SubHead
        n="02"
        eyebrow="Play with the components"
        title="Pre-designed. Not pre-generic."
        sub={`Every element below is reading the ${style.name} tokens right now. Change the style and they all re-render — same props, entirely new design language. That's the difference between a component library and a template.`}
      />
      <Components />
    </Section>
  )
}
