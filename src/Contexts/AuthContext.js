import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { authenticate } from "../Utils/firebase-config";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const signInWithGoogle = () => {
    var provider = new GoogleAuthProvider();
    signInWithPopup(authenticate, provider);
  };

  const logout = () => {
    signOut(authenticate);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authenticate, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
      console.log("user", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signInWithGoogle, logout, user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
