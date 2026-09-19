import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'
import { Button, Magnetic, cx } from '../components/primitives'
import { EASE } from '../motion/variants'

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Us' },
  { href: '#process', label: 'Process' },
  { href: '#playground', label: 'Design Playground' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const { style } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const barW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-[60]"
        style={{
          background: scrolled ? 'color-mix(in oklab, var(--c-bg) 82%, transparent)' : 'transparent',
          borderBottom: scrolled ? 'var(--bw) var(--bs) var(--c-border)' : 'var(--bw) solid transparent',
          backdropFilter: scrolled ? 'blur(18px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.6)' : 'none',
          transition: 'background-color .4s, border-color .4s, backdrop-filter .4s',
        }}
      >
        <div className="nu-wrap flex items-center justify-between gap-4 px-[clamp(1.1rem,5vw,5rem)] py-3.5">
          <a href="#top" className="flex items-baseline gap-0.5 shrink-0 group">
            <span className="nu-display" style={{ fontSize: '1.18rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Nu
            </span>
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
              style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--c-accent)', marginInline: 2 }}
            />
            <span className="nu-display" style={{ fontSize: '1.18rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              ance
            </span>
            <span className="nu-display hidden sm:inline ml-1.5 text-[0.62rem] tracking-[0.2em] uppercase" style={{ color: 'var(--c-muted)', fontWeight: 500 }}>
              Studios
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <Magnetic key={l.href} strength={0.18}>
                <a
                  href={l.href}
                  className="nu-underline relative px-2.5 lg:px-3.5 py-2 text-[0.84rem] transition-opacity hover:opacity-100"
                  style={{ fontFamily: 'var(--f-display)', fontWeight: 500, color: 'var(--c-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-muted)')}
                >
                  {l.label}
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button as="a" href="#contact" variant="outline" size="sm" magnetic>
                Get in touch
              </Button>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid place-items-center"
              style={{ width: 38, height: 38, borderRadius: 'var(--r-sm)', border: 'var(--bw) solid var(--c-border)' }}
              aria-label="Menu"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 7h18M3 12h18M3 17h18" /></>}
              </svg>
            </button>
          </div>
        </div>

        <motion.div style={{ width: barW, height: 2, background: 'var(--c-accent)', transformOrigin: 'left' }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: EASE.out }}
            className="fixed top-[62px] inset-x-0 z-[59] md:hidden px-4"
          >
            <div className="nu-surface p-3 flex flex-col" style={{ background: 'var(--c-bg)' }}>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-3 text-[0.95rem]"
                  style={{ fontFamily: 'var(--f-display)', fontWeight: 500, borderBottom: i < LINKS.length - 1 ? '1px solid var(--c-border)' : 'none' }}
                >
                  {l.label}
                </motion.a>
              ))}
              <Button as="a" href="#contact" variant="outline" size="sm" className="mt-3" onClick={() => setOpen(false)}>
                Get in touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
