import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCgOc-jRyntMv2h95TrpYyll0mZBlCO9u4",
    authDomain: "hopehub-development.firebaseapp.com",
    projectId: "hopehub-development",
    storageBucket: "hopehub-development.appspot.com",
    messagingSenderId: "428763034721",
    appId: "1:428763034721:web:c792f0a34416eb9e69a620",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
