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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import { useUser } from "../Contexts/userContext";
import face from "../Photos/face.jpg";
import "../Styles/Navbar.css";

const drawerWidth = 300;

function DrawerAppBar(props) {
  const { logout, user } = useAuth();
  const { data } = useUser();
  const navigate = useNavigate();
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
      navigate("/signIn");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = ["Dashboard", "Socials", "Appearance", "Settings"];

  console.log(data);

  if (data.length === 0) {
    console.log(data.length);
    navigate("/createLink");
  }

  const drawer = data && (
    <div>
      <Box className="sidebar" onClick={handleDrawerToggle}>
        <Typography variant="h6" sx={{ my: 2 }}>
          <div>
            <div className="sidebar-userContent">
              <img src={data[0].photoURL} alt="" />
              <div>
                <button>Edit Profile</button>
              </div>
            </div>
            <div className="sidebar-userContent-usenameAndBio">
              <p>{data.length > 0 ? data[0].userName : ""}</p>
              <p>{"This is my bio"}</p>
            </div>
            <Divider />
            <div className="sidebar-userContent-navItems">
              {navItems.map((item) => (
                <Link
                  to={`/signIn/account/${
                    data.length > 0 ? data[0].userId : ""
                  }/${item === "Dashboard" ? `` : item}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </Typography>
        <div className="signIn">
          {user === null ? (
            <Link to="/signIn">Sign In</Link>
          ) : (
            <div>
              <div className="logout-drawer" onClick={handleLogout}>
                <LogoutIcon id="#logout" />
                <p>Log Out</p>
              </div>
            </div>
          )}
        </div>
      </Box>
    </div>
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
        {props.pageName === "Dashboard" ? (
          <div className="sharableLink">
            <p>
              {data.length > 0 ? `www.linkinbio.com/${data[0].userName}` : ""}
            </p>
            <div className="icons">
              <div className="openIcon">
                <OpenInNewIcon />
              </div>
              <div className="closeIcon">
                <ShareOutlinedIcon />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
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
