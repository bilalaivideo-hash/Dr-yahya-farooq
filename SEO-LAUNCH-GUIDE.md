# SEO setup and launch plan

Prepared for Ismail Eye & General Clinic, Vehari — 14 September 2026.

## What is implemented

| Area | Implementation |
|---|---|
| Searchable language pages | English `/` and Urdu `/ur.html`, with full text in the initial HTML. |
| Language targeting | Reciprocal `en-PK`, `ur-PK` and `x-default` links in the HTML and sitemap. Each page has its own canonical. |
| On-page metadata | Separate titles/descriptions; one H1 per page; descriptive section headings; contextual service and doctor links. |
| Local relevance | Original clinic name, address, Vehari locality and nearby patient areas in useful visible copy. No fabricated branch pages. |
| Structured data | MedicalClinic, WebSite and WebPage JSON-LD. Verified telephone and consistent opening hours appear after live configuration. |
| Social tags | Open Graph and X summary metadata in both languages. No broken `og-image.jpg` reference. No image file was supplied. |
| Technical files | Sitemap, robots.txt, custom favicon and a 404 document. Demo blocking changes on a validated live build. |
| Usability | Responsive layouts, RTL, menu keyboard control, visible focus, reduced-motion support, labeled inputs, large reading-size option. |
| Performance | No framework, third-party scripts, map iframe or large photos. Lightweight vector illustration and progressive enhancement. |

The SEO implementation follows Google’s guidance for separate language URLs and language annotations: [multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites). Structured data can help describe a business, but does not guarantee a rich result: [LocalBusiness documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business).

Meta keywords are deliberately omitted: they are not a substitute for relevant content. Do not repeat “best doctor” or city names unnaturally. There are no fabricated patient counts, invented awards or rating claims. FAQ answers are visible to visitors; no unsupported promise of FAQ rich results is made. Coordinates were omitted because the source’s approximate coordinates were not a confirmed clinic map pin.

## Target topics and page intent

| Topic | English intent | Urdu intent | Existing section |
|---|---|---|---|
| Clinic | eye clinic in Vehari; Ismail Eye & General Clinic | ویہاڑی میں آنکھوں کا کلینک | Home, contact |
| Doctor | Dr Yahya Vehari; eye specialist in Vehari | ڈاکٹر یحییٰ ویہاڑی؛ آنکھوں کا ڈاکٹر | Doctors |
| Cataract | cataract consultation Vehari; phaco surgery Vehari | موتیا کا آپریشن ویہاڑی؛ فیکو | Services |
| Vision | eye examination Vehari; glasses prescription | آنکھوں کا معائنہ؛ چشمے کا نمبر | Services |
| Long-term care | glaucoma assessment; diabetic eye screening Vehari | کالا موتیا؛ شوگر اور آنکھوں کا معائنہ | Services |
| Planning | clinic timings; eye clinic G Block Vehari | کلینک کے اوقات؛ جی بلاک ویہاڑی | Timings, contact |

These are intent-based content targets, not measured search-volume or ranking claims. This delivery has two language pages rather than thin duplicate city/service pages. If you later publish service pages, each should contain original, clinician-reviewed information about the consultation, suitability assessment, questions to ask, aftercare process and actual fees where appropriate. Do not make pages implying branches in Burewala or Mailsi when the clinic is in Vehari.

## Before live launch

1. Confirm the exact clinic name/address/phone (NAP), opening hours, final domain, services, qualifications and registration numbers. Have a clinic professional review all clinical wording and preparation notes.
2. Replace the demo configuration and regenerate the site. Inspect English and Urdu canonical, hreflang and schema URLs, and ensure `noindex` is gone and robots allows crawling.
3. Upload the public files using HTTPS. Check redirect behavior, real 404 responses, both language pages and mobile navigation.
4. Test WhatsApp with the clinic’s authorized number and verify who monitors messages. Confirm appointment wording does not promise a booking before staff reply.
5. Add a genuine clinic/doctor photo only when authorized; use descriptive alt text, dimensions, compressed WebP and lazy loading below the first screen. Photos should identify the real people/location shown.
6. Verify the site in Google Search Console and submit `/sitemap.xml`. Inspect both language URLs. Check structured data with Google’s Rich Results Test and the Schema Markup Validator. Run PageSpeed Insights on the actual public URL; local preview performance is not a public Core Web Vitals measurement.

