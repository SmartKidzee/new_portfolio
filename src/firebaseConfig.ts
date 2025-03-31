// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB87Jowg_DjJ6ilgua_WElMmN8zkHpRjk",
  authDomain: "iamshreyasblog.firebaseapp.com",
  projectId: "iamshreyasblog",
  storageBucket: "iamshreyasblog.firebasestorage.app",
  messagingSenderId: "912277010812",
  appId: "1:912277010812:web:92cb66959498fe8f860cf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app; 