import { useState, useMemo, useDeferredValue } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'
import { STYLES, STYLE_GROUPS } from '../data/styles'
import { PALETTES, PALETTE_FAMILIES } from '../data/palettes'
import { FONT_PAIRS, FONT_CATEGORIES } from '../data/fonts'
import { Button, cx } from './primitives'
import { EASE } from '../motion/variants'

const TABS = [
  { id: 'style', label: 'Styles', count: STYLES.length },
  { id: 'palette', label: 'Palettes', count: PALETTES.length },
  { id: 'font', label: 'Type', count: FONT_PAIRS.length },
]

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] transition-colors"
      style={{
        fontFamily: 'var(--f-display)',
        borderRadius: 'var(--r-sm)',
        border: 'var(--bw) solid ' + (active ? 'var(--c-accent)' : 'var(--c-border)'),
        background: active ? 'var(--c-accent)' : 'transparent',
        color: active ? 'var(--c-on-accent)' : 'var(--c-muted)',
      }}
    >
      {children}
    </button>
  )
}

export default function ControlPanel() {
  const { styleId, paletteId, fontId, setStyle, setPalette, setFont, random, style, palette, font } = useTheme()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('style')
  const [q, setQ] = useState('')
  const [group, setGroup] = useState('All')
  const dq = useDeferredValue(q)

  const styles = useMemo(() => {
    const t = dq.toLowerCase()
    return STYLES.filter(
      (s) => (group === 'All' || s.group === group) &&
        (!t || s.name.toLowerCase().includes(t) || s.blurb.toLowerCase().includes(t) || s.group.toLowerCase().includes(t))
    )
  }, [dq, group])

  const palettes = useMemo(() => {
    const t = dq.toLowerCase()
    return PALETTES.filter(
      (p) => (group === 'All' || p.family === group) &&
        (!t || p.name.toLowerCase().includes(t))
    )
  }, [dq, group])

  const fonts = useMemo(() => {
    const t = dq.toLowerCase()
    return FONT_PAIRS.filter(
      (f) => (group === 'All' || f.category === group) &&
        (!t || f.displayName.toLowerCase().includes(t) || f.bodyName.toLowerCase().includes(t))
    )
  }, [dq, group])

  const groups = tab === 'style' ? STYLE_GROUPS : tab === 'palette' ? PALETTE_FAMILIES : FONT_CATEGORIES

  const switchTab = (id) => { setTab(id); setGroup('All'); setQ('') }

  return (
    <>
      {/* ── Launcher ─────────────────────────────────────── */}
      <div className="fixed z-[70] bottom-5 right-5 flex flex-col items-end gap-2.5">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.35, ease: EASE.out }}
              className="flex items-center gap-2"
            >
              <motion.button
                onClick={random}
                whileHover={{ rotate: 180, scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                title="Randomise everything"
                className="grid place-items-center"
                style={{
                  width: 46, height: 46, borderRadius: 'var(--r)',
                  background: 'var(--c-surface)', border: 'var(--bw) solid var(--c-border)',
                  color: 'var(--c-text)', boxShadow: 'var(--sh-lg)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                </svg>
              </motion.button>

              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center gap-2.5 pl-4 pr-5 h-[46px]"
                style={{
                  borderRadius: 'var(--r)',
                  background: 'var(--c-text)', color: 'var(--c-bg)',
                  boxShadow: 'var(--sh-lg)', fontFamily: 'var(--f-display)',
                  fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.02em',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: 'var(--c-accent)' }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--c-accent)' }} />
                </span>
                Design Studio
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[75]"
              style={{ background: 'color-mix(in oklab, var(--c-text) 28%, transparent)', backdropFilter: 'blur(3px)' }}
            />
            <motion.aside
              initial={{ x: '102%' }}
              animate={{ x: 0 }}
              exit={{ x: '102%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
              className="fixed z-[80] top-0 right-0 h-full w-full sm:w-[440px] flex flex-col"
              style={{
                background: 'var(--c-bg)',
                borderLeft: '1px solid var(--c-border)',
                boxShadow: '-30px 0 80px -30px color-mix(in oklab, var(--c-text) 40%, transparent)',
              }}
            >
              {/* header */}
              <div className="px-5 pt-5 pb-3" style={{ borderBottom: '1px solid var(--c-border)' }}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="nu-eyebrow mb-1">Live Design Studio</div>
                    <h3 className="nu-display" style={{ fontSize: '1.4rem', lineHeight: 1.1 }}>
                      Re-skin this site
                    </h3>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="grid place-items-center shrink-0 transition-colors hover:opacity-60"
                    style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', border: '1px solid var(--c-border)' }}
                    aria-label="Close"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </button>
                </div>

                {/* current combo readout */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] mb-4" style={{ color: 'var(--c-muted)' }}>
                  <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>{style.name}</span>
                  <span>·</span>
                  <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>{palette.name}</span>
                  <span>·</span>
                  <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>{font.displayName}/{font.bodyName}</span>
                </div>

                {/* tabs */}
                <div className="flex gap-1 p-1" style={{ background: 'var(--c-surface-2)', borderRadius: 'var(--r-sm)' }}>
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => switchTab(t.id)}
                      className="relative flex-1 py-2 text-[0.75rem] font-semibold"
                      style={{ fontFamily: 'var(--f-display)', color: tab === t.id ? 'var(--c-on-accent)' : 'var(--c-muted)', zIndex: 1 }}
                    >
                      {tab === t.id && (
                        <motion.span
                          layoutId="nu-tab"
                          className="absolute inset-0"
                          style={{ background: 'var(--c-accent)', borderRadius: 'calc(var(--r-sm) - 2px)', zIndex: -1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      {t.label} <span className="opacity-60">{t.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* filters */}
              <div className="px-5 py-3 space-y-2.5" style={{ borderBottom: '1px solid var(--c-border)' }}>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={`Search ${tab === 'style' ? 'styles' : tab === 'palette' ? 'palettes' : 'pairings'}…`}
                  className="w-full px-3 py-2 text-[0.82rem] outline-none"
                  style={{
                    background: 'var(--c-surface-2)', color: 'var(--c-text)',
                    border: '1px solid var(--c-border)', borderRadius: 'var(--r-sm)',
                    fontFamily: 'var(--f-body)',
                  }}
                />
                <div className="flex flex-wrap gap-1.5">
                  <Chip active={group === 'All'} onClick={() => setGroup('All')}>All</Chip>
                  {groups.map((g) => (
                    <Chip key={g} active={group === g} onClick={() => setGroup(g)}>{g}</Chip>
                  ))}
                </div>
              </div>

              {/* list */}
              <div className="nu-scroll flex-1 px-5 py-4">
                {tab === 'style' && (
                  <div className="space-y-2">
                    {styles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className="w-full text-left p-3 transition-colors"
                        style={{
                          borderRadius: 'var(--r-sm)',
                          border: '1px solid ' + (styleId === s.id ? 'var(--c-accent)' : 'var(--c-border)'),
                          background: styleId === s.id ? 'color-mix(in oklab, var(--c-accent) 10%, transparent)' : 'transparent',
                        }}
                      >
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className="nu-display text-[0.95rem]" style={{ fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}>{s.name}</span>
                          <span className="text-[0.62rem] tabular-nums shrink-0" style={{ color: 'var(--c-muted)' }}>{s.era}</span>
                        </div>
                        <p className="text-[0.76rem] leading-snug" style={{ color: 'var(--c-muted)' }}>{s.blurb}</p>
                      </button>
                    ))}
                    {!styles.length && <Empty />}
                  </div>
                )}

                {tab === 'palette' && (
                  <div className="grid grid-cols-2 gap-2">
                    {palettes.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPalette(p.id)}
                        className="text-left p-2.5 transition-transform hover:scale-[1.02]"
                        style={{
                          borderRadius: 'var(--r-sm)',
                          border: '1px solid ' + (paletteId === p.id ? 'var(--c-accent)' : 'var(--c-border)'),
                          background: p.colors.bg,
                        }}
                      >
                        <div className="flex gap-1 mb-2">
                          {[p.colors.accent, p.colors.accent2, p.colors.text, p.colors.surface2].map((c, i) => (
                            <span key={i} className="nu-swatch" style={{ background: c, border: '1px solid ' + p.colors.border }} />
                          ))}
                        </div>
                        <div className="text-[0.72rem] font-semibold leading-tight" style={{ color: p.colors.text }}>{p.name}</div>
                        <div className="text-[0.6rem] uppercase tracking-wider" style={{ color: p.colors.muted }}>{p.mode}</div>
                      </button>
                    ))}
                    {!palettes.length && <div className="col-span-2"><Empty /></div>}
                  </div>
                )}

                {tab === 'font' && (
                  <div className="space-y-2">
                    {fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFont(f.id)}
                        className="w-full text-left p-3 transition-colors"
                        style={{
                          borderRadius: 'var(--r-sm)',
                          border: '1px solid ' + (fontId === f.id ? 'var(--c-accent)' : 'var(--c-border)'),
                          background: fontId === f.id ? 'color-mix(in oklab, var(--c-accent) 10%, transparent)' : 'transparent',
                        }}
                      >
                        <div style={{ fontFamily: f.display, fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.15, marginBottom: 2 }}>
                          {f.displayName}
                        </div>
                        <div style={{ fontFamily: f.body, fontSize: '0.78rem', color: 'var(--c-muted)' }}>
                          {f.bodyName} · {f.note}
                        </div>
                      </button>
                    ))}
                    {!fonts.length && <Empty />}
                  </div>
                )}
              </div>

              {/* footer */}
              <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderTop: '1px solid var(--c-border)' }}>
                <Button variant="outline" size="sm" className="flex-1" onClick={random}>Surprise me</Button>
                <Button variant="solid" size="sm" className="flex-1" onClick={() => setOpen(false)}>Done</Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function Empty() {
  return (
    <div className="py-10 text-center text-[0.82rem]" style={{ color: 'var(--c-muted)' }}>
      Nothing matches that. Try a broader term.
    </div>
  )
}
