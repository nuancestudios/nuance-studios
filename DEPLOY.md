# Deploying Nu.ance Studios

Two things people mean by "see the website":

- **Locally** — running on your own machine while you edit it.
- **Publicly** — a real URL you can send to a client.

Both below.

---

## 1. See it locally

You need [Node.js 20+](https://nodejs.org) installed. Then, in the project folder:

```bash
npm install     # once, installs dependencies
npm run dev     # starts the dev server
```

Open **http://localhost:5173**. Edits to any file reload instantly.

To check the real production build before shipping:

```bash
npm run build
npm run preview   # serves dist/ at http://localhost:4173
```

---

## 2. Put it on GitHub

The repo is already initialised and committed locally. You just need to create
the remote and push.

### a. Create an empty repo on GitHub

Go to **github.com/new**. Name it `nuance-studios`.
**Do not** tick "Add a README" / "Add .gitignore" — the project already has both,
and a pre-filled repo causes a push conflict.

### b. Push

Replace `YOUR-USERNAME`:

```bash
cd nuance
git remote add origin https://github.com/YOUR-USERNAME/nuance-studios.git
git push -u origin main
```

If git asks for a password, GitHub no longer accepts account passwords. Either:
- install the [GitHub CLI](https://cli.github.com) and run `gh auth login`, or
- create a [Personal Access Token](https://github.com/settings/tokens) (classic,
  `repo` scope) and paste that as the password.

---

## 3. Host it — pick one

### Option A · GitHub Pages (free, already wired up)

A workflow at `.github/workflows/deploy.yml` builds and deploys on every push to
`main`. To switch it on, **once**:

1. Repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Push anything (or Actions tab → *Deploy to GitHub Pages* → **Run workflow**)

Live at:

```
https://YOUR-USERNAME.github.io/nuance-studios/
```

First deploy takes ~2 minutes. The Actions tab shows progress; a green tick means live.

> **If you name the repo something other than `nuance-studios`**, nothing breaks —
> the workflow reads the repo name automatically and sets the asset base path to match.
> Only the local `npm run build:pages` script has the name hardcoded; edit it in
> `package.json` if you want that shortcut to stay accurate.

### Option B · Vercel (recommended for a client-facing site)

Better fit here: faster CDN, instant rollbacks, preview URLs per branch, and a
free custom domain with automatic HTTPS.

1. [vercel.com/new](https://vercel.com/new) → **Import** your GitHub repo
2. It auto-detects Vite. Leave every setting alone.
3. **Deploy**

Live in ~40 seconds at `nuance-studios.vercel.app`. Every future `git push`
redeploys automatically. Add a custom domain under **Settings → Domains**.

### Option C · Netlify

[app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
Build command `npm run build`, publish directory `dist`. Deploy.

---

## Which should you choose?

| | GitHub Pages | Vercel |
|---|---|---|
| Cost | Free | Free tier is plenty |
| URL | `user.github.io/repo/` | `project.vercel.app` |
| Custom domain | Yes, manual DNS | Yes, guided + auto-HTTPS |
| Preview deploys | No | Yes, per pull request |
| Setup | Already done | 3 clicks |

For a studio site you're sending to prospects, **Vercel** — the URL looks more
professional and you get preview links to share work-in-progress. GitHub Pages is
already configured either way, so you can run both.

---

## Before you go live

- [ ] **Wire up the contact form.** It's front-end only right now — submitting shows the
      success state but sends nothing. In `src/sections/Contact.jsx`, find the
      `onSubmit` handler and POST to [Formspree](https://formspree.io),
      [Resend](https://resend.com) or your own endpoint.
- [ ] **Replace the placeholder content** — the testimonial ("Rhea Mathews, Meridian"),
      the client marquee names in `src/sections/Hero.jsx`, and the `studio@nuance.design`
      email in `Contact.jsx` and `Footer.jsx`.
- [ ] **Check the real pricing** in the Components section demo card ($8k) — it's
      illustrative, not an offer.
- [ ] Optionally self-host **Geist**, **Satoshi** and **General Sans**. They aren't on
      Google Fonts, so those three pairings currently fall back to system sans.
