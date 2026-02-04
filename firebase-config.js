// firebase-config.js


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMnFOIbh1NXLKJ-ldOCz_CQgi-IIzXUL0",
  authDomain: "srm-sb1.firebaseapp.com",
  projectId: "srm-sb1",
  storageBucket: "srm-sb1.firebasestorage.app",
  messagingSenderId: "543731533574",
  appId: "1:543731533574:web:88bc9a81bb279985194087",
  measurementId: "G-6KLPEDCBS2",
  databaseURL: "https://srm-sb1-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

const isFirebaseInitialized = () => {
    const apps = getApps();
    if (apps.length === 0) {
        return false;
    }
    const app = getApp();
    const config = app.options;
    return !!config.projectId;
};

export { isFirebaseInitialized };

