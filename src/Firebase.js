// Import Firebase
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Firebase configuration object
const firebaseConfig = {
    // Your Firebase project configuration goes here
    apiKey: "AIzaSyDkSJ6dK6EgJG7kT0iWVXwztzmoYt2fqew",
    authDomain: "communityengineers.web.app",
    projectId: "cec-app-a569e",
    storageBucket: "cec-app-a569e.firebasestorage.app",
    messagingSenderId: "555607931621",
    appId: "1:555607931621:web:23b05c1f4355d51ad0f20c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);
