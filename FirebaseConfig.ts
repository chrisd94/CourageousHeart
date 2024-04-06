// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8fKCV2qnsC4O2QQlnbZwyrlPl2BUxuBc",
  authDomain: "courageousheart-7893f.firebaseapp.com",
  projectId: "courageousheart-7893f",
  storageBucket: "courageousheart-7893f.appspot.com",
  messagingSenderId: "115522145844",
  appId: "1:115522145844:web:3950d57b19438fc2d0c461",
  measurementId: "G-9JXY31HC20"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_ANAL = getAnalytics(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);