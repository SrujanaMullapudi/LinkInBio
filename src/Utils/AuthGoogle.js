import React, { useEffect } from "react";
import { authenticate } from "./firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../Contexts/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";

import "../Styles/AuthGoogle.css";
import { useNavigate } from "react-router";

function AuthGoogle() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user !== null) {
      navigate(`account/${user.uid}`);
    }
  }, [user]);
  
  return (
    <div className="auth">
      <button className="buttonAuth" onClick={handleSignIn}>
        <GoogleIcon />
        <p>sign in with google</p>
      </button>
    </div>
  );
}

export default AuthGoogle;
