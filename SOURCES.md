# Noor source policy (v6)

## Quran
Noor's Quran reader and daily ayah fetch Quran text from a dedicated Quran data provider. The app does not use generative AI to write, paraphrase, or transform Quranic Arabic. Browser translation is disabled on Quran text.

For a production backend, Quran Foundation's current Content API should be proxied server-side; its documentation requires app credentials and says client secrets must not be exposed in browser/mobile code.

## Prophet Stories
Story cards are summaries of the Quran passages listed on each card. Noor deliberately avoids adding invented conversations, dates, unnamed details, or claims from unsupported retellings as established facts. The exact Quran is opened from the cited passage link.

## Moon Watch
Country approach summaries are based on the Moonsighting Committee Worldwide country-practice reference. These are described as commonly documented approaches, not as a universal ruling or official authority for every community. The app links to the current visibility forecast and keeps a private local sighting journal.

## Islamic Events
Calculated dates come from the selected Hijri calendar service. The app distinguishes calculated dates from actual moon-sighting/community announcements, because lunar-month starts can differ by locality and method.

## Gamification
Noor Points are app engagement points only. They are not presented as religious reward, piety, status, or a substitute for sincere worship.


## Review platform guidance
- Apple ratings/reviews: https://developer.apple.com/app-store/ratings-and-reviews/
- Apple StoreKit review action: https://developer.apple.com/documentation/storekit/requestreviewaction
- Google Play in-app review: https://developer.android.com/guide/playcore/in-app-review/kotlin-java
- Muslim Pro features: https://www.muslimpro.com/features/
- Muslim Pro free/premium: https://support.muslimpro.com/help/en/articles/what-is-the-difference-between-the-free-and-premium-versions-of-muslim-pro
