import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";

import "../Styles/AuthGoogle.css";

function AuthGoogle() {
  const { signInWithGoogle } = useAuth();
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };
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
