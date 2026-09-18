import { forwardRef, useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'
import { getReveal, getHover, getTap, stagger, EASE } from '../motion/variants'

const cx = (...a) => a.filter(Boolean).join(' ')

/* ═══════════════════════════════════════════════════════════════
   Reveal — scroll-triggered entrance using the active style's grammar
   ═══════════════════════════════════════════════════════════════ */
export function Reveal({ children, delay = 0, as = 'div', className = '', once = true, amount = 0.25, ...rest }) {
  const { motion: m, reduced } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  const variants = getReveal(m.reveal)
  const MotionTag = motion[as] || motion.div

  if (reduced) {
    const Tag = as
    return <Tag ref={ref} className={className} {...rest}>{children}</Tag>
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={variants}
      transition={{ duration: m.duration, ease: m.ease, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Stagger — reveals children one after another
   ═══════════════════════════════════════════════════════════════ */
export function Stagger({ children, className = '', amount = 0.07, delay = 0, viewAmount = 0.15 }) {
  const { motion: m, reduced } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: viewAmount })
  if (reduced) return <div ref={ref} className={className}>{children}</div>
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={stagger(amount, delay)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', ...rest }) {
  const { motion: m, reduced } = useTheme()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={getReveal(m.reveal)}
      transition={{ duration: m.duration, ease: m.ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SplitText — per-character or per-word kinetic headline
   ═══════════════════════════════════════════════════════════════ */
export function SplitText({ text, className = '', by = 'word', delay = 0, stagger: st = 0.035 }) {
  const { motion: m, reduced } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  if (reduced) return <span ref={ref} className={className}>{text}</span>

  const parts = by === 'char' ? [...text] : text.split(' ')
  return (
    <span ref={ref} className={cx('inline-block', className)} style={{ perspective: 800 }}>
      {parts.map((p, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, rotateX: -55 }}
            animate={inView ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE.out, delay: delay + i * st }}
          >
            {p === ' ' ? '\u00A0' : p}
            {by === 'word' && i < parts.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Magnetic — cursor-attracted wrapper
   ═══════════════════════════════════════════════════════════════ */
export function Magnetic({ children, strength = 0.32, className = '' }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = useCallback((e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }, [reduced, strength, x, y])

  const reset = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={cx('inline-block', className)}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Tilt — 3D pointer tilt for cards
   ═══════════════════════════════════════════════════════════════ */
export function Tilt({ children, className = '', max = 9, glare = true, style }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 220, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 220, damping: 20 })
  const gx = useTransform(mx, (v) => `${v * 100}%`)
  const gy = useTransform(my, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(22rem 22rem at ${gx} ${gy}, color-mix(in oklab, var(--c-glow) 22%, transparent), transparent 70%)`

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  if (reduced) return <div className={className} style={style}>{children}</div>

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cx('relative', className)}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', ...style }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ borderRadius: 'inherit', background: glareBg, opacity: 0.55 }}
        />
      )}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Button — 8 variants, style-aware hover physics
   ═══════════════════════════════════════════════════════════════ */
export const Button = forwardRef(function Button(
  { children, variant = 'solid', size = 'md', as = 'button', className = '', magnetic = false, ...rest },
  ref
) {
  const { motion: m, style } = useTheme()
  const h = style.tokens.hover

  const sizes = {
    sm: 'px-4 py-2 text-[0.8rem]',
    md: 'px-6 py-3 text-[0.9rem]',
    lg: 'px-9 py-4 text-[1rem]',
  }

  const base = {
    fontFamily: 'var(--f-display)',
    fontWeight: 600,
    letterSpacing: h === 'marquee' ? '0.02em' : '0.005em',
    borderRadius: 'var(--r-sm)',
    borderWidth: 'var(--bw)',
    borderStyle: 'var(--bs)',
    textTransform: 'var(--tt)',
    transition: 'background-color .3s, color .3s, border-color .3s, border-radius .45s',
  }

  const variants = {
    solid: { background: 'var(--c-accent)', color: 'var(--c-on-accent)', borderColor: 'var(--c-accent)', boxShadow: 'var(--sh)' },
    outline: { background: 'transparent', color: 'var(--c-text)', borderColor: 'var(--c-text)' },
    ghost: { background: 'transparent', color: 'var(--c-text)', borderColor: 'transparent' },
    soft: { background: 'color-mix(in oklab, var(--c-accent) 14%, transparent)', color: 'var(--c-accent)', borderColor: 'transparent' },
    inverse: { background: 'var(--c-text)', color: 'var(--c-bg)', borderColor: 'var(--c-text)', boxShadow: 'var(--sh)' },
    gradient: {
      background: 'linear-gradient(115deg, var(--c-accent), var(--c-accent-2))',
      color: 'var(--c-on-accent)', borderColor: 'transparent', boxShadow: 'var(--sh)',
    },
    glass: {
      background: 'color-mix(in oklab, var(--c-surface) 45%, transparent)',
      color: 'var(--c-text)', borderColor: 'var(--c-border)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: 'var(--sh)',
    },
    link: { background: 'transparent', color: 'var(--c-accent)', borderColor: 'transparent', padding: 0 },
  }

  const hoverFx = h === 'invert'
    ? { background: 'var(--c-text)', color: 'var(--c-bg)', borderColor: 'var(--c-text)' }
    : h === 'fill'
      ? { background: 'var(--c-accent)', color: 'var(--c-on-accent)', borderColor: 'var(--c-accent)' }
      : h === 'outline'
        ? { boxShadow: '0 0 0 3px color-mix(in oklab, var(--c-accent) 32%, transparent)' }
        : h === 'highlight'
          ? { background: 'color-mix(in oklab, var(--c-accent) 18%, transparent)' }
          : getHover(h)

  const MotionTag = motion[as] || motion.button
  const cls = cx(
    'relative inline-flex items-center justify-center gap-2 select-none cursor-pointer whitespace-nowrap',
    variant !== 'link' && sizes[size],
    h === 'shine' && 'nu-shine',
    h === 'glitch' && 'nu-glitch-hover',
    (h === 'underline' || variant === 'link') && 'nu-underline',
    className
  )

  const el = (
    <MotionTag
      ref={ref}
      className={cls}
      style={{ ...base, ...variants[variant] }}
      whileHover={hoverFx}
      whileTap={getTap(h)}
      transition={{ type: 'spring', ...m.spring }}
      {...rest}
    >
      {children}
    </MotionTag>
  )

  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : el
})

/* ═══════════════════════════════════════════════════════════════
   Card
   ═══════════════════════════════════════════════════════════════ */
export function Card({ children, className = '', interactive = true, tilt = false, padded = true, ...rest }) {
  const { motion: m, style } = useTheme()
  const h = style.tokens.hover
  const hoverFx = interactive
    ? h === 'invert'
      ? { background: 'var(--c-text)', color: 'var(--c-bg)' }
      : h === 'highlight'
        ? { background: 'var(--c-surface-2)' }
        : h === 'fill'
          ? { background: 'color-mix(in oklab, var(--c-accent) 10%, transparent)' }
          : getHover(h)
    : undefined

  const inner = (
    <motion.div
      className={cx('nu-surface', padded && 'p-6 md:p-7', h === 'shine' && 'nu-shine', className)}
      whileHover={hoverFx}
      transition={{ type: 'spring', ...m.spring }}
      {...rest}
    >
      {children}
    </motion.div>
  )
  return tilt ? <Tilt className="nu-3d">{inner}</Tilt> : inner
}

/* ═══════════════════════════════════════════════════════════════
   Badge / Pill
   ═══════════════════════════════════════════════════════════════ */
export function Badge({ children, tone = 'accent', className = '' }) {
  const tones = {
    accent: { background: 'color-mix(in oklab, var(--c-accent) 15%, transparent)', color: 'var(--c-accent)', borderColor: 'color-mix(in oklab, var(--c-accent) 30%, transparent)' },
    neutral: { background: 'var(--c-surface-2)', color: 'var(--c-muted)', borderColor: 'var(--c-border)' },
    solid: { background: 'var(--c-accent)', color: 'var(--c-on-accent)', borderColor: 'var(--c-accent)' },
    outline: { background: 'transparent', color: 'var(--c-text)', borderColor: 'var(--c-border)' },
  }
  return (
    <span
      className={cx('inline-flex items-center gap-1.5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]', className)}
      style={{
        ...tones[tone],
        borderRadius: 'var(--r-sm)',
        borderWidth: 'var(--bw)',
        borderStyle: 'solid',
        fontFamily: 'var(--f-display)',
      }}
    >
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Marquee
   ═══════════════════════════════════════════════════════════════ */
export function Marquee({ items, duration = 34, className = '', separator = '—' }) {
  const doubled = [...items, ...items]
  return (
    <div className={cx('nu-marquee overflow-hidden', className)}>
      <div className="nu-marquee-track" style={{ '--mq-dur': `${duration}s` }}>
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="nu-display px-6" style={{ fontSize: 'clamp(1.1rem,2vw,1.9rem)' }}>{it}</span>
            <span style={{ color: 'var(--c-accent)' }}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Counter — animates a number when scrolled into view
   ═══════════════════════════════════════════════════════════════ */
export function Counter({ to, suffix = '', duration = 1.6, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const { reduced } = useTheme()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) { setVal(to); return }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduced])

  return <span ref={ref} className={className}>{val}{suffix}</span>
}

/* ═══════════════════════════════════════════════════════════════
   Section scaffolding
   ═══════════════════════════════════════════════════════════════ */
export function Section({ id, children, className = '', style }) {
  return (
    <section id={id} className={cx('nu-section relative z-10', className)} style={style}>
      <div className="nu-wrap">{children}</div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, sub, align = 'left', split = false }) {
  return (
    <div className={cx('mb-12 md:mb-16', align === 'center' && 'text-center mx-auto max-w-3xl')}>
      {eyebrow && (
        <Reveal>
          <div className="nu-eyebrow mb-4 flex items-center gap-3" style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
            <span style={{ width: 28, height: 'var(--bw)', background: 'var(--c-accent)', display: 'inline-block' }} />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <h2 className="nu-display nu-h2 mb-4" style={{ maxWidth: align === 'center' ? undefined : '18ch' }}>
        {split ? <SplitText text={title} /> : <Reveal as="span" className="inline-block">{title}</Reveal>}
      </h2>
      {sub && (
        <Reveal delay={0.08}>
          <p className="nu-lead" style={{ color: 'var(--c-muted)', maxWidth: '58ch', marginInline: align === 'center' ? 'auto' : undefined }}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export { cx }
