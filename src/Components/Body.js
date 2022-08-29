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

function Body(props) {
  const { user } = useAuth();

  let navigate = useNavigate();
  const routerChange = (link) => {
    let path = link;
    navigate(path);
  };
  const [links, setLinks] = useState([{ links: [] }]);
  const [linkDelete, setLinkDelete] = useState(false);
  const {  id } = useParams();

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
      {console.log(user)}
      <DisplayPicture imageURL={user.photoURL} />
      <Footer />

      {console.log(links[0])}
      <div className="Body-links">
        {(
          links[0].links.map((link) => (
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
          ))
        )}
      </div>

      {(
        <div>
          {console.log(id)}
          <Link to={`/AddLinks/${id}`}>Add Links</Link>
          {/* <Button sx={{width : 400 }} type="outlined" href={url}>Add Link</Button> */}
        </div>
      )}
    </div>
  );
}

export default Body;
