import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAlL_XiQfZCNKuj4u1E13pwq1vL4J5ZiIg",
    authDomain: "penis-2-develop.firebaseapp.com",
    projectId: "penis-2-develop",
    storageBucket: "penis-2-develop.appspot.com",
    messagingSenderId: "962423109374",
    appId: "1:962423109374:web:43f4501d808c879641d7af"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
