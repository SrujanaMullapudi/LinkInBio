import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import AuthGoogle from "../Utils/AuthGoogle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LogoutIcon from "@mui/icons-material/Logout";

import "../Styles/Navbar.css";

function Navbar() {
    console.log("navbar");
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const {username} = useParams();

  const handleLogout = async () => {
    try {
      await logout();
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
    <div className="navbar">
      <div className="navbar-logo">
        <AccountTreeIcon fontSize="large" />
        <p>LinkTree</p>
      </div>
      <div className="signIn">
        {user === null ? (
          <AuthGoogle />
        ) : (
          <div className="logout" onClick={handleLogout}>
            <LogoutIcon id="#logout" />
            <p>Log Out</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
