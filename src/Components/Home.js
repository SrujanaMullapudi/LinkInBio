import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

import axios from "../axios";
import "../Styles/Home.css";
function Home() {
  const [data, setNameData] = useState({name:""});
  const [availableUsername, setAvailableUsername] = useState(false);
  const [flag, setFlag] = useState(false);
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const id = uuidv4();
  const handleInputChange = (event) => {
    setNameData({name:event.target.value});
    setFlag(false);
    setAvailableUsername(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://kindalinktree.netlify.app${url}`);
    setOpen(true);
  };

  const checkUsernameAvailable = async () => {
    const apiData = await axios
      .post("/links/checkusername",data)
      .then((res) => res.data);
      if(apiData.message === "username already present"){
        setAvailableUsername(true);
      }else{
        setUrl(`/links/${data.name}`);
        setFlag(true);
      }
  };
  return (
    <div className="home">
      <div className="App">
        <p>Create Your Tree.</p>
        <div className="box">
          {/* <input
            type="text"
            placeholder="Add Your Tree Name"
            onChange={handleNameInput}
          /> */}
          <input onChange={handleInputChange} placeholder="Enter Your Name" />
          <button className="button" onClick={checkUsernameAvailable}>
            create Tree
          </button>
          {flag !== false ? (
            <Alert
              sx={{ color: "white", width: "300px", marginBottom: "30px" }}
              variant="outlined"
              severity="success"
            >
              <AlertTitle>success</AlertTitle>
              Your tree has been created — <strong>check it out!</strong>{" "}
              <p id="copy" onClick={copyToClipboard}>
                Copy your link: https://kindalinktree.netlify.app{url}
              </p>{" "}
              <a href={url}> click to navigate </a>
            </Alert>
          ) : (
            <></>
          )}
          {availableUsername !== false ? (
            <Alert
              sx={{ color: "white", width: "300px", marginBottom: "30px" }}
              variant="outlined"
              severity="error"
            >
              <AlertTitle>Oopsy</AlertTitle>
              Your Username is Already Present please try a different one{" "}
            </Alert>
          ) : (
            <></>
          )}
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", backgroundColor: "green" }}
          >
            Your Link is Copied to Clipboard
          </Alert>
        </Snackbar>
        {/* <Input button={buttonName} /> */}
      </div>
    </div>
  );
}

export default Home;
