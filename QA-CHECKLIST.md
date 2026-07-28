# Production QA checklist

Work top to bottom. Nothing ships with an unchecked **blocking** item.

---

## 1. BLOCKING — content

Run `grep -rn "DOMAIN-TO-BE-CONFIRMED\|0300-0000000\|923000000000\|PMDC 00000\|Rs. 0000\|0:00 — 0:00\|to be confirmed\|طے ہونا باقی" --include="*.html" --include="*.txt" --include="*.xml" --include="*.js" .`

- [ ] Domain replaced everywhere — 53 HTML files, `robots.txt`, `sitemap.xml`
- [ ] **Clinic name spelling confirmed** — Ismaill or Ismail. Appears in titles, OG tags, schema, wordmark, manifest, footer
- [ ] Phone number — `tel:` links, display text, schema, 404
- [ ] WhatsApp number — every `wa.me` link
- [ ] PMDC registration number
- [ ] Exact qualifications as registered
- [ ] Years in practice, procedures performed
- [ ] All fees, and **the decision on whether to publish them at all**
- [ ] Opening hours, **Friday on its own row**, in three places: page markup, `HOURS` in `app.js`, `openingHoursSpecification` in the homepage schema
- [ ] Landmark directions, two or three lines
- [ ] Google Maps pin and verified `latitude` / `longitude` (currently Vehari town centre, not the clinic)
- [ ] Two consented testimonials
- [ ] Dr. Yahya's own words replacing the drafted quote
- [ ] Consultation, dilation, surgery and recovery durations

## 2. BLOCKING — clinical sign-off

- [ ] **`/eye-emergency/` reviewed, amended and signed in writing by Dr. Yahya.** The visible clinical gate on that page stays until this is done
- [ ] Named out-of-hours referral facilities supplied and inserted
- [ ] `/aftercare/cataract-surgery/` signed
- [ ] `/aftercare/eye-drops/` signed
- [ ] Every clinical claim on the six service pages reviewed
- [ ] Terminology confirmed: **سفید موتیا** = cataract, **کالا موتیا** = glaucoma

## 3. BLOCKING — pending decisions

- [ ] Hardship line on `/fees-timings/` — currently commented out. Uncomment to publish, or delete
- [ ] Homepage FAQ on women patients — question omitted pending clinic policy
- [ ] Callback form endpoint — `action="/api/callback"` is a placeholder. Either connect it, or **remove the form entirely.** An unhonoured callback is worse than no callback
- [ ] Named person responsible for the phone during opening hours
- [ ] Named person responsible for WhatsApp, with a stated response window

## 4. Native Urdu review

- [ ] Full read-through by a native Pakistani Urdu writer, all 26 Urdu pages
- [ ] **سست آنکھ** for amblyopia — the term I am least confident about
- [ ] **تیمار دار** — correct but possibly formal; would ساتھ آنے والا read better?
- [ ] Chart headline reads naturally broken across three lines
- [ ] Emergency page: linguistic review as well as clinical

## 5. Fonts — blocks the performance target

- [ ] Noto Nastaliq Urdu subset to headline glyphs only
- [ ] Noto Naskh Arabic and IBM Plex Sans subset to Urdu + Latin + digits
- [ ] Self-hosted as `woff2`, `font-display: swap`
- [ ] `--font-nastaliq`, `--font-naskh`, `--font-latin` repointed in `main.css`
- [ ] Google Fonts `<link>` and `preconnect` removed from all 53 files
- [ ] Hero font preloaded

## 6. Images

- [ ] Photography shot to the approved list, no stock imagery
- [ ] Exported at the exact placeholder dimensions so nothing reflows
- [ ] `dr-yahya-portrait` **under 60 KB AVIF** — it is the LCP element
- [ ] `og-default.jpg` stays JPEG — some platforms reject AVIF
- [ ] Alt text checked in both languages
- [ ] Placeholder labels gone from every asset

## 7. Server configuration

- [ ] HTTPS forced; apex or `www` chosen and the other 301'd
- [ ] `Cache-Control: public, max-age=31536000, immutable` on `/assets/*`
- [ ] `Cache-Control: no-cache` on HTML
- [ ] Brotli or gzip on HTML, CSS, JS, SVG, XML
- [ ] `404.html` wired as the error document
- [ ] `/_tools/` not deployed, or blocked at the server
- [ ] Security headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- [ ] CSP — `default-src 'self'` is achievable once fonts are self-hosted. Needed for Best Practices 100

## 8. Accessibility

- [ ] axe DevTools: **zero violations**, every page, both languages, both themes
- [ ] Keyboard traversal end to end; visible focus everywhere; no traps
- [ ] Menu sheet: Escape closes, Android back closes, focus returns to the toggle
- [ ] Text size 100 / 125 / 150 — action bar reflows to two rows, no horizontal scroll
- [ ] High-contrast mode on `/accessibility/` — every page still legible
- [ ] 200% browser zoom, no horizontal scroll
- [ ] TalkBack on a real Android device, both languages
- [ ] NVDA on Windows
- [ ] Form: error summary receives focus, each item jumps to its field, errors announced
- [ ] `prefers-reduced-motion` removes all motion including the chart reveal
- [ ] Every page passes with JavaScript disabled

## 9. Bilingual and RTL

- [ ] Every page renders correctly in both directions
- [ ] **Bidi isolation on every LTR run inside Urdu** — `MBBS, FCPS`, PMDC number, phone, fees, times. The most common RTL defect
- [ ] Language toggle preserves the current page on all 26 pairs
- [ ] `hreflang` reciprocal on every page
- [ ] Nastaliq descenders not clipping at any text size
- [ ] No letter-spacing or uppercase applied to Arabic script anywhere

## 10. SEO

- [ ] Rich Results Test passes on: homepage, doctor, cataract, emergency, fees, contact, one guide
- [ ] Search Console verified, both language variants; sitemap submitted
- [ ] **Google Business Profile claimed, and NAP character-identical** to the site footer
- [ ] Titles under 60 characters, descriptions under 155
- [ ] Canonical correct on all 52 indexable pages
- [ ] `404.html` returns HTTP 404 and carries `noindex`

## 11. Performance

- [ ] Lighthouse mobile, throttled, both languages: **Performance 95+ · Accessibility 100 · Best Practices 100 · SEO 100**
- [ ] LCP under 1.8 s on a real mid-range Android over 4G
- [ ] CLS under 0.05 — check the hero and the interior strip specifically
- [ ] INP under 200 ms
- [ ] No layout shift when fonts swap in

## 12. Real-device testing

Emulators do not catch these.

- [ ] One budget Android on 4G — the primary target
- [ ] One mid-range Android
- [ ] One iPhone
- [ ] `tel:` opens the dialler with the correct number
- [ ] `wa.me` opens WhatsApp with the pre-filled Urdu text intact on an older build
- [ ] Directions hand off to the correct Maps pin
- [ ] Action bar does not cover the submit button with the keyboard open
- [ ] Sticky bar does not jitter while scrolling

## 13. One session with a real user

Worth more than every automated check above.

- [ ] One elderly Urdu-reading participant, on their own phone, asked to find the fee and then call

---

## Deliberately not built

Documented so nobody adds them later by reflex.

Online booking engine · patient portal or login · live chat or AI triage · accessibility overlay widget · photo gallery · before/after imagery · newsletter · exit-intent popups · countdown timers · analytics tag or tag manager · cookie consent banner (nothing to consent to) · nearby-city landing pages
