# Noor native notification layer

This folder is for the Android/iOS version. The PWA on GitHub Pages is intentionally conservative about background Adhan delivery: browser timers are not a reliable substitute for device-scheduled notifications. Capacitor provides native local notifications and geolocation, which is the correct route for a production app with exact prayer alerts and custom notification audio.

Capacitor's current docs support Local Notifications scheduling on-device and native geolocation.

## Build path
1. Install Node.js 20+ and Android Studio/Xcode.
2. From this folder run `npm install`.
3. Copy the current web files into `www/`.
4. Run `npx cap add android` and/or `npx cap add ios`.
5. Run `npx cap sync`.
6. Add a properly licensed Adhan recording to the native notification sound assets, then schedule the next 7 days of prayer times using the same timing engine as Noor.
