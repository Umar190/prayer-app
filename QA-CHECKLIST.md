# Noor final QA checklist

Code checks performed in this build
- JavaScript syntax checks for app.js and sw.js
- Quran Arabic output is HTML-escaped
- Saved-location restore and automatic refresh remain enabled
- Review prompt is delayed and dismissible
- Community report includes reporter_user_id
- Community posting has client and database-side rate limiting
- Service-worker cache version bumped
- native/www synced to latest web runtime
- Dua source register added

Before store launch
- Configure Supabase production community + moderation
- Configure web subscription checkout or native store billing
- Add real App Store / Google Play review URL
- Add support email
- Publish final reviewed privacy policy and data disclosures
- Human review all religious content/source mappings
- Test GPS, time zone travel, Qibla sensors, notifications, Adhan, offline caching, audio and purchase flows on real devices
