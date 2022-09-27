// import React, { useEffect } from "react";

// import AuthGoogle from "../Utils/AuthGoogle";

// import { AppBar } from "@mui/material";

// function Navbar() {
//     console.log("navbar");

// return (
// <div className="navbar">

// </div>
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import "../Styles/Navbar.css";

const drawerWidth = 300;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <div className="navbar-logo">
          <AccountTreeIcon fontSize="large" />
          <p>LinkTree</p>
        </div>
      </Typography>
      <Divider />
      <div className="signIn">
        {user === null ? (
          <Link to="/signIn">Sign In</Link>
        ) : (
          <div className="logout-drawer" onClick={handleLogout}>
            <LogoutIcon id="#logout" />
            <p>Log Out</p>
          </div>
        )}
      </div>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const { collectionName } = useParams();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ backgroundColor: "#4473a2" }} component="nav">
        <Toolbar>
          {!props.backIcon ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div className="backIcon">
              <ArrowBackIosIcon onClick={handleGoBack} />
            </div>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <div className="navbar-logo">
              <AccountTreeIcon fontSize="large" />
              <p>LinkTree</p>
            </div>
          </Typography>
          {props.isCollection ? (
            <div className="pageName">{collectionName}</div>
          ) : (
            <div className="pageName">{props.pageName}</div>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ width: "100%" }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
