/**
 * Nu.ance — Motion Grammar
 * Each design style declares a `reveal` and `hover` personality. These maps
 * translate that into Framer Motion variants, so the exact same <Reveal>
 * component behaves like a Swiss clip-wipe under one style and a brutalist
 * pop under another.
 */

export const EASE = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.76, 0, 0.24, 1],
  snap: [0.16, 1, 0.3, 1],
  back: [0.34, 1.56, 0.64, 1],
}

export const REVEALS = {
  none: {
    hidden: { opacity: 1 },
    show: { opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  'fade-up': {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0 },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 54 },
    show: { opacity: 1, y: 0 },
  },
  'slide-side': {
    hidden: { opacity: 0, x: -48 },
    show: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.82, y: 18 },
    show: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: 'spring', stiffness: 420, damping: 18 },
    },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(14px)', y: 20 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  'clip-up': {
    hidden: { opacity: 1, clipPath: 'inset(100% 0 0 0)', y: 8 },
    show: { opacity: 1, clipPath: 'inset(0% 0 0 0)', y: 0 },
  },
  'depth-in': {
    hidden: { opacity: 0, scale: 0.88, rotateX: 14, z: -120 },
    show: { opacity: 1, scale: 1, rotateX: 0, z: 0 },
  },
  'glitch-in': {
    hidden: { opacity: 0, x: -8, skewX: 8 },
    show: {
      opacity: 1, x: 0, skewX: 0,
      transition: { duration: 0.28, ease: 'steps(4)' },
    },
  },
  'draw-in': {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    show: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
  },
  'type-in': {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    show: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.5, ease: 'linear' } },
  },
  parallax: {
    hidden: { opacity: 0, y: 90, scale: 1.04 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  'stagger-grid': {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  'stagger-cols': {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  },
  'char-stagger': {
    hidden: { opacity: 0, y: 40, rotateX: -60 },
    show: { opacity: 1, y: 0, rotateX: 0 },
  },
}

export const getReveal = (key) => REVEALS[key] || REVEALS['fade-up']

/* ── Hover personalities ──────────────────────────────────────────── */
export const HOVERS = {
  lift: { y: -5, boxShadow: 'var(--sh-lg)' },
  fade: { opacity: 0.62 },
  press: { scale: 0.975 },
  shove: { x: -4, y: -4, boxShadow: '10px 10px 0 var(--c-text)' },
  squish: { scaleX: 1.04, scaleY: 0.94 },
  wobble: { rotate: -2.5, scale: 1.04 },
  rotate: { rotate: 4, scale: 1.02 },
  skew: { skewX: -5, x: 3 },
  zoom: { scale: 1.045 },
  glow: { boxShadow: 'var(--sh-lg)', y: -3 },
  shine: { scale: 1.015 },
  shimmer: { scale: 1.015 },
  invert: {},
  outline: {},
  fill: {},
  underline: {},
  highlight: {},
  glitch: {},
  morph: { borderRadius: '40% 60% 65% 35% / 55% 40% 60% 45%', scale: 1.03 },
  float3d: { y: -8, rotateX: 5, rotateY: -5, scale: 1.02 },
  marquee: { letterSpacing: '0.03em' },
  typeblink: {},
}

export const getHover = (key) => HOVERS[key] || HOVERS.lift

export const TAPS = {
  shove: { x: 0, y: 0, boxShadow: '0 0 0 var(--c-text)' },
  press: { scale: 0.95 },
  squish: { scaleX: 0.96, scaleY: 1.04 },
  default: { scale: 0.97 },
}
export const getTap = (key) => TAPS[key] || TAPS.default

/** Container that staggers its children. */
export const stagger = (amount = 0.07, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: delay } },
})
