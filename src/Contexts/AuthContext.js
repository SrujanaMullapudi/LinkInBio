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
      console.log("user", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signInWithGoogle, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
