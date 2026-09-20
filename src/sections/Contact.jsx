import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, Reveal, Button, SplitText, Magnetic, cx } from '../components/primitives'
import { useTheme } from '../theme/ThemeProvider'
import { EASE } from '../motion/variants'
import { EMAIL, INSTAGRAM } from '../data/site'
import { hasFormBackend, submitBrief, mailtoLink } from '../lib/contact'

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
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [error, setError] = useState('')
  const [draft, setDraft] = useState('')
  const [f, setF] = useState({ name: '', email: '', brief: '' })
  const [budget, setBudget] = useState(1)
  const [needs, setNeeds] = useState(['Website'])

  const toggleNeed = (n) =>
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]))

  const reset = () => {
    setStatus('idle')
    setError('')
    setF({ name: '', email: '', brief: '' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return

    const payload = { ...f, needs, budget }

    // No backend configured yet — hand the brief to the visitor's mail app so
    // the enquiry is never lost. Configure VITE_WEB3FORMS_KEY to send directly.
    if (!hasFormBackend) {
      setDraft(mailtoLink(payload))
      setStatus('mailto')
      return
    }

    setStatus('sending')
    const res = await submitBrief(payload)
    if (res.ok) {
      setStatus('sent')
    } else {
      setError(res.message || 'Something went wrong.')
      setStatus('error')
    }
  }

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
                { k: 'Email', v: EMAIL, href: `mailto:${EMAIL}` },
                { k: 'Instagram', v: '@nu.ancestudios', href: INSTAGRAM },
                { k: 'Studio', v: 'Bengaluru · Serving worldwide' },
              ].map(({ k, v, href }) => (
                <motion.div
                  key={k}
                  whileHover={{ backgroundColor: 'var(--c-surface-2)' }}
                  className="flex items-center justify-between gap-4 px-4 py-3.5 text-[0.86rem]"
                  style={{ background: 'var(--c-surface)' }}
                >
                  <span style={{ color: 'var(--c-muted)' }}>{k}</span>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="nu-underline inline-flex items-center gap-1.5 transition-colors"
                      style={{ fontFamily: 'var(--f-display)', fontWeight: 600, color: 'var(--c-text)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text)')}
                    >
                      {v}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{v}</span>
                  )}
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
              {status === 'sent' ? (
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
                  <Button variant="outline" size="sm" onClick={reset}>
                    Send another
                  </Button>
                </motion.div>
              ) : status === 'mailto' ? (
                <motion.div
                  key="mailto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE.out }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.08 }}
                    className="grid place-items-center mx-auto mb-6"
                    style={{ width: 62, height: 62, borderRadius: 999, background: 'var(--c-accent)' }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--c-on-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v14H4z" /><path d="m4 6 8 6 8-6" /></svg>
                  </motion.div>
                  <h3 className="nu-display nu-h3 mb-2">Your mail app should be open.</h3>
                  <p className="text-[0.9rem] mb-7 mx-auto" style={{ color: 'var(--c-muted)', maxWidth: '38ch' }}>
                    The brief is pre-filled — just hit send. Nothing opened? Use the button below,
                    or write to <a href={`mailto:${EMAIL}`} className="nu-underline" style={{ color: 'var(--c-accent)' }}>{EMAIL}</a>.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button as="a" href={draft} variant="solid" size="md" magnetic>
                      Open mail draft
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
                      Back to the form
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
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

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Button type="submit" variant="solid" size="lg" magnetic disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send brief'}
                      {status === 'sending' ? (
                        <motion.svg
                          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"
                          animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        >
                          <path d="M12 3a9 9 0 1 0 9 9" />
                        </motion.svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      )}
                    </Button>
                    <span className="text-[0.75rem]" style={{ color: 'var(--c-muted)' }}>
                      Reply within 1 working day
                    </span>
                  </div>

                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[0.8rem] pt-1"
                      style={{ color: 'var(--c-text)' }}
                    >
                      That didn't go through{error ? ` (${error})` : ''}. Try again, or{' '}
                      <a
                        href={mailtoLink({ ...f, needs, budget })}
                        className="nu-underline"
                        style={{ color: 'var(--c-accent)', fontWeight: 600 }}
                      >
                        send it as an email instead
                      </a>
                      .
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
