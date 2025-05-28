import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGrk6Bozj7UhDug3myLsmMblvB5ASXyjI",
    authDomain: "uas-pemesanan-online.firebaseapp.com",
    projectId: "uas-pemesanan-online",
    storageBucket: "uas-pemesanan-online.firebasestorage.app",
    messagingSenderId: "676093379763",
    appId: "1: 676093379763: web: 3557faa84dcb6010095cc6",
    measurementId: "G-Y0R581NL79"
};
// config/fireba

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Hanya satu baris export
export { app, db, auth };