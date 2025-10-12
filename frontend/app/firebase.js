// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD0_CyF2rVnTm-VKIs4f4ncYJbmAqRE2s",
  authDomain: "dash-4-good-30432.firebaseapp.com",
  projectId: "dash-4-good-30432",
  storageBucket: "dash-4-good-30432.firebasestorage.app",
  messagingSenderId: "1096411180897",
  appId: "1:1096411180897:web:834c942045b3f62c06df20",
  measurementId: "G-7KSWKDTBM5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
