# Noor — Prayer & Quran (Production v7)

Noor is a location-first Muslim prayer and learning PWA designed to keep the core worship experience free and ad-free, while offering optional Plus features for deeper study and convenience.

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
- Noor Plus plan UI with free/trial/monthly/yearly structure
- Installable PWA + native notification scaffolding
- Privacy page and content-integrity policy

## Important before a public commercial launch

1. Configure the online Community backend using `COMMUNITY-SETUP.md` and `supabase-schema.sql`.
2. Configure public Stripe checkout links using `SUBSCRIPTION-SETUP.md`. The repository contains no Stripe secret keys and does not pretend billing is live until links are supplied.
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
