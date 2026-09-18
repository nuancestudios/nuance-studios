import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, SectionHead, Reveal, Stagger, StaggerItem, Button, Card, Badge, Tilt, Magnetic, Counter, cx } from '../components/primitives'
import { useTheme } from '../theme/ThemeProvider'
import { EASE } from '../motion/variants'

const Label = ({ children, n }) => (
  <div className="flex items-baseline justify-between gap-2 mb-3.5">
    <span className="nu-eyebrow">{children}</span>
    <span className="text-[0.62rem] tabular-nums" style={{ color: 'var(--c-muted)' }}>{n}</span>
  </div>
)

const Bay = ({ title, n, children, className = '' }) => (
  <StaggerItem>
    <div className={cx('nu-surface p-5 h-full', className)}>
      <Label n={n}>{title}</Label>
      {children}
    </div>
  </StaggerItem>
)

/* ── individual demo widgets ─────────────────────────────── */

function ToggleDemo() {
  const [on, setOn] = useState(true)
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setOn((v) => !v)}
        className="relative shrink-0"
        style={{
          width: 52, height: 30, borderRadius: 999,
          background: on ? 'var(--c-accent)' : 'var(--c-surface-2)',
          border: 'var(--bw) var(--bs) var(--c-border)',
          transition: 'background-color .3s',
        }}
        aria-pressed={on}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 520, damping: 32 }}
          style={{
            position: 'absolute', top: 3, left: on ? 25 : 3,
            width: 22, height: 22, borderRadius: 999,
            background: on ? 'var(--c-on-accent)' : 'var(--c-text)',
          }}
        />
      </button>
      <span className="text-[0.82rem]" style={{ color: 'var(--c-muted)' }}>{on ? 'Enabled' : 'Disabled'}</span>
    </div>
  )
}

