import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyDBP-Qh2-04I4vyplu480y7jQiOl6oXdFk',
  projectId: 'viashopnotification2',
  authDomain: 'viashopnotification2.firebaseapp.com',
  storageBucket: 'viashopnotification2.appspot.com',
  messagingSenderId: '333406200441',
  appId: '1:333406200441:web:08b3aa3042be840f6e2aa8',
  measurementId: 'G-JQ41Q4X9DG',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
