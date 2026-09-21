# Noor — Prayer & Quran (Production v7)

Noor is a location-first Muslim prayer and learning PWA designed to keep the core worship experience free and ad-free, with no ads and no active subscription offering in this release.

## Included
- GPS-based prayer times with configurable calculation method, school, high-latitude rule and local correction
- Persistent location with automatic refresh/fallback
- Qibla bearing and phone compass support
- Quran reader, source-fetched Arabic, published translations, audio, bookmarks and progress
- Prayer tracker, Quran goal tracker, Ramadan tracker, Hijri calendar and Islamic events
- Moon Watch country guide + visibility forecast links
- Source-linked Prophet Stories with authenticity guardrails
- Tasbih, duas, 99 Names, Zakat estimator and mosque links
- Ummah Community UI with topic channels, reporting and optional Supabase backend
- Subscription monetisation is intentionally deferred; the current release is free and ad-free
- Installable PWA + native notification scaffolding
- Privacy page and content-integrity policy

## Important before a public commercial launch

1. Configure the online Community backend using `COMMUNITY-SETUP.md` and `supabase-schema.sql`.
2. Subscription checkout is intentionally disabled in this release. Reintroduce billing only when the product is ready and the store/web payment flows are tested end-to-end.
3. For native iOS/Android release, implement App Store / Google Play subscription entitlements and device-scheduled prayer notifications.
4. Keep Qur'an and religious source content source-attributed. Do not replace published Qur'an Arabic or translations with AI-generated text.

## Core religious-content rule

Qur'an Arabic is fetched from the selected source; Noor does not AI-rewrite it. Prophet Stories are explicitly labelled as summaries with Qur'an references and should not introduce unsupported dialogue or historical details. See `CONTENT-INTEGRITY.md`.


### v13 notes
- GitHub Pages project-site base path pinned to `/prayer-app/` so asset loading works even when the URL is opened without a trailing slash.
- Qibla arrow now carries a readable QIBLA marker.
- Orientation permission requests magnetometer access where supported and only treats absolute orientation as a true North heading.


### Qibla alignment guide (v16)
On supported phones, Noor now keeps a fixed QIBLA target box at the top of the compass. Turn the phone until the moving Qibla arrow enters the box. When you are within 8 degrees, the target changes to the aligned state and the guidance message confirms it. On desktop, the interactive dial uses the same alignment model.


## v18 update
- Added multi-currency support for Zakat and related money tools.
- Added user-selectable dark mode.
- Increased headings and mobile bottom navigation label sizes for readability.
- Updated cache/assets to v18.


## v20 polish
- Larger top-right controls and direct dark-mode toggle.
- Tools panels are placed directly beneath the selected tool row.
- Swipe-right and horizontal trackpad navigation can return from Quran/views.
- Qibla target box is larger and turns green when aligned.


### Urdu Quran
The Quran reader now exposes prominent English / اردو / Both controls. Urdu text is fetched as the source-provided `ur.jalandhry` translation (Fatah Muhammad Jalandhri); Noor never AI-translates or rewrites Quranic text.


### v36 Hijri calendar
The full Hijri year is generated locally from the browser calendar implementation, so the calendar does not depend on a live API call to render.
