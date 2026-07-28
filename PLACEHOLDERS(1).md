# Placeholder register — nothing goes live until this is empty

Every unverified fact is a **greppable literal**, not invented data. Nothing on
this site states anything about Dr. Yahya or the clinic that has not been
confirmed by you.

Run `grep -rn "DOMAIN-TO-BE-CONFIRMED\|0300-0000000\|00000\|0:00" .` to find
every occurrence before launch.

---

## Blocking — the site cannot go live with any of these present

| # | Token in code | Real value needed | Files |
|---|---|---|---|
| 1 | `DOMAIN-TO-BE-CONFIRMED.pk` | The domain | `index.html`, `en/index.html`, `robots.txt`, `sitemap.xml` |
| 2 | `ISMAILL` / "اسماعیل" | **Confirm spelling: Ismaill or Ismail.** Appears in the wordmark, page titles, OG tags, schema, footer and manifest. | all |
| 3 | `+923000000000` and `0300-0000000` | Phone number | both HTML, both `tel:` and `wa.me` links, schema |
| 4 | `wa.me/923000000000` | WhatsApp number (may differ from the phone) | both HTML |
| 5 | `PMDC Registration: 00000` | Registration number | both HTML, schema, footer |
| 6 | `MBBS, FCPS (Ophthalmology)` | Exact qualifications as registered | both HTML, schema |
| 7 | `00 years` / `0000+ procedures` | Verified figures | both HTML |
| 8 | `Rs. 0000` ×3, `Rs. 00000+` | Fees — **and your decision to publish them at all** | both HTML |
| 9 | `0:00 — 0:00` rows | Opening hours per day, **Friday explicitly** | both HTML, schema, `app.js` `HOURS` |
| 10 | `HOURS` object in `app.js` | Same hours, machine-readable. The live open/closed pill reads only from here. | `assets/js/app.js` |
| 11 | "مقامی نشانی — ابھی طے ہونا باقی" | Two or three landmark lines in Urdu | both HTML |
| 12 | `maps.google.com/?q=Vehari+Punjab` | The exact Google Maps pin | both HTML |
| 13 | `latitude 30.0442 / longitude 72.3441` | Verified coordinates — currently Vehari city centre, not the clinic | schema in both HTML |
| 14 | Testimonial placeholders ×2 | Consented testimonials, first name and town only | both HTML |
| 15 | Doctor's quote | Dr. Yahya's own words, replacing my draft | both HTML |
| 16 | Photography ×3 | Real photographs per the shot list | `assets/img/` |

## Images

The four placeholders are real AVIF / WebP / JPEG files at final dimensions, so
layout will not shift when they are replaced. Export at exactly these sizes:

| File | Dimensions | Target size |
|---|---|---|
| `dr-yahya-portrait` | 720 × 900 | **under 60 KB AVIF** — this is the LCP element |
| `dr-yahya-slitlamp` | 720 × 900 | under 70 KB |
| `clinic-exterior` | 1440 × 810 | under 90 KB |
| `og-default` | 1200 × 630 | under 100 KB |

`og-default.jpg` must be JPEG — several social platforms still do not accept AVIF.

## Fonts — blocking for the performance budget

Currently loaded from Google Fonts. **Self-host and subset before launch.**
Unsubset Noto Nastaliq Urdu is several hundred kilobytes and will break the
1.8 s LCP budget on 4G, and the hero is the LCP element.

1. Subset Nastaliq to the headline glyphs only — it is used for display, h1
   and h2 and nothing else.
2. Subset Naskh and Plex Sans to Urdu + Latin + digits.
3. Serve `woff2`, `font-display: swap`, `preload` the hero face only.
4. Point `--font-nastaliq`, `--font-naskh`, `--font-latin` in `main.css` at the
   local files. That is the only change needed.

## Not yet resolved from earlier stages

- The hardship line on the fees page — keep or cut.
- Homepage FAQ on women patients — the question is right, the answer is clinic
  policy. Not included on the homepage until you supply it.
- Emergency protocol signed by Dr. Yahya, and the named out-of-hours referral
  facilities. Phase 2 cannot ship without both.

---

## Added in Phase 3

| # | Token | Real value needed | Files |
|---|---|---|---|
| 17 | `action="/api/callback"` | A working endpoint — **or remove the form** | `appointment/`, `en/appointment/` |
| 18 | Client-side confirmation in `app.js` §9 | Replace with a real `fetch()` once the endpoint exists | `assets/js/app.js` |
| 19 | Hardship line, commented out | Publish or delete — decision outstanding | `fees-timings/`, `en/fees-timings/` |
| 20 | Interior photographs ×3 | Reception, waiting area, examination room, 480×480 | `assets/img/clinic-*.{avif,webp,jpg}` |
| 21 | Aftercare clinical gates | Dr. Yahya's written sign-off | `aftercare/*/` |
| 22 | Out-of-hours referral facilities | Named local hospitals | `eye-emergency/`, `en/eye-emergency/` |

## Note on the callback form

The form validates client-side, then shows the confirmation without contacting a
server, so the flow can be tested end to end before a backend exists.

**This is not a working form.** Before launch, either connect the endpoint or
delete the form and leave call and WhatsApp only. Shipping a form that silently
discards submissions would be worse than having no form — the patient believes
they have been heard, and nobody calls them back.
