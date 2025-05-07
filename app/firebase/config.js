import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXI3TwezGUK6sOhGpA_AQB5z9CcgG5xi8",
  authDomain: "exercise-9-adv-102.firebaseapp.com",
  projectId: "exercise-9-adv-102",
  storageBucket: "exercise-9-adv-102.firebasestorage.app",
  messagingSenderId: "34786351899",
  appId: "1:34786351899:web:43317147ddc488c31551be",
  measurementId: "G-TK7B8TW0S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };