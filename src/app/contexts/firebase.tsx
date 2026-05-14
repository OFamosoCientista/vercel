import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = { 
    apiKey: "AIzaSyDIkzpgOz8uDRSmv8Flo76ekwqzG4t_2EQ",
    authDomain: "portprev-d81ba.firebaseapp.com",
    projectId: "portprev-d81ba",
    storageBucket: "portprev-d81ba.firebasestorage.app",
    messagingSenderId: "593362605191",
    appId: "1:593362605191:web:7d013144e93e51c24fd422",
    measurementId: "G-47WS7923C2" 
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);