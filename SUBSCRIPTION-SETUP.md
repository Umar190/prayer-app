# Noor Plus — launch subscription plan

## Product model

**Free — £0 forever**
- Prayer times, MCW method + Hanafi Asr setting
- Qibla
- Full Quran reading and selected translations
- Prayer/Quran tracking
- Core duas, 99 Names, Ramadan, Islamic events, Moon Watch overview
- Prophet Stories and community
- No ads

**Noor Plus**
- £2.99/month
- £24.99/year (about 30% less than paying monthly for 12 months)
- 7-day trial for eligible new subscribers

Plus should unlock extra depth and convenience, not basic worship access.

## What should be paid at launch

Launch only with Plus features that you can actually deliver and support. The initial Plus bundle can include offline Quran audio/reciters, premium Adhan packs, advanced progress analytics and native-only extras. Features marked planned in the app UI should remain labelled as planned until they ship.

## Web billing

Stripe Payment Links support subscription products and can be used without building a checkout page. Configure a monthly subscription and yearly subscription in Stripe, add the 7-day trial there, and paste only the public Payment Link URLs into `community-config.js`. Stripe handles the checkout page and recurring billing; the app must not contain secret Stripe keys.

```js
stripe: {
  monthlyUrl: 'https://buy.stripe.com/...',
  yearlyUrl: 'https://buy.stripe.com/...',
  trialDays: 7,
  customerPortalUrl: 'https://billing.stripe.com/p/login/...'
}
```

For real entitlement checks, use a server-side webhook to record the Stripe customer/subscription state. Do not trust a local `subscription.status` value as proof of payment.

## iPhone / Android billing

For the native app, use Apple App Store auto-renewable subscriptions and Google Play subscriptions. Keep the same product IDs for monthly/yearly concepts but use the platform stores for payment. Implement purchase restoration and server-side entitlement validation before unlocking Plus.

Apple supports free introductory offers and requires the subscription name/duration, renewal price, and restoration/sign-in path to be clear in the purchase flow. Google Play supports subscription base plans/offers, including free trials.

## Recommended product IDs

- `com.noor.plus.monthly`
- `com.noor.plus.yearly`

## Recommended launch copy

**Headline:** Go deeper with Noor Plus

**Subhead:** Keep the essentials free. Support Noor and unlock deeper Quran study, offline listening and extra tools.

**Trial line:** 7 days free, then £2.99/month or £24.99/year. Cancel before the trial ends to avoid the renewal charge.

## Important implementation rule

The app should never claim a subscription is active solely because local browser storage says `active`. Production access should come from a verified Stripe/App Store/Google Play entitlement.
