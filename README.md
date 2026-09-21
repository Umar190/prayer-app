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
