# Noor — Prayer & Quran

Noor is a mobile-first Progressive Web App focused on location-based prayer timing and everyday Quran/Islamic tools.

## Included in this release

- Precise browser GPS location with locality/town/city reverse geocoding.
- Prayer times calculated from latitude/longitude through the AlAdhan API.
- 23+ calculation methods, Hanafi/standard Asr selection, high-latitude rule and minute correction.
- Next prayer countdown that uses the timing service's local timezone rather than blindly assuming the device timezone.
- Seven-day prayer schedule.
- Five-prayer tracker saved locally by date.
- Qibla bearing and great-circle distance to the Kaaba with optional device orientation sensor.
- Quran catalogue for all 114 surahs.
- Arabic + selectable English translation, verse-level audio and sequential surah playback.
- Surah search, verse search, bookmarks and last-reading position.
- Daily Ayah card.
- Tasbih counter with quick presets and local persistence.
- Daily dua library.
- Full 99 Names of Allah from the AlAdhan Asma al-Husna API.
- Hijri calendar for the current Gregorian month.
- Ramadan planner using location-based Fajr/Maghrib times.
- Zakat estimator with configurable nisab threshold.
- Nearby mosque links to maps.
- Installable PWA shell with offline app-shell caching.
- Browser reminders while Noor is open.
- Privacy/settings notes and transparent calculation settings.

## Data sources

- AlAdhan: prayer timings, calculation methods, calendar, Asma al-Husna.
- BigDataCloud: browser reverse geocoding from GPS coordinates.
- Al Quran Cloud: Quran chapters, Arabic text, translations and audio/CDN.

## Important launch notes

1. Quran Foundation's current Content API uses authenticated backend credentials. This build therefore uses the open Al Quran Cloud endpoints for the public prototype rather than exposing Quran Foundation secrets in the browser.
2. Browser notification scheduling is not equivalent to reliable native background push. For an App Store / Google Play production build, use native local notifications or a server-backed push system.
3. A “precise” prayer time is still convention-dependent. Noor exposes calculation method, Asr school, high-latitude rule and local correction instead of presenting one universal number as religiously authoritative.
4. Add a public privacy policy, terms, support contact, data-provider notices and final religious-content review before commercial publication.
5. For mosque discovery at scale, use a proper places/geodata provider or your own licensed database rather than depending on public geocoding infrastructure for heavy traffic.

## Run locally

Serve the folder over HTTP/HTTPS; do not open index.html directly if you want geolocation, notifications and service-worker behaviour.

`python3 -m http.server 8080`

Then open `http://localhost:8080`.
