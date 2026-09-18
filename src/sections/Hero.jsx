import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'
import { Button, Reveal, SplitText, Marquee, Counter, Magnetic } from '../components/primitives'
import { STYLE_COUNT } from '../data/styles'
import { PALETTE_COUNT } from '../data/palettes'
import { FONT_COUNT } from '../data/fonts'
import { EASE } from '../motion/variants'

const CLIENTS = ['Meridian', 'Kaya Labs', 'Northbound', 'Orbit&Co', 'Vellum', 'Studio Ferro', 'Halcyon', 'Praxis']

export default function Hero() {
  const { style, palette, font } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <section id="top" ref={ref} className="relative z-10 min-h-[100svh] flex flex-col justify-center pt-28 pb-14 px-[clamp(1.1rem,5vw,5rem)] overflow-hidden">
      <motion.div style={{ y, opacity, scale }} className="nu-wrap w-full">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2.5 mb-7">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em]"
              style={{
                fontFamily: 'var(--f-display)', fontWeight: 600,
                borderRadius: 'var(--r-sm)',
                border: 'var(--bw) var(--bs) var(--c-border)',
                background: 'color-mix(in oklab, var(--c-surface) calc(var(--surface-a) * 100%), transparent)',
                backdropFilter: 'blur(var(--blur))',
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: 'var(--c-accent)' }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--c-accent)' }} />
              </span>
              Taking on 3 projects · Q4 2026
            </span>
            <span className="text-[0.72rem]" style={{ color: 'var(--c-muted)' }}>
              Currently rendering in <b style={{ color: 'var(--c-text)' }}>{style.name}</b>
            </span>
          </div>
        </Reveal>

        <h1 className="nu-display nu-h1 mb-7" style={{ maxWidth: '16ch' }}>
          <SplitText text="Design that" by="word" />
          <br />
          <span className="relative inline-block">
            <SplitText text="changes" by="word" delay={0.18} />
            <motion.svg
              className="absolute -bottom-1 left-0 w-full pointer-events-none"
              height="16" viewBox="0 0 300 16" fill="none" preserveAspectRatio="none"
              initial={{ pathLength: 0 }}
            >
              <motion.path
                d="M2 11C48 4 120 3 180 7c40 2.6 80 5 118 1"
                stroke="var(--c-accent)" strokeWidth="3.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE.out, delay: 1 }}
              />
            </motion.svg>
          </span>{' '}
          <SplitText text="shape." by="word" delay={0.32} />
        </h1>

        <Reveal delay={0.45}>
          <p className="nu-lead mb-9" style={{ color: 'var(--c-muted)', maxWidth: '52ch' }}>
            Nu.ance Studios builds websites with a point of view. This page is the proof —
            every style, palette and typeface below is live. Change it and watch the whole
            thing re-author itself without a single reload.
          </p>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="flex flex-wrap items-center gap-3 mb-14">
            <Button as="a" href="#contact" variant="solid" size="lg" magnetic>
              Start a project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Button>
            <Button as="a" href="#showcase" variant="outline" size="lg">
              See the range
            </Button>
          </div>
        </Reveal>

        {/* Live stat bar */}
        <Reveal delay={0.65}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden"
            style={{ background: 'var(--c-border)', border: 'var(--bw) var(--bs) var(--c-border)', borderRadius: 'var(--r)' }}
          >
            {[
              { n: STYLE_COUNT, s: '', l: 'Design styles', d: style.name },
              { n: PALETTE_COUNT, s: '', l: 'Colour palettes', d: palette.name },
              { n: FONT_COUNT, s: '', l: 'Font pairings', d: `${font.displayName} / ${font.bodyName}` },
              { n: 100, s: '+', l: 'React components', d: 'Production-ready' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: 'var(--c-surface-2)' }}
                className="px-5 py-5"
                style={{ background: 'var(--c-surface)' }}
              >
                <div className="nu-display tabular-nums mb-1" style={{ fontSize: 'clamp(1.7rem,3.4vw,2.6rem)', lineHeight: 1 }}>
                  <Counter to={stat.n} suffix={stat.s} />
                </div>
                <div className="text-[0.72rem] uppercase tracking-[0.13em] mb-1.5" style={{ color: 'var(--c-muted)', fontFamily: 'var(--f-display)', fontWeight: 600 }}>
                  {stat.l}
                </div>
                <div className="text-[0.7rem] truncate" style={{ color: 'var(--c-accent)' }}>{stat.d}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </motion.div>

      {/* client marquee */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-0 inset-x-0 py-4"
        style={{ borderTop: 'var(--bw) var(--bs) var(--c-border)', background: 'color-mix(in oklab, var(--c-surface) 50%, transparent)', backdropFilter: 'blur(8px)' }}
      >
        <Marquee items={CLIENTS} duration={40} separator="✳" />
      </motion.div>
    </section>
  )
}
