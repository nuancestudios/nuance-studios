import { motion } from 'framer-motion'
import { Section, SectionHead, Stagger, StaggerItem } from '../components/primitives'
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

    </Section>
  )
}
