# Noor production notes

## Web/PWA
Deploy the repository root to GitHub Pages. The app stores the last successful location locally and refreshes GPS automatically when permission remains granted. Daily/7-day prayer data is cached to reduce repeated API calls and to keep the last known schedule available if the timing service is temporarily unavailable.

## Notification behaviour
The web app uses the Notification API and a service worker for persistent system notifications when supported. It includes per-prayer toggles, reminder timing, a notification test and optional user-supplied/licensed Adhan audio for foreground playback.

A browser-only GitHub Pages site cannot promise exact time-based audio notifications after the browser/page is suspended. Web Push can work in supported installed web apps, including Home Screen web apps on modern iOS/iPadOS, but it requires a server-side push service to send the messages.

## Native route for exact Adhan
The `native/` folder is a Capacitor-ready layer for Android/iOS local notification scheduling. Capacitor's Local Notifications plugin can schedule notifications on-device. For the final store builds, use a properly licensed Adhan recording as the native notification sound and schedule the next several days from Noor's current prayer-time calculation.


## Final touch decisions
The default web Adhan uses a CC0 public-domain recording from Wikimedia Commons. This is not AI-generated; a suitable AI voice generator is not available in the build environment, so a clearly licensed recording was chosen instead of shipping an unverified copyrighted recording. For the native store builds, bundle the same audio locally after verifying the source/license and device compatibility.

The web build now includes a privacy page, local-data reset, default Adhan source notice, test playback, and a service-worker version bump.


## v5 content additions
Prophet stories are concise Quran-based summaries with references and lessons. Islamic-event dates are presented as calculated dates and explicitly note that local moon sighting/community practice can differ.


## v9 final visual + Qibla pass
- Refreshed the visual system with deeper emerald, midnight blue, gold and warm parchment accents while keeping the app calm and readable.
- Reworked Qibla UI with a clearer fixed-bearing mode, live phone compass status, accessible direction labels and an interactive desktop/tablet drag preview.
- Added more explicit messaging that real motion requires a supported device sensor; desktop users still get the exact Qibla bearing.
- Live compass now prefers `deviceorientationabsolute` and falls back to `deviceorientation`, supports iOS `webkitCompassHeading`, applies screen orientation, and reports when sensors do not respond.
- Service-worker cache bumped to v9.


## v15 Zakat fix
- Zakat estimate now recalculates live when assets, liabilities, or nisab changes.
- UI explains that nisab changes eligibility; when assets remain above the chosen threshold, the 2.5% estimate itself remains the same.


## v17 update
- Added multi-currency support for Zakat and related money tools.
- Added user-selectable dark mode.
- Increased headings and mobile bottom navigation label sizes for readability.
- Updated cache/assets to v17.


## v18 final touches
- Added browser-history routes for Quran readers so iPhone edge-swipe and Mac two-finger browser-back gestures can return from a surah when the browser supports those gestures.
- Added source-provided Urdu translation option (Fateh Muhammad Jalandhry) and a combined English+Urdu reader mode.
- Quran Arabic and translations are escaped before DOM insertion and marked notranslatable.
- Added Terms & Conditions plus a religious/calculation disclaimer, including explicit Zakat self-check/qualified-scholar language.
- Updated Privacy page asset reference to v18 styles.
- Reminder: legal pages are drafts and require final business/contact details and legal review before commercial launch.


## v19 polish
- Larger top-right controls and direct dark-mode toggle.
- Tools panels are placed directly beneath the selected tool row.
- Swipe-right and horizontal trackpad navigation can return from Quran/views.
- Qibla target box is larger and turns green when aligned.


## v19 final UI/Qibla pass
- Enlarged top-right controls and added a visible one-tap dark-mode toggle.
- Added custom swipe-right navigation plus horizontal trackpad back gesture support.
- Tools popups are placed beneath the row of the selected tool instead of jumping to the top.
- Qibla target is a larger alignment box; the compass ring and guide turn green when aligned, with optional haptic feedback.
- Synced native web assets with the latest web build and fixed native asset references.
