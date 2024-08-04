// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// Add other Firebase products as needed, like Authentication, Storage, etc.

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7XwNrqLxtV1QSuiCwy-QeQhlmjRTPFsw",
    authDomain: "taxllama.firebaseapp.com",
    projectId: "taxllama",
    storageBucket: "taxllama.appspot.com",
    messagingSenderId: "294628020847",
    appId: "1:294628020847:web:563574fd81b0599b29f39a",
    measurementId: "G-QBMH4YRRWW"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db };
