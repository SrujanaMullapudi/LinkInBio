// import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "../axios";

import Button from "./UI/Button";
import DisplayPicture from "./DisplayPicture";
import "../Styles/Body.css";
import Footer from "./Footer";

function Body() {
  let navigate = useNavigate();
  const routerChange = (link) => {
    let path = link;
    navigate(path);
  };
  const [links, setLinks] = useState([{ links: [] }]);
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const url = `/AddLinks/${id}`;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClick = (link) => {
    window.location = "www.google.com";
  };
  const getLinks = async () => {
    const data = await axios.get(`/links/${id}`).then((res) => res.data);
    console.log(data);
    if (data[0].links !== undefined) {
      setLinks(data);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="Body">
      <DisplayPicture />
      {console.log(links[0])}
      {links[0].links.length <= 4 ? (
        links[0].links.map((link) => (
          <div>
            <Button
              url={link.link}
              onClick={() => routerChange(link.link)}
              name={link.name}
            />
          </div>
        ))
      ) : (
        <div></div>
      )}
      {links[0].links.length < 4 ? (
        <div>
          <Button url={url} name="Add Link" />
          {/* <Button sx={{width : 400 }} type="outlined" href={url}>Add Link</Button> */}
        </div>
      ) : (
        <div>Greater Than four</div>
      )}
      <Footer />
    </div>
  );
}

export default Body;
