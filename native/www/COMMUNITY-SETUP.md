# Noor Community setup

The Community screen is intentionally built in two modes:

1. **Local demo mode** — works immediately and stores test posts only on the current device.
2. **Online mode** — uses Supabase with anonymous sign-in so users can post and report content without exposing their email/name.

## 1. Create a Supabase project

Create a free Supabase project and enable **Authentication → Providers → Anonymous Sign-Ins**.

Open the SQL editor and run `supabase-schema.sql`.

## 2. Add the public client settings

Edit `community-config.js`:

```js
window.NOOR_CONFIG = {
  supabase: {
    url: 'https://YOUR-PROJECT.supabase.co',
    anonKey: 'YOUR-SUPABASE-ANON-KEY'
  },
  stripe: {
    monthlyUrl: '',
    yearlyUrl: '',
    trialDays: 7
  },
  community: { maxPostsPerHour: 10 }
};
```

The **anon key** is designed for public client applications, but the database must keep Row Level Security enabled. Never put a Supabase service-role key in GitHub Pages.

## 3. Moderation

The MVP intentionally has no private DMs. It includes topic categories, report buttons, basic length/rate limits and clear community rules. Before a large launch, add a moderator dashboard, spam protection, stronger rate limiting and an appeals process.
