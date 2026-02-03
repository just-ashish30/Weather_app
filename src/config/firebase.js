// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "weather-app-565ea.firebaseapp.com",
  projectId: "weather-app-565ea",
  storageBucket: "weather-app-565ea.firebasestorage.app",
  messagingSenderId: "1057800163461",
  appId: "1:1057800163461:web:9b9f9c7dce0908b0e459ec",
  measurementId: "G-RJYH406DYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
