"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhvZ0KiKgNHGj7nE1k87_TpKv2xbcwGZE",
  authDomain: "prompt-studio-emenu.firebaseapp.com",
  projectId: "prompt-studio-emenu",
  storageBucket: "prompt-studio-emenu.firebasestorage.app",
  messagingSenderId: "317950467867",
  appId: "1:317950467867:web:c8d139c74a0e4f68663dbe",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
