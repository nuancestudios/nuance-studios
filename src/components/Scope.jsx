/**
 * Scope — applies a style + palette + font to a subtree instead of the
 * whole document. This is what lets five different design languages sit
 * side by side on one page without fighting each other.
 */
import { useMemo } from 'react'
import { getStyle } from '../data/styles'
import { getPalette } from '../data/palettes'
import { getFontPair } from '../data/fonts'

export function buildVars(styleId, paletteId, fontId) {
  const t = getStyle(styleId).tokens
  const c = getPalette(paletteId).colors
  const f = getFontPair(fontId)
  return {
    '--c-bg': c.bg,
    '--c-surface': c.surface,
    '--c-surface-2': c.surface2,
    '--c-text': c.text,
    '--c-muted': c.muted,
    '--c-border': c.border,
    '--c-accent': c.accent,
    '--c-accent-2': c.accent2,
    '--c-on-accent': c.onAccent,
    '--c-glow': c.glow,
    '--f-display': f.display,
    '--f-body': f.body,
    '--r': t.radius,
    '--r-sm': t.radiusSm,
    '--r-lg': t.radiusLg,
    '--bw': t.border,
    '--bs': t.borderStyle,
    '--sh': t.shadow,
    '--sh-lg': t.shadowLg,
    '--fw-display': String(t.displayWeight),
    '--fw-body': String(t.bodyWeight),
    '--tr-display': t.displayTracking,
    '--lh-display': t.displayLeading,
    '--lh-body': t.bodyLeading,
    '--tt': t.caseTransform,
    '--scale': String(t.scale),
    '--density': String(t.density),
    '--surface-a': String(t.surfaceAlpha),
    '--blur': t.blur,
    '--grain': String(t.grain),
  }
}

export default function Scope({ styleId, paletteId, fontId, children, className = '', style, as: Tag = 'div', ...rest }) {
  const vars = useMemo(() => buildVars(styleId, paletteId, fontId), [styleId, paletteId, fontId])
  return (
    <Tag
      className={className}
      style={{
        ...vars,
        background: 'var(--c-bg)',
        color: 'var(--c-text)',
        fontFamily: 'var(--f-body)',
        fontWeight: 'var(--fw-body)',
        lineHeight: 'var(--lh-body)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
