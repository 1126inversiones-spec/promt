"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyDhvZ0KiKgNHGj7nE1k87_TpKv2xbcwGZE",
  authDomain: "prompt-studio-emenu.firebaseapp.com",
  projectId: "prompt-studio-emenu",
  storageBucket: "prompt-studio-emenu.firebasestorage.app",
  messagingSenderId: "317950467867",
  appId: "1:317950467867:web:c8d139c74a0e4f68663dbe",
};

// Get this from Firebase Console → Build → App Check → Apps → register your web app
// with the "reCAPTCHA v3" provider, then paste the site key it gives you here.
const RECAPTCHA_SITE_KEY = "PASTE_YOUR_RECAPTCHA_V3_SITE_KEY_HERE";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// App Check only runs in the browser, and only once a real site key is set —
// this guards against breaking local dev before you've configured it.
if (typeof window !== "undefined" && RECAPTCHA_SITE_KEY !== "PASTE_YOUR_RECAPTCHA_V3_SITE_KEY_HERE") {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}
