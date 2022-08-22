import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-b8eTHMgcC3gK2ikQcWAMiK5KAO5X17Q",
  authDomain: "auth-development-c9ae4.firebaseapp.com",
  projectId: "auth-development-c9ae4",
  storageBucket: "auth-development-c9ae4.appspot.com",
  messagingSenderId: "705646346782",
  appId: "1:705646346782:web:31b4e715daa1a64825640f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authenticate = getAuth(app);