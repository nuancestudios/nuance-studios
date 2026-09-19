import { Section, SectionHead, Badge } from '../components/primitives'
import { StickyCard } from '../components/scroll'

const SERVICES = [
  {
    n: '01',
    title: 'Brand & Design Systems',
    body: 'We help you build digital impact and presence, whether it is day 0 or day 100 of your business, through strong brand identity and personality.',
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
    title: 'Performance Analytics',
    body: 'Traffic, funnels, retention, attribution — instrumented properly and reported in plain language. We wire up the tracking, build the dashboards you will actually open, and tell you what to change next.',
    tags: ['GA4', 'Looker Studio', 'Funnels'],
    time: 'Ongoing',
  },
]

export default function Services() {
  return (
    <Section id="services">
      <SectionHead
        eyebrow="What we do"
        title="Four things, done properly."
        sub="Small studio, senior people, no account managers between you and the person doing the work."
      />

      {/* Sticky stack — each card pins, scales back and dims as the next
          one rides over it. Scroll-linked, not triggered. */}
      <div className="space-y-5">
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
    </Section>
  )
}
