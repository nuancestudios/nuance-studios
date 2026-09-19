import { Section, SectionHead, Reveal } from '../components/primitives'
import { useTheme } from '../theme/ThemeProvider'
import Showcase from './Showcase'
import Components from './Components'

/* ═══════════════════════════════════════════════════════════════
   Playground — the one place on the site you are invited to poke
   at. Two halves: nine re-skinned worlds (Showcase), then the full
   component kit they are built from (Components). Same section, so
   a visitor reads it as one continuous invitation to play rather
   than two separate sales pitches.
   ═══════════════════════════════════════════════════════════════ */

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
  const { style } = useTheme()

  return (
    <Section id="playground">
      <SectionHead
        eyebrow="Design playground · Stay a while"
        title="Design Playground"
        sub="Nine fully-authored design worlds and every interface element behind them — live, not screenshotted. Wander through, take the good bits home, then re-skin the whole site yourself from the Design Studio panel."
        split
      />

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
