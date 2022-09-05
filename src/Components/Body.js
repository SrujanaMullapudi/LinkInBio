// import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "../axios";

import firebase from "firebase/compat/app";
import { useAuth } from "../Contexts/AuthContext";

import Button from "./UI/Button";
import DisplayPicture from "./DisplayPicture";
import "../Styles/Body.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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

function Body(props) {
  const { user } = useAuth();

  let navigate = useNavigate();
  const routerChange = (link) => {
    let path = link;
    navigate(path);
  };
  const [links, setLinks] = useState([{ links: [] }]);
  const [linkDelete, setLinkDelete] = useState(false);
  const { id } = useParams();

  const handleSetDelete = (data) => {
    setLinkDelete(data);
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
      {/* {console.log(user)}
      <DisplayPicture imageURL={user.photoURL} />
      <Footer /> */}

      <div className="Body-links">
        <div className="Body-links-header">
          <p>{`links (${links[0].links.length})`}</p>
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
            />
          </div>
        ))}
      </div>

      {
        <div>
          {console.log(id)}
          <div className="Body-addLink">
            <Fab sx={fabStyle}>
              <Link to={`/AddLinks/${id}`}>
                <AddIcon />
              </Link>
            </Fab>
          </div>

          {/* <Button sx={{width : 400 }} type="outlined" href={url}>Add Link</Button> */}
        </div>
      }
    </div>
  );
}

export default Body;
