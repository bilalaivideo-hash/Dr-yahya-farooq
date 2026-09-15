# Verification report

Checked on 14 September 2026 in the local in-app browser.

## Passed

- English and Urdu pages render with complete initial HTML, unique IDs, one H1 each and all nine service cards.
- Urdu toggle navigates to the Urdu page and sets `lang=ur` and `dir=rtl`.
- Desktop layout inspected at 1440 pixels; mobile layout inspected at 390 pixels and checked at 320 pixels.
- A narrow-screen header spacing issue and a doctor-card overflow issue were found and corrected. The final 320-pixel English page at 125% reading size has matching document/client widths (305 pixels after the scrollbar), with no horizontal overflow.
- Mobile menu opens and closes after selecting a navigation item.
- English and Urdu demo appointment requests produce localized on-page confirmation explicitly stating that nothing was sent or booked.
- Friday, 18 September 2026: only the morning slot offered. Sunday, 20 September: routine booking rejected. Monday, 21 September: morning, afternoon and evening slots available.
- Both local Pakistani and international Pakistani mobile formats accepted in demo form tests.
- Reading-size control works up to 125%; reset to 100% for handoff.
- All local assets, internal anchors and both language links exist.
- JSON-LD parses successfully; canonical and reciprocal language metadata are present.
- Demo pages contain `noindex, nofollow`; no active call or WhatsApp link targets a sample phone number.
- Broken original social-image reference, unverified aggregate rating and placeholder registration string `XXXXX-P` are absent from public pages.
- No browser console errors were reported during the checks.

## Not yet live-verified

- No final domain, DNS, HTTPS certificate, hosting configuration or public SEO indexation has been set up.
- No real WhatsApp message, phone call, Google profile update, directory submission or review request was sent.
- The clinic address, map destination, original social accounts, actual services, current schedule and doctor credentials require owner confirmation. Approximate coordinates, unverified reviews and illustrative before/after cases were not published as evidence.
- No real-device cross-browser matrix, screen-reader audit, public PageSpeed score or measured Core Web Vitals claim is made.
- Clinical copy remains subject to review by the clinic before launch. General preparation/emergency language was checked against NHS guidance: [cataract surgery and transport home](https://www.nhs.uk/tests-and-treatments/cataract-surgery/) and [urgent eye symptoms](https://www.nhs.uk/symptoms/eye-pain/). These sources do not establish the clinic’s qualifications or services.

Public deployment instructions and SEO follow-up actions are in START-HERE.md and SEO-LAUNCH-GUIDE.md.

## Logo update verification
The supplied 1572 × 620 logo loads in the header and footer. English and Urdu checked at 320-pixel width: document width equals client width, with no horizontal overflow. Favicon now references the supplied logo symbol.


## Brand palette update — 15 September 2026
Applied logo-matched navy (#174773), cyan (#00afe3), and green (#1baa5b) throughout the website. White and pale-blue surfaces replace the cream/olive palette. Text uses darker cyan and green variants for readability. Updated the eye illustration, cards, form surfaces, buttons, footer and theme metadata. English preview visually inspected at narrow and desktop widths; Urdu RTL checked with no horizontal overflow. Static asset, link and metadata verification passed.


## Appointment-first update

Verified English and Urdu demo requests with only name and mobile number. Verified blank-form localized errors, Sunday rejection, a blank optional date, and Urdu numerals in a mobile number. The Urdu mobile layout at 390px has matching client/document widths (375px after scrollbar). Optional details start collapsed; only name and phone are required. The homepage now begins with the booking form. Live WhatsApp transmission was not performed; actual sending still requires the visitor's Send action in WhatsApp and clinic confirmation.

## Reduced visual clutter
Removed the Personal attention/About section from English and Urdu output. Simplified card treatments, numbering and spacing. Three service cards are shown initially; the remaining six are available in a native expandable section. Browser verification confirmed section removal and working expand/collapse. All nine services and appointment links remain in the generated HTML. Static validation passed.

