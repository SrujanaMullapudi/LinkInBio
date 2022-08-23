import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import firebase from "firebase/compat/app";
import axios from "../axios";
import "../Styles/Home.css";
import {useAuth} from "../Contexts/AuthContext";

function CreateLink() {
  const {user} = useAuth();
  const [data, setData] = useState({ name: "", uid: "" });
  const [availableUsername, setAvailableUsername] = useState(false);
  const [flag, setFlag] = useState(false);
  const [url, setUrl] = useState("");
  const [publicURL, setPublicURL] = useState("");

  const [open, setOpen] = useState(false);
  const id = uuidv4();


  const handleInputChange = (event) => {
    setData({ name: event.target.value, uid: user.uid, photoURL: user.photoURL });
    console.log(data);
    setFlag(false);
    setAvailableUsername(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://kindalinktree.netlify.app${publicURL}`);
    setOpen(true);
  };

  const checkUsernameAvailable = async () => {
    if (data.name.length !== 0) {
      const apiData = await axios
        .post("/links/checkusername", data)
        .then((res) => res.data);
      if (apiData.message === "username already present") {
        setAvailableUsername(true);
      } else {
        setPublicURL(`public/${data.name}`);
        setUrl(`signIn/account/${data.uid}`);
        setFlag(true);
      }
    }else{
      
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
                Copy your link: https://kindalinktree.netlify.app{publicURL}
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

export default CreateLink;
