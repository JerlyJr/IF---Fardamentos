import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBaVaR8z-RiYokLkJ8iq8VtRYbb19LV7OA",
    authDomain: "if-fardamentos.firebaseapp.com",
    projectId: "if-fardamentos",
    storageBucket: "if-fardamentos.appspot.com",
    messagingSenderId: "971797136474",
    appId: "1:971797136474:web:afb94ab1e409cfb9a50463"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db }