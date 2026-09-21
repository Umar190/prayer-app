# Noor review prompt setup

Noor uses a respectful in-app review card rather than asking on first launch. The prompt becomes eligible after a few sessions and meaningful use, and the user can dismiss it permanently or postpone it.

Set the public store/product URL in `community-config.js`:

```js
review: {
  url: 'https://your-store-review-url',
  feedbackEmail: 'hello@example.com'
}
```

For the native iOS/Android release, use the platform in-app review APIs so the operating system controls whether the actual rating dialog appears.

Do not gate features on a rating, and do not condition access or rewards on leaving a positive review.
