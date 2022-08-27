import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDTpSs1-ewLQqnx6elcYm6sNR50IeYXz10",
    authDomain: "test-bdf0c.firebaseapp.com",
    projectId: "test-bdf0c",
    storageBucket: "test-bdf0c.appspot.com",
    messagingSenderId: "116123758394",
    appId: "1:116123758394:web:7459c3fed632c2b8f46a03",
    measurementId: "G-DMGXKD92HR",
    databaseURL: "https://test-bdf0c-default-rtdb.firebaseio.com/"
}

const firebaseApp = initializeApp(FIREBASE_CONFIG);
const firebaseAuth = getAuth(firebaseApp);
export { firebaseApp, firebaseAuth }