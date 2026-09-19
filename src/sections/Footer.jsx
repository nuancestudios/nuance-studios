import { motion } from 'framer-motion'
import { Marquee, Reveal, Button } from '../components/primitives'
import { useTheme } from '../theme/ThemeProvider'

const EMAIL = 'creatorexchange.in@gmail.com'

const COLS = [
  ['Studio', [
    { label: 'About', href: '#why' },
    { label: 'Process', href: '#process' },
  ]],
  ['Services', [
    { label: 'Design systems', href: '#services' },
    { label: 'Websites', href: '#services' },
    { label: 'Motion', href: '#services' },
    { label: 'Analytics', href: '#services' },
  ]],
  ['Connect', [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Email', href: `mailto:${EMAIL}` },
  ]],
]

export default function Footer() {
  const { random, style } = useTheme()
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10" style={{ borderTop: 'var(--bw) var(--bs) var(--c-border)' }}>
      <div className="py-7" style={{ borderBottom: 'var(--bw) var(--bs) var(--c-border)', background: 'color-mix(in oklab, var(--c-surface) 40%, transparent)' }}>
        <Marquee items={['Design systems', 'Framer Motion', 'React', 'Brand', 'Performance Analytics', 'Nu.ance Studios']} duration={38} separator="✳" />
      </div>

      <div className="nu-wrap px-[clamp(1.1rem,5vw,5rem)] py-16">
        <div className="grid md:grid-cols-[1.4fr_repeat(3,1fr)] gap-10 md:gap-8 mb-14">
          <div>
            <div className="flex items-baseline gap-0.5 mb-4">
              <span className="nu-display" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Nu</span>
              <motion.span
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--c-accent)', marginInline: 2, display: 'inline-block' }}
              />
              <span className="nu-display" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>ance</span>
            </div>
            <p className="text-[0.88rem] mb-6" style={{ color: 'var(--c-muted)', maxWidth: '34ch' }}>
              A design and engineering studio for brands that would rather be specific than safe.
              Bengaluru, working worldwide.
            </p>
            <Button variant="outline" size="sm" onClick={random}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>
              Re-skin this page
            </Button>
          </div>

          {COLS.map(([head, links]) => (
            <div key={head}>
              <div className="nu-eyebrow mb-4">{head}</div>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="nu-underline text-[0.88rem] inline-block transition-colors"
                      style={{ color: 'var(--c-muted)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-muted)')}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* oversized wordmark */}
        <Reveal>
          <div className="overflow-hidden mb-10 select-none" aria-hidden>
            <motion.div
              className="nu-display leading-[0.78] whitespace-nowrap"
              style={{
                fontSize: 'clamp(3.5rem, 17vw, 16rem)',
                letterSpacing: '-0.05em',
                color: 'transparent',
                WebkitTextStroke: '1px var(--c-border)',
              }}
              whileHover={{ color: 'var(--c-accent)', WebkitTextStroke: '1px var(--c-accent)' }}
              transition={{ duration: 0.5 }}
            >
              NU.ANCE
            </motion.div>
          </div>
        </Reveal>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7" style={{ borderTop: 'var(--bw) var(--bs) var(--c-border)' }}>
          <p className="text-[0.76rem]" style={{ color: 'var(--c-muted)' }}>
            © {year} Nu.ance Studios.
          </p>
          <p className="text-[0.76rem]" style={{ color: 'var(--c-muted)' }}>
            Rendered in <b style={{ color: 'var(--c-accent)' }}>{style.name}</b> · {style.era}
          </p>
        </div>
      </div>
    </footer>
  )
}
