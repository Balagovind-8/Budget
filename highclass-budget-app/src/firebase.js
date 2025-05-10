// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKq3rrzSaQmW85oVB3ZLM8kZBfcfCVVuY",
    authDomain: "budget-891d5.firebaseapp.com",
      projectId: "budget-891d5",
        storageBucket: "budget-891d5.appspot.com",
          messagingSenderId: "897748344182",
            appId: "1:897748344182:web:7174cfaaedb35a4f7bee57"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);

            // Firebase services
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const db = getFirestore(app);

            // Export for use in other files
            export { app, auth, provider, signInWithPopup, signOut, db };