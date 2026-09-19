import { motion } from 'framer-motion'
import { Section, SectionHead, Reveal, Stagger, StaggerItem } from '../components/primitives'
import { WordFade } from '../components/scroll'
import { EASE } from '../motion/variants'

const PROCESS = [
  ['Discover', 'One workshop, a competitive teardown, and an honest opinion about what is not working.'],
  ['Direct', 'Three art directions in your brand, not in a template. You pick one, we kill two.'],
  ['Build', 'Weekly builds on a live URL. You watch it happen instead of waiting for a reveal.'],
  ['Ship', 'Deployed, documented, handed over. Your team owns the repo on day one.'],
]

/**
 * How it goes — the process, on its own, between the studio pitch and the
 * playground. Reads as one continuous argument: who we are → how we work →
 * what it looks like when we do.
 */
export default function Process() {
  return (
    <Section id="process">
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
