# Making the contact form actually send

The form in `src/sections/Contact.jsx` used to be front-end only — it showed
"Brief received." and threw the enquiry away. It now does one of two things:

| Configured? | What a visitor gets |
|---|---|
| **Yes** — a form backend key is set | The brief is POSTed to the backend and lands in the studio inbox as an email. Success panel: "Brief received." |
| **No** | The visitor's mail app opens with the whole brief pre-filled, addressed to `contact@nuancestudios.in`. Never a dead end, never a silent black hole. |

Nothing is broken if you skip this page — but the answers below are what you
probably want.

---

## Does the Google Forms API work here?

**No — not from this site, and it isn't really the tool you want for this.**

Three separate blockers:

1. **The Forms API can't create responses.** It can create/edit forms
   (`forms.create`, `forms.batchUpdate`) and *read* responses
   (`forms.responses.get` / `.list`) — but there is no "submit an answer"
   method. Google's own docs and the API reference are explicit that responses
   only exist when a human fills the form in. So the API you were hoping for
   doesn't do the one thing you need.
2. **Every Forms API call needs OAuth 2.0 as a Google user** (`forms.body`,
   `forms.responses.readonly`, `drive.file`…). This site is a static bundle on
   GitHub Pages/Vercel with no server — there is nowhere to keep an OAuth client
   secret or a refresh token, and putting one in the JS bundle would expose it
   to every visitor.
3. **The old trick — POSTing directly to `/formResponse` from the browser — is
   dead.** It was never a supported API, and Google now blocks it with CORS. You
   would need a proxy server of your own to make it work, at which point a
   form backend (below) is strictly less work and less to maintain.

**What Google Forms *is* still good for:** if you'd rather triage enquiries in a
Google Sheet with a Forms UI, the pragmatic pattern is *embed* the form
(`File → Embed` gives you an `<iframe>`) instead of rebuilding it — see the
"Use a Google Form instead" section at the bottom.

---

## Recommended: Web3Forms — free, 250 submissions/month

Free tier: **250 submissions/month, unlimited forms, no account required**,
30-day submission history, honeypot + server-side spam filtering, hCaptcha if
you want it. Paid plans only matter above 250/month ([pricing detail](https://web3forms.com)) — for a studio taking a handful of briefs a week, free is plenty.

**Setup (about 3 minutes):**

1. Go to **https://web3forms.com**.
2. Enter `contact@nuancestudios.in`, click **Create Access Key**.
3. Check that inbox — the key is emailed to you (it looks like
   `a1b2c3d4-5678-90ab-cdef-1234567890ab`). The key is *not* a secret in the
   dangerous sense; it can only send mail to the address it was issued for.
4. Give it to the app:
   - **Locally** — copy `.env.example` to `.env.local` and set
     `VITE_WEB3FORMS_KEY=…`, then restart `npm run dev`.
   - **GitHub Pages** — repo **Settings → Secrets and variables → Actions →
     New repository secret**, name it `VITE_WEB3FORMS_KEY`, paste the key.
     The deploy workflow already passes it through, so the next push builds with
     the form live.
   - **Vercel** — Project → Settings → Environment Variables, same name, all
     environments, then redeploy.
5. Submit the form on the live site once to confirm the email arrives.

Budget and "what do you need?" chips are included in the email body, and hitting
reply addresses the visitor directly (`replyto` is set to their email).

## Alternative: Formspree — free, 50 submissions/month

Free tier: **50 submissions/month** (counted across the whole account), 30-day
history, two notification addresses, unlimited forms
([plans](https://formspree.io/plans)). Fine for a slow inbox, tighter if a
campaign lands.

1. Create a form at **https://formspree.io** pointed at `contact@nuancestudios.in`.
2. Copy the ID from the endpoint `https://formspree.io/f/xxxxxxxx`.
3. Set `VITE_FORMSPREE_ID=xxxxxxxx` in the same three places as above.

> **DEPLOY.md used to suggest Resend.** Resend is an *outbound email API* for
> apps that already own a verified sending domain — it has no form endpoint and
> no dashboard of submissions, so it needs a serverless function in between.
> Overkill here.

## Alternative: Netlify Forms — free with Netlify hosting

If you host on Netlify (not GitHub Pages), Netlify Forms gives 100
submissions/month free with zero third-party signup: add `data-netlify="true"`
and a hidden `form-name` field. It needs a change to the markup *and* a static
HTML copy of the form for Netlify's build-time detection, so it's only worth it
if Netlify is your host anyway.

## Alternative: your own endpoint

Any URL that accepts a JSON `POST` works — a Cloudflare Worker, a Vercel
serverless function, a Formspark/Formspree-alike. Set
`VITE_CONTACT_ENDPOINT=https://…` and it's used as-is.

---

## How the code is wired

```
src/data/site.js      EMAIL + INSTAGRAM — one source of truth for links
src/lib/contact.js    buildBrief() → readable email body
                      mailtoLink() → pre-filled draft (fallback)
                      submitBrief() → POST to whichever backend is configured
src/sections/Contact.jsx  form → sending → sent | mailto | error
```

States the form can be in: `idle`, `sending` (button shows a spinner and can't
be double-submitted), `sent`, `mailto` (no backend configured), `error` (shows
the backend's message plus a "send it as an email instead" escape hatch — the
typed brief is never lost).

## Prefer a Google Form anyway?

Paste its embed HTML into the `{/* right — form */}` block of
`src/sections/Contact.jsx` and delete the React form:

```jsx
<iframe
  src="https://docs.google.com/forms/d/e/…/viewform?embedded=true"
  title="Project brief"
  className="w-full"
  style={{ height: 720, border: 0, borderRadius: 'var(--r)' }}
/>
```

You lose the styled fields, the budget selector and the live-config readout —
and submissions land in a Sheet rather than the studio inbox — but it is free
and needs no account.

## Checklist

- [ ] `contact@nuancestudios.in` exists and is monitored
- [ ] Backend key created and set in `.env.local`
- [ ] Same key set in GitHub Secrets (and/or Vercel env vars)
- [ ] Test submission received in the inbox
- [ ] Instagram link → `https://www.instagram.com/nu.ancestudios/` (footer +
      contact panel)
