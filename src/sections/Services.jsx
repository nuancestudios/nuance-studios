import { motion } from 'framer-motion'
import { Section, SectionHead, Reveal, Stagger, StaggerItem, Card, Badge, Button, Counter } from '../components/primitives'
import { StickyCard, WordFade, ScrollCount, Parallax, DrawLine } from '../components/scroll'
import { useTheme } from '../theme/ThemeProvider'
import { EASE } from '../motion/variants'

const SERVICES = [
  {
    n: '01',
    title: 'Brand & Design Systems',
    body: 'We build the vocabulary before the pages — tokens, type scale, motion rules, component grammar. The kind of system that survives a redesign.',
    tags: ['Identity', 'Tokens', 'Figma library'],
    time: '2–3 weeks',
  },
  {
    n: '02',
    title: 'Websites That Convert',
    body: 'Marketing sites, product pages, launches. Designed for the scroll, engineered for Lighthouse 95+, shipped on Vercel with analytics wired in.',
    tags: ['Next.js', 'React', 'CMS'],
    time: '3–5 weeks',
  },
  {
    n: '03',
    title: 'Motion & Interaction',
    body: 'Framer Motion at the level people screenshot. Page transitions, scroll choreography, magnetic cursors, layout morphs — restraint included.',
    tags: ['Framer Motion', 'GSAP', 'WebGL'],
    time: '1–2 weeks',
  },
  {
    n: '04',
    title: 'Product UI',
    body: 'Dashboards, onboarding, settings — the unglamorous screens where most SaaS quietly loses its users. We make them a reason to stay.',
    tags: ['Design system', 'a11y', 'Handoff'],
    time: 'Ongoing',
  },
]

const PROCESS = [
  ['Discover', 'One workshop, a competitive teardown, and an honest opinion about what is not working.'],
  ['Direct', 'Three art directions in your brand, not in a template. You pick one, we kill two.'],
  ['Build', 'Weekly builds on a live URL. You watch it happen instead of waiting for a reveal.'],
  ['Ship', 'Deployed, documented, handed over. Your team owns the repo on day one.'],
]

export default function Services() {
  const { style } = useTheme()
  return (
    <Section id="services">
      <SectionHead
        eyebrow="What we do"
        title="Four things, done properly."
        sub="Small studio, senior people, no account managers between you and the person doing the work."
      />

      {/* Sticky stack — each card pins, scales back and dims as the next
          one rides over it. Scroll-linked, not triggered. */}
      <div className="mb-24 space-y-5">
        {SERVICES.map((s, i) => (
          <StickyCard key={s.n} index={i} total={SERVICES.length}>
            <div
              className="nu-surface p-7 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start"
              style={{ background: 'var(--c-surface)' }}
            >
              <span
                className="nu-display tabular-nums leading-none"
                style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', color: 'var(--c-accent)' }}
              >
                {s.n}
              </span>

              <div>
                <h3 className="nu-display nu-h3 mb-3">{s.title}</h3>
                <p className="text-[0.95rem] mb-5" style={{ color: 'var(--c-muted)', maxWidth: '52ch' }}>
                  {s.body}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[0.7rem]"
                      style={{
                        borderRadius: 'var(--r-sm)',
                        background: 'var(--c-surface-2)',
                        color: 'var(--c-muted)',
                        fontFamily: 'var(--f-display)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Badge tone="neutral">{s.time}</Badge>
            </div>
          </StickyCard>
        ))}
      </div>

      {/* Process timeline */}
      <SectionHead eyebrow="How it goes" title="Four weeks, no mystery." />

      <div className="relative">
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.3, ease: EASE.out }}
          className="hidden md:block absolute top-[18px] left-0 right-0 origin-left"
          style={{ height: 'var(--bw)', background: 'var(--c-border)' }}
        />
        <Stagger className="grid md:grid-cols-4 gap-8 md:gap-5" amount={0.14}>
          {PROCESS.map(([t, d], i) => (
            <StaggerItem key={t}>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.15, backgroundColor: 'var(--c-accent)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="grid place-items-center mb-5 relative z-10 text-[0.78rem] font-bold"
                  style={{
                    width: 37, height: 37, borderRadius: 999,
                    background: 'var(--c-surface)', color: 'var(--c-text)',
                    border: '2px solid var(--c-accent)', fontFamily: 'var(--f-display)',
                  }}
                >
                  {i + 1}
                </motion.div>
                <h4 className="nu-display mb-2" style={{ fontSize: '1.1rem' }}>{t}</h4>
                <p className="text-[0.85rem]" style={{ color: 'var(--c-muted)' }}>{d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Testimonial */}
      <Reveal delay={0.1}>
        <div className="mt-20 nu-surface p-8 md:p-14 relative overflow-hidden">
          <div
            aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(34rem 22rem at 88% -20%, color-mix(in oklab, var(--c-accent) 16%, transparent), transparent 62%)' }}
          />
          <div className="relative">
            <span className="nu-display block mb-4" style={{ fontSize: '3.5rem', lineHeight: 0.6, color: 'var(--c-accent)' }}>“</span>
            <WordFade
              text="We went in asking for a website and came out with a design system the whole company uses. Inbound doubled in a quarter."
              className="nu-display mb-7"
              style={{ fontSize: 'clamp(1.25rem, 2.6vw, 2.1rem)', lineHeight: 1.25, maxWidth: '26ch', textTransform: 'none' }}
            />
            <div className="flex items-center gap-3.5">
              <div
                className="grid place-items-center text-[0.8rem] font-bold shrink-0"
                style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--c-accent)', color: 'var(--c-on-accent)', fontFamily: 'var(--f-display)' }}
              >
                RM
              </div>
              <div>
                <div className="text-[0.9rem] font-semibold" style={{ fontFamily: 'var(--f-display)' }}>Rhea Mathews</div>
                <div className="text-[0.78rem]" style={{ color: 'var(--c-muted)' }}>Head of Brand, Meridian</div>
              </div>
              <div className="ml-auto hidden sm:flex items-baseline gap-6">
                {[['2.1×', 'Inbound'], ['98', 'Lighthouse'], ['4wk', 'To ship']].map(([n, l]) => (
                  <div key={l} className="text-right">
                    <div className="nu-display tabular-nums" style={{ fontSize: '1.4rem', lineHeight: 1 }}>{n}</div>
                    <div className="text-[0.65rem] uppercase tracking-[0.12em]" style={{ color: 'var(--c-muted)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
