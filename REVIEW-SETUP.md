# Review setup

Noor does not ask for a rating on first launch. The web prompt appears only after multiple sessions plus meaningful use, and users can choose Not now or Don't ask again.

Set public store/feedback links in `community-config.js`:

```js
review: {
  url: 'https://your-store-review-url',
  feedbackEmail: 'hello@example.com'
}
```

For native iOS/Android, use the platform in-app review APIs so the store controls the actual rating prompt. Never reward or gate access based on leaving a positive review.
