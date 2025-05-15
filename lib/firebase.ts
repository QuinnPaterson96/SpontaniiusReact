// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS319FQ4y8N0QSbyz1VmTCb1eAdwVrR5o",
  authDomain: "spontaniius-abba6.firebaseapp.com",
  databaseURL: "https://spontaniius-abba6-default-rtdb.firebaseio.com",
  projectId: "spontaniius-abba6",
  storageBucket: "spontaniius-abba6.firebasestorage.app",
  messagingSenderId: "1009715812296",
  appId: "1:1009715812296:web:1ff350642c01316756d2fd",
  measurementId: "G-WXK5SLSHKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);