import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, Reveal, Button, SplitText, Magnetic, cx } from '../components/primitives'
import { useTheme } from '../theme/ThemeProvider'
import { EASE } from '../motion/variants'

const BUDGETS = ['< ₹10,000', '₹10,000 – ₹15,000', '₹15,000 – ₹45,000', '₹45,000+']
const NEEDS = ['Website', 'Design system', 'Motion pass', 'Performance Analytics', 'Rebrand']

function Field({ label, type = 'text', area = false, value, onChange, required }) {
  const [focus, setFocus] = useState(false)
  const Tag = area ? 'textarea' : 'input'
  return (
    <div className="relative">
      <Tag
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        rows={area ? 4 : undefined}
        className="w-full px-4 pt-6 pb-2.5 text-[0.92rem] outline-none resize-none"
        style={{
          background: 'var(--c-surface-2)',
          color: 'var(--c-text)',
          border: 'var(--bw) var(--bs) ' + (focus ? 'var(--c-accent)' : 'var(--c-border)'),
          borderRadius: 'var(--r-sm)',
          fontFamily: 'var(--f-body)',
          transition: 'border-color .25s, box-shadow .25s',
          boxShadow: focus ? '0 0 0 3px color-mix(in oklab, var(--c-accent) 16%, transparent)' : 'none',
        }}
      />
      <motion.label
        animate={{ y: focus || value ? -10 : 0, scale: focus || value ? 0.8 : 1 }}
        transition={{ duration: 0.2, ease: EASE.out }}
        className="absolute left-4 top-4 pointer-events-none origin-left text-[0.92rem]"
        style={{ color: focus ? 'var(--c-accent)' : 'var(--c-muted)' }}
      >
        {label}
      </motion.label>
    </div>
  )
}

