// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmnaTZq_8WRqgG9c5AH7I9dBcqVs4MWUY",
  authDomain: "club-sphere-cc5a1.firebaseapp.com",
  projectId: "club-sphere-cc5a1",
  storageBucket: "club-sphere-cc5a1.firebasestorage.app",
  messagingSenderId: "803123981116",
  appId: "1:803123981116:web:273d1a692df7c9087bcc39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)