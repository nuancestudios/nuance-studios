import { Section, SectionHead, Reveal, Button } from '../components/primitives'
import { useTheme } from '../theme/ThemeProvider'
import Showcase from './Showcase'
import Components from './Components'

/* ═══════════════════════════════════════════════════════════════
   The full Design Playground — its own page at #/playground.
   The homepage teases the studio; everything deep lives here,
   so a visitor who is only scrolling the site never has to
   wade through it. Two halves: nine re-skinned worlds
   (Showcase), then the component kit they are built from.
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

export default function PlaygroundPage() {
  const { random, style } = useTheme()

  return (
    <Section id="playground-page" style={{ paddingTop: '9.5rem' }}>
      {/* ── breadcrumb row ── */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-3 mb-12 text-[0.78rem]" style={{ color: 'var(--c-muted)' }}>
          <a
            href="#top"
            className="nu-underline inline-flex items-center gap-2 transition-colors"
            style={{ color: 'var(--c-muted)', fontFamily: 'var(--f-display)', fontWeight: 600 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-muted)')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            Back to the site
          </a>
          <span aria-hidden>/</span>
          <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600, color: 'var(--c-text)' }}>Design Playground</span>
        </div>
      </Reveal>

      <SectionHead
        eyebrow="The full studio"
        title="Explore the styles. Play with the components."
        sub="This page lives off the homepage on purpose, so it never interrupts the scroll. Everything here reads the same live tokens as the rest of the site: open the Design Studio bottom-right, change a style, palette or typeface, and watch every panel below re-author itself."
        split
      />

      <span id="showcase" aria-hidden style={{ display: 'block', height: 0 }} />

      <SubHead
        n="01"
        eyebrow="Explore the styles"
        title="Nine design languages, one codebase."
        sub="Each panel below is the same component tree rendered under a different design system: its own radii, shadow logic, type scale, texture and motion personality. Click through and watch it become a different studio."
      />
      <Showcase />

      <span id="components" aria-hidden style={{ display: 'block', height: 0 }} />

      <SubHead
        n="02"
        eyebrow="Play with the components"
        title="Pre-designed. Not pre-generic."
        sub={`Every element below is reading the ${style.name} tokens right now. Change the style and they all re-render: same props, entirely new design language. That's the difference between a component library and a template.`}
      />
      <Components />

      {/* ── closing ask ── */}
      <Reveal delay={0.1}>
        <div className="mt-20 nu-surface p-8 md:p-12 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div>
            <div className="nu-eyebrow mb-2">Found a direction you like?</div>
            <p className="text-[0.95rem]" style={{ color: 'var(--c-muted)', maxWidth: '52ch' }}>
              Note the style, palette and type pairing you landed on and mention them in your
              brief. We'll start there.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={random} variant="outline" size="lg" magnetic>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
              Shuffle
            </Button>
            <Button as="a" href="#contact" variant="solid" size="lg" magnetic>
              Start a project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
