# Ismail Eye & General Clinic — Website

A single-file, fully bilingual (Urdu ⇄ English) website. No build step, no npm, no framework. Upload the files and it works on any shared hosting, cPanel, Netlify, Vercel, or GitHub Pages.

---

## ⚠️ STEP 1 — Change these before publishing

Open `index.html`, find the block near the bottom marked **CLINIC SETTINGS** (search for `const CLINIC`) and replace:

```js
const CLINIC = {
  whatsapp : "923001234567",   // country code + number, NO + and NO leading 0
  phone    : "+923001234567",
  emergency: "+923001234567",
  stats    : { years:"20+", patients:"25,000+", surgeries:"8,000+", rating:"3.4" }
};
```

**The four numbers in `stats` are placeholders.** Confirm the real figures with Dr. Yahya before going live — publishing invented patient counts on a medical site is a real credibility and compliance risk. If the clinic doesn't want to state numbers, delete `renderTrust()`'s call or reduce the array to the stats you can stand behind.

Also replace:
- `PMDC: XXXXX-P` — both doctors' real registration numbers (search for `XXXXX-P`)
- `MBBS, FCPS (Ophthalmology)` — the actual qualifications
- OPD timings in the `hours` array (ur and en both) if they differ
- `https://www.ismaileyeclinic.com/` — your real domain, in the `<head>` and in `sitemap.xml` / `robots.txt`

---

## STEP 2 — Where the content lives

Everything the clinic will ever want to edit sits in **one JavaScript object called `T`**, with `ur` and `en` keys side by side. No HTML editing needed.

| To change | Edit |
|---|---|
| Menu labels | `T.ur.nav` / `T.en.nav` |
| Hero headline & tagline | `heroTitle`, `heroLead` |
| Services (add/remove/reword) | `services` array — add to **both** `ur` and `en` |
| Doctor bios, tags, timings | `doctors` array |
| Before/after cases | `gallery` array + `galCats` |
| Opening hours table | `hours` array |
| Pre-surgery instructions | `prep` array |
| Patient reviews | `reviews` array |
| FAQ | `faq` array (also auto-generates FAQ rich-result schema for Google) |
| WhatsApp message templates | `waGeneral`, `waServicePre`, `waDoctorPre`, `waFormIntro` |

**Rule:** if you add an item to `T.ur.services`, add the matching item at the same position in `T.en.services`. The arrays are read by index.

---

## STEP 3 — Real photos

Two places currently use drawn SVG placeholders:

**Doctor photos** — in `renderDoctors()`, replace the `<svg>` inside `.doc__photo` with:
```html
<img src="images/dr-yahya.jpg" alt="Dr. Yahya" loading="lazy">
```
Use square images, roughly 600×600px, saved as WebP or compressed JPG under 120 KB.

**Before/after gallery** — replace the `baSvg()` function output with two real images per case:
```html
<img src="images/case1-after.jpg" alt="After cataract surgery" loading="lazy">
<div class="ba__before"><img src="images/case1-before.jpg" alt="Before" loading="lazy"></div>
```
Both images must be the **same dimensions and same camera angle**, or the slider will look wrong.

**Before you upload any patient photo:** get written consent, and crop to the eye region only. The consent and results notices are already on the page — do not delete them.

---

## STEP 4 — Where the bookings go

Right now, submitting the form opens WhatsApp with all the details pre-typed, so the clinic never loses a lead. To *also* save every enquiry to a spreadsheet:

1. Create a Google Sheet → Extensions → Apps Script → paste a `doPost(e)` that appends `JSON.parse(e.postData.contents)` as a row.
2. Deploy → New deployment → Web app → Execute as *me*, Access *anyone*.
3. In `index.html`, find the comment `⚠️ BACKEND HOOK`, uncomment the `fetch(...)` block, and paste your deployment URL.

That's it — no server, no hosting cost.

---

## STEP 5 — Analytics

Paste your GA4 snippet in the `<head>`. The site already fires `generate_lead` events for WhatsApp clicks, phone clicks, and form submissions, so conversions will show up automatically once `gtag` exists.

---

## SEO checklist after launch

- [ ] Claim/verify the **Google Business Profile** for Ismail Eye & General Clinic and add the website URL. For a local clinic this drives more traffic than the website itself.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Add the website link to the Facebook and Instagram bios.
- [ ] Ask satisfied patients to leave a Google review — the "Leave a review" button on the site links straight there. At 3.4 stars this is the highest-value thing the clinic can do.
- [ ] Create an `og-image.jpg` (1200×630) with the clinic name and a photo, and place it at the site root.
- [ ] Rename `index.html`'s domain references once the domain is bought.

## What's already handled

Structured data (`MedicalClinic`, `Physician`, `LocalBusiness`, `FAQPage`), `hreflang` for both languages, Open Graph tags, full RTL mirroring, keyboard-accessible sliders, visible focus rings, `prefers-reduced-motion`, an A−/A+ text size control for elderly patients, honeypot spam protection, and Pakistani mobile number validation.

Total page weight is roughly 90 KB with no images and no external JavaScript, so it loads fast on 3G.
