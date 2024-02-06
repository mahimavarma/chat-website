import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCRIdB9w5DkrGx9rRY2qSAau9bgkvAVPmI",
  authDomain: "chat-c0c74.firebaseapp.com",
  projectId: "chat-c0c74",
  storageBucket: "chat-c0c74.appspot.com",
  messagingSenderId: "878085058093",
  appId: "1:878085058093:web:f7671b68db672a128712a4",
  measurementId: "G-1QGP66QVKE"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()


