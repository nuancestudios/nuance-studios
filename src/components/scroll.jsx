/**
 * Nu.ance — Scroll Motion Kit
 * Scroll-linked (not just scroll-triggered) motion. The difference matters:
 * triggered animations fire once and stop; linked animations are driven by
 * scroll position every frame, so the page feels physically connected to the
 * wheel. That is what separates a designed site from an animated one.
 */
import { useRef, Children } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'
import { EASE } from '../motion/variants'

const cx = (...a) => a.filter(Boolean).join(' ')

/* ═══════════════════════════════════════════════════════════════
   Parallax — element drifts at a different rate than the page
   ═══════════════════════════════════════════════════════════════ */
export function Parallax({ children, speed = 0.25, className = '', style }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [speed * 160, speed * -160])
  const y = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.4 })
  if (reduced) return <div className={className} style={style}>{children}</div>
  return <motion.div ref={ref} className={className} style={{ y, ...style }}>{children}</motion.div>
}

/* ═══════════════════════════════════════════════════════════════
   ScrollScale — grows/settles as it enters the viewport
   ═══════════════════════════════════════════════════════════════ */
export function ScrollScale({ children, className = '', from = 0.88, blur = true }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.45'] })
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const blurPx = useTransform(scrollYProgress, [0, 1], [10, 0])
  const filter = useMotionTemplate`blur(${blurPx}px)`
  const s = useSpring(scale, { stiffness: 160, damping: 28 })
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div ref={ref} className={className} style={{ scale: s, opacity, filter: blur ? filter : undefined }}>
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LineReveal — headline wipes up line by line, mask-style
   ═══════════════════════════════════════════════════════════════ */
export function LineReveal({ lines, className = '', style, stagger = 0.11 }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.42'] })
  if (reduced) {
    return <span ref={ref} className={className} style={style}>{lines.join(' ')}</span>
  }
  return (
    <span ref={ref} className={cx('block', className)} style={style}>
      {lines.map((ln, i) => (
        <Line key={i} progress={scrollYProgress} index={i} stagger={stagger}>{ln}</Line>
      ))}
    </span>
  )
}

function Line({ children, progress, index, stagger }) {
  const start = index * stagger
  const y = useTransform(progress, [start, start + 0.55], ['110%', '0%'])
  const o = useTransform(progress, [start, start + 0.4], [0, 1])
  return (
    <span className="block overflow-hidden">
      <motion.span className="block" style={{ y, opacity: o }}>{children}</motion.span>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   WordFade — body copy where each word lights up as you scroll.
   The "reading" effect. Used sparingly it's the most premium
   motion on a page.
   ═══════════════════════════════════════════════════════════════ */
export function WordFade({ text, className = '', style }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = text.split(' ')
  if (reduced) return <p ref={ref} className={className} style={style}>{text}</p>
  return (
    <p ref={ref} className={cx('flex flex-wrap', className)} style={style}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1.6) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <span className="relative mr-[0.32em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   StickyStack — cards stack and scale under a sticky header.
   The single most "expensive-looking" scroll pattern in 2026.
   ═══════════════════════════════════════════════════════════════ */
export function StickyCard({ children, index, total, className = '' }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.2', 'end 0.1'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9 + index * 0.012])
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.35])
  if (reduced) return <div className={className}>{children}</div>
  return (
    <div ref={ref} className="sticky" style={{ top: `calc(7rem + ${index * 14}px)` }}>
      <motion.div className={className} style={{ scale, opacity, transformOrigin: 'top center' }}>
        {children}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   DrawLine — an SVG rule that draws itself along scroll
   ═══════════════════════════════════════════════════════════════ */
export function DrawLine({ className = '', vertical = false }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.3'] })
  const s = useSpring(scrollYProgress, { stiffness: 180, damping: 30 })
  if (reduced) return <div ref={ref} className={className} style={{ background: 'var(--c-border)' }} />
  return (
    <div ref={ref} className={className} style={{ background: 'color-mix(in oklab, var(--c-border) 45%, transparent)', overflow: 'hidden' }}>
      <motion.div
        style={{
          [vertical ? 'scaleY' : 'scaleX']: s,
          transformOrigin: vertical ? 'top' : 'left',
          width: '100%', height: '100%', background: 'var(--c-accent)',
        }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CountUp — scroll-linked number (not time-linked)
   ═══════════════════════════════════════════════════════════════ */
export function ScrollCount({ to, suffix = '', className = '' }) {
  const ref = useRef(null)
  const { reduced } = useTheme()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.5'] })
  const v = useTransform(scrollYProgress, [0, 1], [0, to])
  const rounded = useTransform(v, (n) => Math.round(n).toLocaleString())
  if (reduced) return <span ref={ref} className={className}>{to}{suffix}</span>
  return (
    <span ref={ref} className={cx('tabular-nums', className)}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HoverReveal — row that slides + reveals an accent bar on hover.
   Used for list-style navigation and service rows.
   ═══════════════════════════════════════════════════════════════ */
export function HoverRow({ children, className = '', onClick }) {
  const { reduced } = useTheme()
  return (
    <motion.div
      onClick={onClick}
      className={cx('group relative overflow-hidden', className)}
      whileHover={reduced ? undefined : { x: 10 }}
      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
    >
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 bottom-0"
        style={{ width: 2, background: 'var(--c-accent)', transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        whileInView={undefined}
        variants={{}}
      />
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MarqueeScroll — ticker whose direction/speed follows scroll velocity
   ═══════════════════════════════════════════════════════════════ */
export function VelocityMarquee({ items, baseSpeed = 40, className = '', separator = '—' }) {
  const { reduced } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], [0, -baseSpeed * 8])
  const sx = useSpring(x, { stiffness: 90, damping: 28, mass: 0.6 })
  const doubled = [...items, ...items, ...items]
  if (reduced) {
    return (
      <div className={cx('overflow-hidden', className)}>
        <div className="flex gap-6 px-6">{items.map((i) => <span key={i}>{i}</span>)}</div>
      </div>
    )
  }
  return (
    <div ref={ref} className={cx('overflow-hidden', className)}>
      <motion.div className="flex w-max" style={{ x: sx }}>
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="nu-display px-6" style={{ fontSize: 'clamp(1.1rem,2vw,1.9rem)' }}>{it}</span>
            <span style={{ color: 'var(--c-accent)' }}>{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SectionProgress — thin rule that fills as a section is read
   ═══════════════════════════════════════════════════════════════ */
export function SectionProgress({ targetRef }) {
  const { reduced } = useTheme()
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 0.8', 'end 0.4'] })
  const s = useSpring(scrollYProgress, { stiffness: 200, damping: 34 })
  if (reduced) return null
  return (
    <motion.div
      className="origin-left"
      style={{ scaleX: s, height: 1, background: 'var(--c-accent)', marginBottom: '2.5rem' }}
    />
  )
}
