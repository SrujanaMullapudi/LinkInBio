import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyC-b8eTHMgcC3gK2ikQcWAMiK5KAO5X17Q",
  // authDomain: "auth-development-c9ae4.firebaseapp.com",
  // projectId: "auth-development-c9ae4",
  // storageBucket: "auth-development-c9ae4.appspot.com",
  // messagingSenderId: "705646346782",
  // appId: "1:705646346782:web:31b4e715daa1a64825640f"

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:  process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authenticate = getAuth(app);