export default function Contact() {
  const { style, palette, font } = useTheme()
  const [sent, setSent] = useState(false)
  const [f, setF] = useState({ name: '', email: '', brief: '' })
  const [budget, setBudget] = useState(1)
  const [needs, setNeeds] = useState(['Website'])

  const toggleNeed = (n) =>
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]))

  return (
    <Section id="contact" style={{ background: 'color-mix(in oklab, var(--c-surface) 42%, var(--c-bg))', borderTop: 'var(--bw) var(--bs) var(--c-border)' }}>
      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
        {/* left — pitch */}
        <div>
          <Reveal>
            <div className="nu-eyebrow mb-5 flex items-center gap-3">
              <span style={{ width: 28, height: 'var(--bw)', background: 'var(--c-accent)', display: 'inline-block' }} />
              Start here
            </div>
          </Reveal>

          <h2 className="nu-display nu-h2 mb-6" style={{ maxWidth: '14ch' }}>
            <SplitText text="Let's build" by="word" />
            <br />
            <span style={{ color: 'var(--c-accent)' }}><SplitText text="something odd." by="word" delay={0.14} /></span>
          </h2>

          <Reveal delay={0.2}>
            <p className="nu-lead mb-9" style={{ color: 'var(--c-muted)', maxWidth: '44ch' }}>
              Tell us what you're making. We reply within one working day with a point of view,
              a rough number, and whether we're the right studio for it.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="space-y-px overflow-hidden mb-8" style={{ borderRadius: 'var(--r)', border: 'var(--bw) var(--bs) var(--c-border)', background: 'var(--c-border)' }}>
              {[
                ['Email', 'creatorexchange.in@gmail.com'],
                ['Studio', 'Bengaluru · Serving worldwide'],
              ].map(([k, v]) => (
                <motion.div
                  key={k}
                  whileHover={{ backgroundColor: 'var(--c-surface-2)' }}
                  className="flex items-center justify-between gap-4 px-4 py-3.5 text-[0.86rem]"
                  style={{ background: 'var(--c-surface)' }}
                >
                  <span style={{ color: 'var(--c-muted)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{v}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* live config readout — the sales close */}
          <Reveal delay={0.34}>
            <div className="p-4" style={{ borderRadius: 'var(--r)', border: 'var(--bw) var(--bs) var(--c-border)', background: 'var(--c-surface)' }}>
              <div className="nu-eyebrow mb-3">You are currently viewing</div>
              <div className="space-y-1.5 text-[0.82rem]">
                {[
                  ['Style', style.name],
                  ['Palette', palette.name],
                  ['Type', `${font.displayName} / ${font.bodyName}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <span style={{ color: 'var(--c-muted)' }}>{k}</span>
                    <span style={{ color: 'var(--c-accent)', fontWeight: 600, fontFamily: 'var(--f-display)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-[0.75rem] mt-3 pt-3" style={{ color: 'var(--c-muted)', borderTop: 'var(--bw) var(--bs) var(--c-border)' }}>
                Mention this combination in your brief and we'll start there.
              </p>
            </div>
          </Reveal>
        </div>

        {/* right — form */}
        <Reveal delay={0.12}>
          <div className="nu-surface p-6 md:p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.1 }}
                    className="grid place-items-center mx-auto mb-6"
                    style={{ width: 62, height: 62, borderRadius: 999, background: 'var(--c-accent)' }}
                  >
                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="var(--c-on-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </motion.div>
                  <h3 className="nu-display nu-h3 mb-2">Brief received.</h3>
                  <p className="text-[0.9rem] mb-7" style={{ color: 'var(--c-muted)' }}>
                    We'll come back to you within one working day, usually sooner.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => { setSent(false); setF({ name: '', email: '', brief: '' }) }}>
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={(e) => { e.preventDefault(); setSent(true) }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your name" value={f.name} onChange={(v) => setF({ ...f, name: v })} required />
                    <Field label="Work email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} required />
                  </div>

                  <div>
                    <div className="nu-eyebrow mb-2.5">What do you need?</div>
                    <div className="flex flex-wrap gap-2">
                      {NEEDS.map((n) => {
                        const on = needs.includes(n)
                        return (
                          <motion.button
                            key={n} type="button" onClick={() => toggleNeed(n)}
                            whileTap={{ scale: 0.95 }}
                            className="px-3.5 py-2 text-[0.78rem] font-semibold"
                            style={{
                              fontFamily: 'var(--f-display)',
                              borderRadius: 'var(--r-sm)',
                              border: 'var(--bw) var(--bs) ' + (on ? 'var(--c-accent)' : 'var(--c-border)'),
                              background: on ? 'var(--c-accent)' : 'transparent',
                              color: on ? 'var(--c-on-accent)' : 'var(--c-muted)',
                              transition: 'background-color .22s, color .22s, border-color .22s',
                            }}
                          >
                            {n}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="nu-eyebrow mb-2.5">Budget range</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1" style={{ background: 'var(--c-surface-2)', borderRadius: 'var(--r-sm)' }}>
                      {BUDGETS.map((b, i) => (
                        <button
                          key={b} type="button" onClick={() => setBudget(i)}
                          className="relative px-1 py-2.5 text-[0.75rem] font-semibold leading-tight text-center"
                          style={{ fontFamily: 'var(--f-display)', color: budget === i ? 'var(--c-on-accent)' : 'var(--c-muted)', zIndex: 1 }}
                        >
                          {budget === i && (
                            <motion.span
                              layoutId="nu-budget"
                              className="absolute inset-0"
                              style={{ background: 'var(--c-accent)', borderRadius: 'calc(var(--r-sm) - 2px)', zIndex: -1 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                            />
                          )}
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Tell us about the project" area value={f.brief} onChange={(v) => setF({ ...f, brief: v })} />

                  <div className="flex items-center gap-3 pt-1">
                    <Button type="submit" variant="solid" size="lg" magnetic>
                      Send brief
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </Button>
                    <span className="text-[0.75rem]" style={{ color: 'var(--c-muted)' }}>
                      Reply within 1 working day
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
