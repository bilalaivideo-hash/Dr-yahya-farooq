# Ismaill Eye & General Clinic

Static bilingual website. Semantic HTML5, modern CSS, vanilla JavaScript.
No framework, no build step, no runtime dependencies.

**53 pages** — 26 Urdu (canonical, at the root) + 26 English (under `/en/`) + a
bilingual 404.

---

## Structure

```
/
├── index.html                  Urdu homepage — canonical
├── 404.html                    bilingual
├── en/                         English mirror
├── dr-muhammad-yahya/          doctor entity page
├── eye-care/                   hub + 6 service pages
├── eye-emergency/              depth-1, deliberately
├── general-clinic/
├── fees-timings/  contact/  appointment/
├── aftercare/                  hub + 2 pages
├── guides/                     hub + 4 articles
├── privacy/  terms/  medical-disclaimer/  accessibility/
├── assets/
│   ├── css/main.css            tokens → base → components → utilities → print
│   ├── js/app.js               progressive enhancement only
│   ├── img/                    AVIF + WebP + JPEG at final dimensions
│   └── icons/                  favicon package
├── favicon.ico
├── robots.txt
├── sitemap.xml                 52 indexable URLs, hreflang annotated
├── site.webmanifest
├── .nojekyll                   GitHub Pages: serve files as-is
├── PLACEHOLDERS.md             ← read before doing anything else
└── QA-CHECKLIST.md             ← work through before launch
```

## Deploying to GitHub Pages

1. Push the contents of this folder to the repository root of the `gh-pages`
   branch, or to `/docs` on `main`.
2. Settings → Pages → set the source branch.
3. `.nojekyll` is already present; without it Jekyll would silently drop any
   underscore-prefixed path.
4. `404.html` at the root is picked up automatically.
5. For a custom domain, add a `CNAME` file at the root containing the bare
   domain. It is deliberately not included, because a placeholder domain in
   `CNAME` breaks Pages.

### GitHub Pages limitations to plan around

Pages cannot set response headers, so these are **not** achievable there:

- `Cache-Control` tuning on `/assets/*`
- A Content-Security-Policy header
- `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

Pages does serve gzip and sensible defaults, so the site will still perform
well. If you want the headers — and Best Practices 100 in Lighthouse needs the
CSP — put Cloudflare in front, or host on Cloudflare Pages instead. Cloudflare
also has edge presence in Pakistan, which matters more here than origin speed.

## Payload

| | gzipped |
|---|---|
| Largest page (homepage) | 7.9 KB |
| CSS | 11 KB |
| JS | 6 KB |
| Hero image (AVIF) | 3.2 KB placeholder / 60 KB budget |
| **Critical path** | **~28 KB** against a 350 KB budget |

Third-party requests: fonts only, and those must be self-hosted before launch.
No analytics tag, no chat widget, no tag manager. Nothing sets a cookie, so
there is no consent banner — a performance and a conversion decision as much as
a privacy one.

## JavaScript

`assets/js/app.js`, loaded with `defer`. Every feature is progressive
enhancement: with JavaScript disabled the site is fully readable and every
action still works, because call, WhatsApp and directions are plain links.

Modules: clinic hours and live open/closed status · text-size control (the
Acuity Scale) · high-contrast theme · menu sheet with focus trap · FAQ
accordion · header scroll behaviour · action-bar suppression on form focus ·
map facade · chart reveal · callback form validation · external-link
announcements.

**One source of truth for opening hours** is the `HOURS` object at the top of
`app.js`. The status pill, the status-aware CTA labels and the today-row
highlight all read from it. Update it alongside the page markup and the
`openingHoursSpecification` in the homepage schema.

## Accessibility

Built to exceed WCAG 2.2 AA. Body text runs at 16.1:1 against the page ground —
AAA, more than double the AA floor — because a meaningful share of visitors to
an eye clinic have degraded vision. 18 px body minimum, 400 weight minimum,
48 px touch targets, 3 px focus rings that are never removed, a first-party
text-size control at 100/125/150, and a genuine high-contrast theme.

No accessibility overlay widget. Overlays are opposed by the accessibility
community and by the National Federation of the Blind, and bolting one onto an
eye clinic would be a visible failure of understanding.

## Editing

The pages are plain HTML and can be edited directly. The Python generators used
to scaffold Phases 2 and 3 are kept outside this package — they are dev-time
scaffolding, not part of the website, and are not needed to maintain it.

## Before launch

Work through **QA-CHECKLIST.md** top to bottom. The blocking items:

1. Every placeholder replaced — see **PLACEHOLDERS.md**
2. Fonts self-hosted and subset, or Performance will not reach 95
3. Dr. Yahya's written sign-off on `/eye-emergency/` and both aftercare pages
4. Native Urdu review of all 26 Urdu pages
5. The callback form endpoint connected — or the form removed
