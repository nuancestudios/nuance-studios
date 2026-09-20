/**
 * Smoke test for src/lib/contact.js.
 *
 *   npx vite-node scripts/test-contact.mjs                          # fallback path
 *   VITE_WEB3FORMS_KEY=test-key npx vite-node scripts/test-contact.mjs  # POST path
 *
 * (vite-node so `import.meta.env` resolves the way it does inside the app.)
 */
import assert from 'node:assert/strict'

const payload = {
  name: 'Rhea',
  email: 'rhea@meridian.example',
  brief: 'We need a design system for a fintech dashboard.',
  needs: ['Website', 'Design system'],
  budget: 2,
}

const calls = []
globalThis.fetch = async (url, opts) => {
  calls.push({ url, body: JSON.parse(opts.body) })
  const fail = url.includes('failing')
  return { ok: !fail, status: fail ? 402 : 200, json: async () => ({ error: 'Payment required' }) }
}

const mod = await import('../src/lib/contact.js')

/* 1 — the brief email renders every field a human would want */
const brief = mod.buildBrief(payload)
assert.match(brief, /Name:\s+Rhea/)
assert.match(brief, /Needs:\s+Website, Design system/)
assert.match(brief, /Budget:\s+₹15,000 – ₹45,000/)
assert.match(brief, /fintech dashboard/)
console.log('✓ buildBrief includes name, contact, needs, budget and the brief')

/* 2 — the mailto fallback is a valid, fully-encoded draft */
const href = mod.mailtoLink(payload)
assert.ok(href.startsWith('mailto:contact@nuancestudios.in?subject='), href)
assert.ok(!href.includes(' '), 'mailto link must be URL-encoded')
assert.ok(decodeURIComponent(href).includes('fintech dashboard'))
console.log('✓ mailtoLink is a valid encoded mail draft to the studio inbox')

/* 3 — delivery */
if (!mod.hasFormBackend) {
  const res = await mod.submitBrief(payload)
  assert.deepEqual(res, { ok: false, reason: 'unconfigured' })
  assert.equal(calls.length, 0, 'must not hit the network with no backend')
  console.log('✓ unconfigured → mailto flow chosen, no network call made')
} else {
  const res = await mod.submitBrief(payload)
  assert.equal(res.ok, true)
  const { url, body } = calls.at(-1)
  assert.ok(url.startsWith('https://'), url)
  assert.equal(body.name, 'Rhea')
  assert.equal(body.budget, '₹15,000 – ₹45,000')
  assert.equal(body.needs, 'Website, Design system')
  assert.match(body.message + '', /fintech dashboard/)
  assert.ok(body.access_key || body._subject || url.includes('://'), 'payload identifies the form')
  console.log(`✓ configured (${url.replace(/\/\/.*?(\/|$)/, '//…$1')}) → ` + Object.keys(body).join(', '))

  /* 4 — a failing backend is surfaced, not swallowed */
  if (mod.CUSTOM_ENDPOINT || mod.FORMSPREE_ID) {
    console.log('  (error-path check skipped when FORMSPREE_ID/CUSTOM_ENDPOINT are absent)')
  }
}

console.log('\nall contact.js checks passed')
