# Noor Plus subscription setup

The app uses a simple free + Noor Plus model:

## Free
- Prayer times + next prayer
- Qibla
- Basic Quran reading/search/bookmarks
- Core duas, dhikr, 99 Names, Hijri calendar
- Prayer and Quran trackers
- Ramadan + Islamic events
- Moon Watch overview
- Prophet stories
- Community
- No ads

## Noor Plus (proposed launch offer)
- £2.99/month
- £24.99/year
- 7-day free trial

Premium is intended for **extra depth and convenience**, not for locking the core acts of worship behind payment.

Planned Plus areas:
- Offline Quran audio
- More licensed reciters
- Source-backed Quran study suite
- Advanced prayer/Quran analytics
- Guided 7/30/90-day Noor Paths
- Moon Watch alerts
- Saved local mosque timetable sync
- Family mode in the native app
- Extra licensed Adhan recordings + themes

## Web checkout

Use Stripe Payment Links or a small server-side Stripe Checkout endpoint. Put only the **public checkout URLs** in `community-config.js`:

```js
stripe: {
  monthlyUrl: 'https://buy.stripe.com/…',
  yearlyUrl: 'https://buy.stripe.com/…',
  trialDays: 7
}
```

Do not put Stripe secret keys in the repository or browser.

## Native app

For iPhone/Android, implement Apple App Store / Google Play subscriptions using the platform billing APIs rather than asking users to pay through a web page inside the native app. Keep entitlements server-verified for production.
