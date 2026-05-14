import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         GoogleAuthProvider,
         signInWithPopup,
         onAuthStateChanged,
         signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIkzpgOz8uDRSmv8Flo76ekwqzG4t_2EQ",
  authDomain: "portprev-d81ba.firebaseapp.com",
  projectId: "portprev-d81ba",
  storageBucket: "portprev-d81ba.firebasestorage.app",
  messagingSenderId: "593362605191",
  appId: "1:593362605191:web:7d013144e93e51c24fd422",
  measurementId: "G-47WS7923C2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const email = document.getElementById('user')
const password = document.getElementById('pass')

const createAccountBtn = document.getElementById('sign-up-btn')
const loginBtn = document.getElementById('sign-in-btn')
const logoutBtn = document.getElementById('logout-button')

createAccountBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    console.log('Create Account Button Clicked')
    console.log(`Email: ${email.value}`)
    console.log(`Password: ${password.value}`)
})

loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });

    console.log('Login Clicked')
    console.log(`Email: ${email.value}`)
    console.log(`Password: ${password.value}`)
})

