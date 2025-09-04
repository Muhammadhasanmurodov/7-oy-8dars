import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr0tRmmp-3HFGwWau8RuE52--BR12i2iM",
  authDomain: "muhammadhasan-project.firebaseapp.com",
  projectId: "muhammadhasan-project",
  storageBucket: "muhammadhasan-project.firebasestorage.app",
  messagingSenderId: "631710030691",
  appId: "1:631710030691:web:70fcc845322a2b9e95d156"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app)
export const db = getFirestore(app)