function TabsDemo() {
  const [t, setT] = useState(0)
  const tabs = ['Overview', 'Specs', 'Files']
  return (
    <div>
      <div className="flex gap-1 p-1 mb-3" style={{ background: 'var(--c-surface-2)', borderRadius: 'var(--r-sm)' }}>
        {tabs.map((label, i) => (
          <button
            key={label}
            onClick={() => setT(i)}
            className="relative flex-1 py-1.5 text-[0.74rem] font-semibold"
            style={{ fontFamily: 'var(--f-display)', color: t === i ? 'var(--c-on-accent)' : 'var(--c-muted)', zIndex: 1 }}
          >
            {t === i && <motion.span layoutId="nu-demo-tab" className="absolute inset-0" style={{ background: 'var(--c-accent)', borderRadius: 'calc(var(--r-sm) - 2px)', zIndex: -1 }} transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
            {label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={t}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-[0.8rem]" style={{ color: 'var(--c-muted)' }}
        >
          {['Layered transitions with shared layout IDs.', 'Radii, borders and shadows read from tokens.', '38 files · 1.2 MB · updated today'][t]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function AccordionDemo() {
  const [open, setOpen] = useState(0)
  const items = [
    ['How fast is turnaround?', 'Most marketing sites ship in three to five weeks, design through deploy.'],
    ['Do we own the code?', 'Fully. Clean React, documented, in your repo from day one.'],
    ['Can you match our brand?', 'Yes — or build you a new one. That is what the studio panel is for.'],
  ]
  return (
    <div className="space-y-0">
      {items.map(([q, a], i) => (
        <div key={q} style={{ borderBottom: i < items.length - 1 ? 'var(--bw) var(--bs) var(--c-border)' : 'none' }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-3 py-2.5 text-left">
            <span className="text-[0.82rem] font-semibold" style={{ fontFamily: 'var(--f-display)' }}>{q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ color: 'var(--c-accent)', fontSize: '1.1rem', lineHeight: 1 }}>+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE.out }} className="overflow-hidden"
              >
                <p className="pb-3 text-[0.78rem]" style={{ color: 'var(--c-muted)' }}>{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function ProgressDemo() {
  const rows = [['Discovery', 100], ['Design', 82], ['Build', 46]]
  return (
    <div className="space-y-3">
      {rows.map(([l, v]) => (
        <div key={l}>
          <div className="flex justify-between text-[0.72rem] mb-1.5" style={{ color: 'var(--c-muted)' }}>
            <span>{l}</span><span className="tabular-nums" style={{ color: 'var(--c-accent)' }}>{v}%</span>
          </div>
          <div style={{ height: 6, background: 'var(--c-surface-2)', borderRadius: 999, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE.out }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--c-accent), var(--c-accent-2))', borderRadius: 999 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function AvatarsDemo() {
  const people = [['AR', 0], ['KM', 1], ['JT', 2], ['SV', 3]]
  return (
    <div className="flex items-center">
      {people.map(([initials, i]) => (
        <motion.div
          key={initials}
          whileHover={{ y: -6, zIndex: 10, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="grid place-items-center text-[0.72rem] font-bold relative"
          style={{
            width: 38, height: 38, borderRadius: 999, marginLeft: i === 0 ? 0 : -10,
            background: i % 2 ? 'var(--c-accent-2)' : 'var(--c-accent)',
            color: 'var(--c-on-accent)', border: '2px solid var(--c-bg)',
            fontFamily: 'var(--f-display)',
          }}
        >
          {initials}
        </motion.div>
      ))}
      <span className="ml-3 text-[0.78rem]" style={{ color: 'var(--c-muted)' }}>+12 on the team</span>
    </div>
  )
}

function InputDemo() {
  const [v, setV] = useState('')
  const [focus, setFocus] = useState(false)
  return (
    <div className="space-y-2.5">
      <div className="relative">
        <input
          value={v} onChange={(e) => setV(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className="w-full px-3.5 pt-5 pb-2 text-[0.85rem] outline-none"
          style={{
            background: 'var(--c-surface-2)', color: 'var(--c-text)',
            border: 'var(--bw) var(--bs) ' + (focus ? 'var(--c-accent)' : 'var(--c-border)'),
            borderRadius: 'var(--r-sm)', transition: 'border-color .25s',
          }}
        />
        <motion.label
          animate={{ y: focus || v ? -9 : 0, scale: focus || v ? 0.82 : 1 }}
          transition={{ duration: 0.2, ease: EASE.out }}
          className="absolute left-3.5 top-3.5 pointer-events-none origin-left text-[0.85rem]"
          style={{ color: focus ? 'var(--c-accent)' : 'var(--c-muted)' }}
        >
          Floating label
        </motion.label>
      </div>
      <select
        className="w-full px-3.5 py-2.5 text-[0.85rem] outline-none cursor-pointer"
        style={{ background: 'var(--c-surface-2)', color: 'var(--c-text)', border: 'var(--bw) var(--bs) var(--c-border)', borderRadius: 'var(--r-sm)' }}
        defaultValue="a"
      >
        <option value="a">Select · themed</option>
        <option value="b">Second option</option>
      </select>
    </div>
  )
}

function AlertsDemo() {
  const alerts = [
    ['Deployed to production', 'accent'],
    ['2 assets need review', 'neutral'],
  ]
  return (
    <div className="space-y-2">
      {alerts.map(([msg, tone], i) => (
        <motion.div
          key={msg}
          whileHover={{ x: 4 }}
          className="flex items-center gap-2.5 px-3 py-2.5 text-[0.78rem]"
          style={{
            borderRadius: 'var(--r-sm)',
            borderLeft: '3px solid ' + (tone === 'accent' ? 'var(--c-accent)' : 'var(--c-muted)'),
            background: 'var(--c-surface-2)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: 999, background: tone === 'accent' ? 'var(--c-accent)' : 'var(--c-muted)' }} />
          {msg}
        </motion.div>
      ))}
    </div>
  )
}

function PricingDemo() {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-1.5">
        <span className="nu-display" style={{ fontSize: '2.2rem', lineHeight: 1 }}>$<Counter to={8} />k</span>
        <span className="text-[0.75rem]" style={{ color: 'var(--c-muted)' }}>/ project</span>
      </div>
      <ul className="space-y-1.5">
        {['Full design system', 'Framer Motion pass', '30-day support'].map((f) => (
          <li key={f} className="flex items-center gap-2 text-[0.78rem]" style={{ color: 'var(--c-muted)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
            {f}
          </li>
        ))}
      </ul>
      <Button variant="solid" size="sm" className="w-full">Choose plan</Button>
    </div>
  )
}

function StatsDemo() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[['Uptime', 99, '%'], ['Lighthouse', 98, ''], ['Projects', 140, '+'], ['NPS', 72, '']].map(([l, n, s]) => (
        <div key={l}>
          <div className="nu-display tabular-nums" style={{ fontSize: '1.5rem', lineHeight: 1.1 }}>
            <Counter to={n} suffix={s} />
          </div>
          <div className="text-[0.68rem] uppercase tracking-[0.12em]" style={{ color: 'var(--c-muted)' }}>{l}</div>
        </div>
      ))}
    </div>
  )
}

function ChatDemo() {
  return (
    <div className="space-y-2">
      {[['them', 'Can you make it feel less… templated?'], ['us', 'That is literally the whole pitch.']].map(([who, msg], i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.25, duration: 0.4 }}
          className={cx('max-w-[86%] px-3.5 py-2.5 text-[0.79rem]', who === 'us' && 'ml-auto')}
          style={{
            borderRadius: 'var(--r)',
            background: who === 'us' ? 'var(--c-accent)' : 'var(--c-surface-2)',
            color: who === 'us' ? 'var(--c-on-accent)' : 'var(--c-text)',
          }}
        >
          {msg}
        </motion.div>
      ))}
    </div>
  )
}

function ChartDemo() {
  const bars = [38, 62, 45, 88, 71, 96, 58]
  return (
    <div className="flex items-end gap-1.5" style={{ height: 96 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.7, ease: EASE.out }}
          whileHover={{ opacity: 0.7 }}
          className="flex-1"
          style={{
            background: i === 5 ? 'var(--c-accent)' : 'color-mix(in oklab, var(--c-accent) 32%, var(--c-surface-2))',
            borderRadius: 'var(--r-sm) var(--r-sm) 0 0',
          }}
        />
      ))}
    </div>
  )
}

function SkeletonDemo() {
  return (
    <div className="space-y-2.5">
      {[100, 78, 90].map((w, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18 }}
          style={{ height: 11, width: `${w}%`, background: 'var(--c-surface-2)', borderRadius: 999 }}
        />
      ))}
    </div>
  )
}

const CATALOG = [
  'Buttons ×8', 'Nav bars ×5', 'Hero layouts ×9', 'Cards ×12', 'Footers ×4',
  'Form fields ×10', 'Modals ×4', 'Toasts ×3', 'Tabs ×4', 'Accordions ×3',
  'Pricing tables ×5', 'Testimonials ×4', 'Stat blocks ×6', 'Marquees ×3',
  'Avatars ×4', 'Badges ×6', 'Progress ×4', 'Charts ×5', 'Skeletons ×3',
  'Tooltips ×3', 'Breadcrumbs ×2', 'Pagination ×3', 'Chat bubbles ×3',
  'Timelines ×3', 'Galleries ×4', 'Sliders ×3', 'Dropdowns ×4', 'Sidebars ×3',
]

export default function Components() {
  const { style } = useTheme()
  return (
    <Section id="components" style={{ background: 'color-mix(in oklab, var(--c-surface) 42%, var(--c-bg))', borderBlock: 'var(--bw) var(--bs) var(--c-border)' }}>
      <SectionHead
        eyebrow="The kit · 100+ components"
        title="Pre-designed. Not pre-generic."
        sub={`Every element below is reading the ${style.name} tokens right now. Change the style and they all re-render — same props, entirely new design language. That's the difference between a component library and a template.`}
      />

      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" amount={0.055}>
        <Bay title="Buttons" n="8 variants">
          <div className="flex flex-wrap gap-2">
            {['solid', 'outline', 'soft', 'gradient', 'inverse', 'glass', 'ghost'].map((v) => (
              <Button key={v} variant={v} size="sm">{v}</Button>
            ))}
          </div>
        </Bay>

        <Bay title="Inputs" n="10 fields"><InputDemo /></Bay>
        <Bay title="Toggle & switch" n="4 controls"><ToggleDemo /></Bay>
        <Bay title="Tabs" n="4 patterns"><TabsDemo /></Bay>
        <Bay title="Accordion / FAQ" n="3 patterns"><AccordionDemo /></Bay>
        <Bay title="Progress" n="4 meters"><ProgressDemo /></Bay>
        <Bay title="Avatars" n="4 groups"><AvatarsDemo /></Bay>
        <Bay title="Alerts & toasts" n="7 states"><AlertsDemo /></Bay>
        <Bay title="Pricing" n="5 tables"><PricingDemo /></Bay>
        <Bay title="Stat blocks" n="6 layouts"><StatsDemo /></Bay>
        <Bay title="Charts" n="5 types"><ChartDemo /></Bay>
        <Bay title="Chat / AI" n="3 surfaces"><ChatDemo /></Bay>
        <Bay title="Badges" n="6 tones">
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">New</Badge>
            <Badge tone="solid">Pro</Badge>
            <Badge tone="neutral">Draft</Badge>
            <Badge tone="outline">v2.4</Badge>
          </div>
        </Bay>
        <Bay title="Skeletons" n="3 loaders"><SkeletonDemo /></Bay>
        <Bay title="3D tilt card" n="Pointer-reactive">
          <Tilt className="nu-3d" max={12}>
            <div
              className="grid place-items-center text-[0.8rem] font-semibold"
              style={{
                height: 108, borderRadius: 'var(--r)',
                background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent-2))',
                color: 'var(--c-on-accent)', fontFamily: 'var(--f-display)',
              }}
            >
              Move your cursor
            </div>
          </Tilt>
        </Bay>
      </Stagger>

      {/* full catalog strip */}
      <Reveal delay={0.1}>
        <div className="mt-6 nu-surface p-6">
          <Label n={`${CATALOG.length} families`}>Full catalog</Label>
          <div className="flex flex-wrap gap-1.5">
            {CATALOG.map((c) => (
              <motion.span
                key={c}
                whileHover={{ y: -2, backgroundColor: 'var(--c-accent)', color: 'var(--c-on-accent)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="px-2.5 py-1 text-[0.72rem] cursor-default"
                style={{
                  fontFamily: 'var(--f-display)',
                  borderRadius: 'var(--r-sm)',
                  border: 'var(--bw) var(--bs) var(--c-border)',
                  background: 'var(--c-surface-2)',
                  color: 'var(--c-muted)',
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
