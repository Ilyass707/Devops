// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAdJ1hyvTd4rCJbwcCFE4xI7Q9z61MC9-8",
  authDomain: "fitapppfa.firebaseapp.com",
  projectId: "fitapppfa",
  storageBucket: "fitapppfa.firebasestorage.app",
  messagingSenderId: "753509559008",
  appId: "1:753509559008:web:ca4d28ef98ea84ff6fbe85"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // initialize Firestore

export { db };
