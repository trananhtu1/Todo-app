// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,  } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHrDxLrQR4vovW3hw2A9rcISTggz8gphw",
  authDomain: "to-do-app-5914b.firebaseapp.com",
  projectId: "to-do-app-5914b", 
  storageBucket: "to-do-app-5914b.firebasestorage.app",
  messagingSenderId: "66883824655",
  appId: "1:66883824655:web:a8172e47ace6e2df1bc77a",
  measurementId: "G-GXG5TPSYBM"
};

// Kiểm tra config
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.error(`Missing Firebase config: ${key}`);
  }
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

