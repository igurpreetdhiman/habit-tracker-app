// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6Y-71PWutv62oIlmWdxmCxLlZICWxLBE",
    authDomain: "habitrackerapp-3ee1b.firebaseapp.com",
    projectId: "habitrackerapp-3ee1b",
    storageBucket: "habitrackerapp-3ee1b.firebasestorage.app",
    messagingSenderId: "91662657769",
    appId: "1:91662657769:web:c92214a7272828179aa878",
    measurementId: "G-4GKM1HYWC8"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


