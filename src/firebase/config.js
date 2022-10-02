// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG5ToBSG01NEnfwggZ0NgZ1pMwnbSieVw",
  authDomain: "react-journalapp-9a6e7.firebaseapp.com",
  projectId: "react-journalapp-9a6e7",
  storageBucket: "react-journalapp-9a6e7.appspot.com",
  messagingSenderId: "435638277784",
  appId: "1:435638277784:web:53fa7021d4c88bc34062ed",
  measurementId: "G-8ZC0Z7E665"
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
export const fireBaseAuth = getAuth(fireBaseApp);
export const fireBaseDB = getFirestore(fireBaseApp);