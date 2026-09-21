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

## Quran translation integrity
- Urdu translation option: Fateh Muhammad Jalandhry (`ur.jalandhry`) served from the Quran data provider. Noor displays the fetched translation rather than AI-translating or paraphrasing it.
- Quran Foundation warns against automatic browser translation of vetted translations because re-translation can introduce semantic errors; Noor disables translation on Quran text.

### Quran Urdu translation
Noor's Urdu Quran option uses the published Fatah Muhammad Jalandhri translation via the `ur.jalandhry` source edition. Quran.com currently identifies the same translation as "Fatah Muhammad Jalandhari" and presents it as a translation resource; Al Quran Cloud-based datasets and applications use the `ur.jalandhry` edition identifier. Verify licensing/redistribution permissions for the production distribution before store launch.
