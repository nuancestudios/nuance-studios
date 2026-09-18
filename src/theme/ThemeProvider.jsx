import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { STYLES, getStyle } from '../data/styles'
import { PALETTES, getPalette } from '../data/palettes'
import { FONT_PAIRS, getFontPair, ALL_FAMILIES } from '../data/fonts'

const ThemeCtx = createContext(null)
export const useTheme = () => useContext(ThemeCtx)

/* ── Google Fonts: request every family once, with the weights we actually use ── */
const GF_HREF = (() => {
  const families = ALL_FAMILIES.filter(
    (f) => !/^(Geist|Geist Mono|General Sans|Satoshi)$/.test(f) // not on Google Fonts
  )
  const params = families
    .map((f) => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800;900`)
    .join('&')
  return `https://fonts.googleapis.com/css2?${params}&display=swap`
})()

function useFontLoader() {
  useEffect(() => {
    const pre1 = document.createElement('link')
    pre1.rel = 'preconnect'
    pre1.href = 'https://fonts.googleapis.com'
    const pre2 = document.createElement('link')
    pre2.rel = 'preconnect'
    pre2.href = 'https://fonts.gstatic.com'
    pre2.crossOrigin = 'anonymous'
    document.head.append(pre1, pre2)

    // Google caps URL length; split the request into manageable chunks.
    const families = ALL_FAMILIES.filter(
      (f) => !/^(Geist|Geist Mono|General Sans|Satoshi)$/.test(f)
    )
    const chunks = []
    for (let i = 0; i < families.length; i += 12) chunks.push(families.slice(i, i + 12))
    const links = chunks.map((chunk) => {
      const l = document.createElement('link')
      l.rel = 'stylesheet'
      l.href = `https://fonts.googleapis.com/css2?${chunk
        .map((f) => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800;900`)
        .join('&')}&display=swap`
      document.head.appendChild(l)
      return l
    })
    return () => links.forEach((l) => l.remove())
  }, [])
}

const read = (k, fallback) => {
  try {
    return localStorage.getItem(k) || fallback
  } catch {
    return fallback
  }
}

export function ThemeProvider({ children }) {
  useFontLoader()

  const [styleId, setStyleId] = useState(() => read('nu.style', 'monochrome-lux'))
  const [paletteId, setPaletteId] = useState(() => read('nu.palette', 'ink-void'))
  const [fontId, setFontId] = useState(() =>
    read('nu.font', 'instrument-serif--geist')
  )
  const [reduced, setReduced] = useState(false)

  const style = useMemo(() => getStyle(styleId), [styleId])
  const palette = useMemo(() => getPalette(paletteId), [paletteId])
  const font = useMemo(() => getFontPair(fontId), [fontId])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  /* ── Write every token to :root as a CSS custom property ── */
  useEffect(() => {
    const r = document.documentElement.style
    const c = palette.colors
    const t = style.tokens

    r.setProperty('--c-bg', c.bg)
    r.setProperty('--c-surface', c.surface)
    r.setProperty('--c-surface-2', c.surface2)
    r.setProperty('--c-text', c.text)
    r.setProperty('--c-muted', c.muted)
    r.setProperty('--c-border', c.border)
    r.setProperty('--c-accent', c.accent)
    r.setProperty('--c-accent-2', c.accent2)
    r.setProperty('--c-on-accent', c.onAccent)
    r.setProperty('--c-glow', c.glow)

    r.setProperty('--f-display', font.display)
    r.setProperty('--f-body', font.body)

    r.setProperty('--r', t.radius)
    r.setProperty('--r-sm', t.radiusSm)
    r.setProperty('--r-lg', t.radiusLg)
    r.setProperty('--bw', t.border)
    r.setProperty('--bs', t.borderStyle)
    r.setProperty('--sh', t.shadow)
    r.setProperty('--sh-lg', t.shadowLg)
    r.setProperty('--fw-display', String(t.displayWeight))
    r.setProperty('--fw-body', String(t.bodyWeight))
    r.setProperty('--tr-display', t.displayTracking)
    r.setProperty('--lh-display', t.displayLeading)
    r.setProperty('--lh-body', t.bodyLeading)
    r.setProperty('--tt', t.caseTransform)
    r.setProperty('--scale', String(t.scale))
    r.setProperty('--density', String(t.density))
    r.setProperty('--surface-a', String(t.surfaceAlpha))
    r.setProperty('--blur', t.blur)
    r.setProperty('--grain', String(t.grain))

    document.documentElement.dataset.style = style.id
    document.documentElement.dataset.texture = t.texture
    document.documentElement.dataset.mode = palette.mode
    document.body.style.background = c.bg
    document.body.style.color = c.text
  }, [style, palette, font])

  const random = useCallback(() => {
    const s = STYLES[Math.floor(Math.random() * STYLES.length)]
    const p = PALETTES[Math.floor(Math.random() * PALETTES.length)]
    const f = FONT_PAIRS[Math.floor(Math.random() * FONT_PAIRS.length)]
    setStyleId(s.id)
    setPaletteId(p.id)
    setFontId(f.id)
  }, [])

  const setStyle = useCallback((id) => {
    setStyleId(id)
    try { localStorage.setItem('nu.style', id) } catch { /* ignore */ }
  }, [])
  const setPalette = useCallback((id) => {
    setPaletteId(id)
    try { localStorage.setItem('nu.palette', id) } catch { /* ignore */ }
  }, [])
  const setFont = useCallback((id) => {
    setFontId(id)
    try { localStorage.setItem('nu.font', id) } catch { /* ignore */ }
  }, [])

  const value = useMemo(
    () => ({
      style, palette, font, reduced,
      styleId, paletteId, fontId,
      setStyle, setPalette, setFont, random,
      motion: {
        ease: style.tokens.ease,
        duration: reduced ? 0 : style.tokens.duration,
        spring: style.tokens.spring,
        hover: style.tokens.hover,
        reveal: style.tokens.reveal,
      },
    }),
    [style, palette, font, reduced, styleId, paletteId, fontId, setStyle, setPalette, setFont, random]
  )

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export { GF_HREF }
