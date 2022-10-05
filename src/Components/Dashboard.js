// import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "../axios";

import firebase from "firebase/compat/app";
import { useAuth } from "../Contexts/AuthContext";

import Collections from "./Collections";

import Button from "./UI/Button";
import DisplayPicture from "./DisplayPicture";
import "../Styles/Body.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Divider, Drawer, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";

const fabStyle = {
  position: "absolute",
  bottom: 20,
  right: 30,
  backgroundColor: "white",
  "@media(max-width:480px)": {
    bottom: 25,
    right: 25,
  },
  "&:hover": {
    backgroundColor: "#CFD2CF",
    color: "black",
  },
};

const addStyle = {
  color: "black",
};

function Dashboard(props) {
  const { user } = useAuth();

  let navigate = useNavigate();
  const routerChange = (link) => {
    let path = link;
    navigate(path);
  };
  const [links, setLinks] = useState([{ links: [], collections:[] }]);
  const [linkDelete, setLinkDelete] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { id } = useParams();

  const handleSetDelete = (data) => {
    setLinkDelete(data);
  };
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const getLinks = async () => {
    console.log("in get links");
    const data = await axios.get(`/links/${id}`).then((res) => res.data);
    console.log(data, id);
    if (data.length === 0) {
      console.log(data.length);
      navigate("/createLink");
    }
    if (data[0].links !== undefined) {
      setLinks(data);
    }
  };

  useEffect(() => {
    console.log("hi");
    getLinks();
  }, [user, linkDelete]);

  return (
    <div className="Body">
    <div className="Collections">
      <Collections data={links} />
    </div>
      <div className="Body-links">
        <div className="Body-links-header">
          <p>{`Links (${links[0].links.length})`}</p>
          <div className="Body-links-button" onClick={handleDrawerOpen}>
            <a>Add Link</a>
          </div>
        </div>
        {links[0].links.map((link) => (
          <div className="Body-button">
            <Button
              key={link.id}
              idx={link.id}
              delete={linkDelete}
              handleSetDelete={handleSetDelete}
              user={user}
              url={link.link}
              onClick={() => routerChange(link.link)}
              name={link.name}
              type={link.type}
              imageURL={link.imageURL}
              CouponCriteria={link.CouponCriteria}
            />
          </div>
        ))}
        <div>
          <Drawer
            anchor="bottom"
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerClose}
          >
            <Box
              sx={{ width: "auto" }}
              role="presentation"
              onClick={handleDrawerClose}
              onKeyDown={handleDrawerClose}
            >
              <div className="Link">
                <Link to={`/AddLinksProfessional/${id}`}>Add Proffessional Link</Link>
              </div>
              <Divider />
              <div className="Link">
                <Link to={`/AddLinks/${id}`}>Add Simple Link</Link>
              </div>
            </Box>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// {
//   <div>
//     {console.log(id)}
//     <div className="Body-addLink">
//       <Fab sx={fabStyle}>
//         <Link to={`/AddLinks/${id}`}>
//           <AddIcon />
//         </Link>
//       </Fab>
//     </div>

//     {/* <Button sx={{width : 400 }} type="outlined" href={url}>Add Link</Button> */}
//   </div>
// }
