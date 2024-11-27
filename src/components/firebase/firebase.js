// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_KEY = import.meta.env.VITE_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "nasa-sol.firebaseapp.com",
  projectId: "nasa-sol",
  storageBucket: "nasa-sol.firebasestorage.app",
  messagingSenderId: "805032212210",
  appId: "1:805032212210:web:63fe3f76fbc3d51d3e826b",
  measurementId: "G-9LL07LMZKT"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);