## Local SEO: Google Business Profile

Work with the account that owns the existing clinic listing. Search for the existing profile before creating anything to avoid duplicate listings.

- Use the real-world clinic name exactly as used on its signage; do not append keywords.
- Select the most accurate available category after verifying the actual practice. Add secondary categories only for services genuinely offered.
- Confirm the exact map pin, phone, website, weekly hours and holiday changes.
- Add the complete appointment URL, service descriptions, accessibility/facility details only when confirmed, and genuine clinic photos.
- Link the website to the same verified Facebook and Instagram profiles. Keep NAP identical across profiles.
- Ask patients neutrally for honest feedback using the profile’s actual review link. Do not offer discounts, filter only positive patients or create reviews. Responses should not disclose patient details or confirm a medical relationship unnecessarily.

Google says local visibility depends primarily on relevance, distance and prominence; no website can guarantee a number-one position. [Google’s local ranking guidance](https://support.google.com/business/answer/7091?hl=en).

## Off-page SEO: concrete work after launch

Off-page SEO takes place outside the site; tags alone cannot complete it. No profile, directory, backlink or message was submitted in this task.

| When | Action | Completion evidence |
|---|---|---|
| Week 1 | Verify and correct the clinic’s existing Google Business Profile; add the final site. | Correct public profile URL, map pin, NAP, hours and website. |
| Week 1 | Update the clinic’s owned Facebook and Instagram website/address fields. | Profile links resolve to the final domain. |
| Week 2 | Audit existing Pakistan healthcare/provider listings for the clinic; claim only legitimate relevant profiles. | Accurate listing URLs logged with date, owner and NAP. |
| Week 2 | Request factual website listings from real hospital, professional or community affiliations, where the relationship exists. | Relevant editorial listing that accurately describes the relationship. |
| Weeks 3–4 | Publish clinician-approved patient education on owned channels and link to the relevant site section. | Published source URL, responsible reviewer and correct link. |
| Ongoing | Request honest reviews using the same process for all eligible patients; respond with privacy in mind. | Review-request process and general response standards. |
| Monthly | Inspect Search Console discovery/indexing, local queries and Business Profile calls/direction requests. | Month-over-month report, without promising ranking changes. |

Avoid paid link packages, spam comments, private-blog networks, fake reviews and mass irrelevant directories. Keep a citation log with platform, URL, clinic name, address, phone, last checked date and owner. If analytics is later added, record clicks without including patient names, phone numbers, medical details or WhatsApp message text.

## Copy prepared for owned profiles

**English description (verify services before publishing):**

Ismail Eye & General Clinic is located at 167/1, G Block, Vehari, Punjab. The clinic offers eye examinations, cataract consultations, refraction and glasses advice, glaucoma assessment, diabetic eye screening, children’s eye care and general OPD. Consultations are available with Dr. Yahya and Dr. Omar. Please confirm clinic hours and doctor availability before your visit.

**Urdu description:**

اسماعیل آئی اینڈ جنرل کلینک 167/1، جی بلاک، ویہاڑی، پنجاب میں واقع ہے۔ کلینک میں آنکھوں کا معائنہ، موتیا کی مشاورت، نظر کی جانچ اور چشمے کا مشورہ، کالے موتیے کا معائنہ، ذیابیطس کے مریضوں کی آنکھوں کی جانچ، بچوں کی آنکھوں کی دیکھ بھال اور جنرل او پی ڈی کی سہولیات درج ہیں۔ ڈاکٹر یحییٰ اور ڈاکٹر عمر سے مشاورت کے لیے آنے سے پہلے اوقات اور دستیابی کی تصدیق کر لیں۔

**Neutral review request — template only; not sent:**

Thank you for visiting Ismail Eye & General Clinic. If you would like to share your experience, you can leave an honest review here: [verified Google review link]. Please avoid including private medical details.

اسماعیل آئی اینڈ جنرل کلینک آنے کا شکریہ۔ اگر آپ اپنا تجربہ بیان کرنا چاہیں تو یہاں اپنی دیانت دارانہ رائے دے سکتے ہیں: [تصدیق شدہ گوگل ریویو لنک]۔ براہ کرم ذاتی طبی تفصیلات شامل نہ کریں۔

Do not add the clinic’s own aggregate rating to LocalBusiness schema to obtain stars. Google does not show self-serving review snippets for these business/organization pages: [Google review guidance](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful).
