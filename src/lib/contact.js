/**
 * Contact brief delivery.
 *
 * The site is static (Vite → GitHub Pages / Vercel), so there is no server to
 * POST to. Instead the form talks to a hosted "form backend" that relays the
 * submission to the studio inbox. Any of these work; set ONE of them:
 *
 *   .env.local
 *   ─────────────────────────────────────────────────────────────
 *   VITE_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   ← recommended
 *   VITE_FORMSPREE_ID=xxxxxxxx                                ← alternative
 *   VITE_CONTACT_ENDPOINT=https://…                           ← your own API
 *
 * Free tiers (checked Sept 2026): Web3Forms 250 submissions/month, no account
 * needed; Formspree 50/month. See CONTACT-SETUP.md for the 3-minute setup.
 *
 * If none is configured the form still works — it opens the visitor's mail app
 * with the brief pre-filled, so a submission can never silently go nowhere.
 */

import { EMAIL } from '../data/site'

const env = import.meta.env || {}

export const WEB3FORMS_KEY = (env.VITE_WEB3FORMS_KEY || '').trim()
export const FORMSPREE_ID = (env.VITE_FORMSPREE_ID || '').trim()
export const CUSTOM_ENDPOINT = (env.VITE_CONTACT_ENDPOINT || '').trim()

/** True once a backend is configured; the UI uses it to pick its success flow. */
export const hasFormBackend = Boolean(WEB3FORMS_KEY || FORMSPREE_ID || CUSTOM_ENDPOINT)

const BUDGETS = ['< ₹10,000', '₹10,000 – ₹15,000', '₹15,000 – ₹45,000', '₹45,000+']

/** Human-readable brief — used as the email body and the mailto fallback. */
export function buildBrief({ name, email, brief, needs = [], budget = 0 }) {
  return [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Needs:   ${needs.join(', ') || '—'}`,
    `Budget:  ${BUDGETS[budget] || '—'}`,
    '',
    'Project',
    '-------',
    brief || '(no brief written)',
  ].join('\n')
}

/** Pre-filled mail draft, used when no form backend is configured. */
export function mailtoLink(payload) {
  const subject = `Project brief${payload.name ? ` — ${payload.name}` : ''}`
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBrief(payload))}`
}

/**
 * Deliver the brief.
 * @returns {Promise<{ok: boolean, reason?: 'unconfigured'|'error', message?: string}>}
 */
export async function submitBrief(payload) {
  if (!hasFormBackend) return { ok: false, reason: 'unconfigured' }

  const body = {
    name: payload.name,
    email: payload.email,
    message: buildBrief(payload),
    needs: payload.needs.join(', '),
    budget: BUDGETS[payload.budget] || '',
    // Web3Forms / Formspree honeypot — real people never see this field.
    _gotcha: payload.gotcha || '',
  }

  let url
  if (WEB3FORMS_KEY) {
    url = 'https://api.web3forms.com/submit'
    body.access_key = WEB3FORMS_KEY
    body.subject = `New project brief — ${payload.name || 'website'}`
    body.from_name = 'Nu.ance Studios website'
    body.replyto = payload.email
    body.botcheck = payload.gotcha ? 'true' : ''
  } else if (FORMSPREE_ID) {
    url = `https://formspree.io/f/${FORMSPREE_ID}`
    body._subject = `New project brief — ${payload.name || 'website'}`
  } else {
    url = CUSTOM_ENDPOINT
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.ok) return { ok: true }

    let message = ''
    try {
      const data = await res.json()
      message = data.error || data.errors?.[0]?.message || ''
    } catch {
      /* non-JSON error body — the status is enough */
    }
    return { ok: false, reason: 'error', message: message || `HTTP ${res.status}` }
  } catch (err) {
    return { ok: false, reason: 'error', message: err?.message || 'Network error' }
  }
}
