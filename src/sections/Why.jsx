import { motion } from 'framer-motion'
import { Section, Reveal, Stagger, StaggerItem, Button } from '../components/primitives'
import { EASE } from '../motion/variants'

/**
 * Why Nu.ance Studios — the studio's strengths, in the studio's own voice.
 * Copy is written to be read, not skimmed: one column of argument on the
 * left that stays with you, four reasons on the right that scroll past.
 */

const STRENGTHS = [
  {
    n: '01',
    title: 'We obsess over the details others skip.',
    body: "From the psychology behind your colour palette to the micro-interactions on your website that make visitors stay — we analyse, iterate, and craft every element of your brand with intention. Nothing is decorative. Everything earns its place.",
  },
  {
    n: '02',
    title: 'We build digital presences, not just websites.',
    body: "A pretty homepage is nice. A cohesive ecosystem of brand identity, web experience, content strategy, and marketing that actually converts? That's the goal. We connect the dots between how your brand looks, how it feels, and how it performs.",
  },
  {
    n: '03',
    title: 'We handle the whole journey.',
    body: 'Strategy, branding, design, development, marketing — end to end. No cobbling together five freelancers and hoping they talk to each other. One team, one vision, zero gaps.',
  },
  {
    n: '04',
    title: 'And honestly? We just genuinely love this stuff.',
    body: "We're the kind of people who notice bad kerning on restaurant menus and have opinions about loading speeds. Your dream project is our dream project, and we bring that energy to every pixel, every campaign, and every late-night \u201cwait, what if we tried this\u201d moment.",
  },
]

export default function Why() {
  return (
    <Section id="why" style={{ borderTop: 'var(--bw) var(--bs) var(--c-border)' }}>
      <div className="grid lg:grid-cols-[.92fr_1.08fr] gap-12 lg:gap-16 items-start">
        {/* ── left: the argument, pinned while the reasons scroll ── */}
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div className="nu-eyebrow mb-5 flex items-center gap-3">
              <span style={{ width: 28, height: 'var(--bw)', background: 'var(--c-accent)', display: 'inline-block' }} />
              Why Nu.ance Studios?
            </div>
          </Reveal>

          <h2
            className="nu-display mb-7"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.9rem)', lineHeight: 1.08, maxWidth: '22ch', textTransform: 'none' }}
          >
            <Reveal as="span" className="inline-block">
              Because your brand deserves more than a Canva template and a prayer.
            </Reveal>
          </h2>

          <Reveal delay={0.12}>
            <p className="text-[1rem] mb-6" style={{ color: 'var(--c-muted)', maxWidth: '48ch', lineHeight: 1.7 }}>
              Look, the internet is loud. Everyone's shouting, everyone's posting, and somehow
              everyone's website looks like it was built during a lunch break in 2017. We started
              Nu.ance Studios because we were tired of watching incredible ideas get buried under
              forgettable design, generic messaging, and marketing strategies that amount to{' '}
              “post more and hope for the best.”
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="nu-eyebrow">So here's what we actually do differently</div>
          </Reveal>
        </div>

        {/* ── right: four reasons, hairline-ruled ── */}
        <div>
          <Stagger className="border-t" amount={0.08} viewAmount={0.08}>
            {STRENGTHS.map((s) => (
              <StaggerItem key={s.n}>
                <motion.div
                  initial={false}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  className="grid grid-cols-[auto_1fr] gap-5 md:gap-7 py-7"
                  style={{ borderBottom: 'var(--bw) var(--bs) var(--c-border)' }}
                >
                  <span
                    className="nu-display tabular-nums leading-none"
                    style={{ fontSize: '0.92rem', color: 'var(--c-accent)', paddingTop: '.35em' }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="nu-display mb-3" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)', lineHeight: 1.25, textTransform: 'none' }}>
                      {s.title}
                    </h3>
                    <p className="text-[0.96rem]" style={{ color: 'var(--c-muted)', maxWidth: '56ch', lineHeight: 1.75 }}>
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* ── closing line + the one ask ── */}
      <Reveal delay={0.1}>
        <div className="mt-20 nu-surface p-8 md:p-14 relative overflow-hidden">
          <div
            aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(34rem 22rem at 12% -20%, color-mix(in oklab, var(--c-accent) 16%, transparent), transparent 62%)' }}
          />
          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE.out }}
              className="nu-display mb-7"
              style={{ fontSize: 'clamp(1.35rem, 3vw, 2.4rem)', lineHeight: 1.2, maxWidth: '28ch', textTransform: 'none' }}
            >
              The difference between blending in and standing out is, well —{' '}
              <span style={{ color: 'var(--c-accent)' }}>nuance.</span>
            </motion.p>

            <div className="flex flex-wrap items-center gap-4">
              <Button as="a" href="#contact" variant="solid" size="lg" magnetic>
                Let's find yours
              </Button>
              <span className="text-[0.8rem]" style={{ color: 'var(--c-muted)' }}>
                One conversation, no deck required.
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
