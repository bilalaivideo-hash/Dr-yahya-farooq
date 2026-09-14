# Ismail Eye & General Clinic — redesigned bilingual website

English: open `index.html`. Urdu: open `ur.html`. Keep the `assets` folder alongside both pages. This is a complete static website and does not require a database or paid framework. Fonts load from Google Fonts with local fallback fonts when offline.

## Aap ke liye

Professional cream/deep-green design, English/Urdu toggle, proper RTL layout, readable fonts, 9 existing services, both doctors, clinic schedule, preparation notes, FAQ, appointment form, directions and original social links shamil hain. Doctor images available nahi theen, is liye initials aur eye illustration use ki gayi hai; kisi stock photo ko doctor ki asli photo nahi dikhaya gaya.

Aap ke kehne par demo phone aur demo qualifications add hain. Demo domain `ismail-eye-clinic.example` reserved example address hai; yeh purchased/live domain nahi. Form ka demo aap ki request screen par dikhata hai. Na booking hoti hai, na koi message send hota hai.

## Files

- `index.html` and `ur.html`: finished pages, fully readable without JavaScript.
- `assets/styles.css`: responsive design and English/Urdu typography.
- `assets/app.js`: language compatibility, mobile menu, readable text size, appointment validation and WhatsApp request preparation.
- `assets/favicon.svg`: clinic-specific icon.
- `clinic.config.json`: demo/live switch, domain, phone, WhatsApp and credentials.
- `content.json`: source content retained and normalized from the supplied site.
- `build.mjs`: generates both complete HTML pages, robots and sitemap; no dependencies.
- `SEO-LAUNCH-GUIDE.md`: on-page, local and off-page SEO implementation and next steps.
- `QA-REPORT.md`: checks performed and remaining launch requirements.

## Replace demo details

Edit `clinic.config.json`:

1. `domain`: real domain, with `https://` and no trailing slash.
2. `phone`: real Pakistani mobile number in `+923XXXXXXXXX` format.
3. `whatsapp`: clinic’s WhatsApp mobile number in `923XXXXXXXXX` format, without `+`.
4. `doctors`: actual qualifications and registration numbers. Missing credentials are omitted in live mode, never invented.
5. Confirm the address, the original Facebook/Instagram pages, every service and doctor’s availability. Clinic timings are inherited from the source’s visible table. The old schema had conflicting times; this version uses the visible table consistently.
6. Set `detailsConfirmed` and `publishReady` to `true` only after the checks above.
7. Run `node build.mjs` from this folder. The build refuses live mode with a demo domain, missing mobile details or unconfirmed clinic details.

Changing the configuration alone does not alter already-generated HTML; rebuild after edits. To edit final bilingual wording, use the corresponding sections in `build.mjs`; the original content object supplies unchanged services, labels, schedule and preparation notes. Timings must also stay aligned with `assets/app.js` slot rules and structured opening hours in `build.mjs`.

## Upload

Upload only `index.html`, `ur.html`, `404.html`, `robots.txt`, `sitemap.xml` and `assets/` to the public root of your hosting. Keep config, generator, source content and these guides outside the public website. Use HTTPS. Configure the host to show `404.html` with an actual HTTP 404 status on missing pages. Redirect `/index.html` to `/` on the host if supported. The old `?lang=ur` links are supported in JavaScript; a server-side redirect is preferable for existing indexed URLs.

The supplied preview is intentionally **noindex** with crawling blocked. A successful live build switches metadata and robots to allow indexing and replaces the demo domain in canonical, hreflang, social and structured-data URLs. Submit the sitemap only after the final live upload. Merely uploading the demo will not make an SEO-ready live site.

## Booking and privacy

Live mode prepares a WhatsApp message and asks the visitor to continue. The site never falsely claims that a request has been received. Actual sending happens in WhatsApp and an appointment requires a reply from the clinic. No form information is saved in local storage, analytics or a backend; only the reading-size preference is stored on the visitor’s device. Language changes navigate to another page; an unfinished form is not retained across that navigation. No analytics has been installed because no clinic account ID was provided.

## Content choices

The supplied README explicitly identified phone numbers, experience/patient/surgery totals and credentials as placeholders. Those figures are not published as facts. Its illustrated before/after cases and consent statements were not real patient evidence; they have been omitted. Review quotes and aggregate rating were also omitted pending verification. Add genuine photos, consented cases or independently verified reviews later, with appropriate attribution and clinician-approved wording. Do not add self-serving review stars to LocalBusiness schema.

Off-page SEO accounts, Google Business Profile changes, review requests and directory submissions have **not** been performed. The separate guide contains the practical work to do after the real clinic details and account access are available.

## Supplied logo update
The user-supplied Ismail Eye Clinic PNG is now used unchanged in both language pages, in the header and footer. The favicon uses an SVG viewport to isolate the eye/medical symbol from that same PNG. Rebuilding preserves these assets.

