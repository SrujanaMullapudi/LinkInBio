import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { Snackbar,Alert, AlertTitle } from "@mui/material";

import "../Styles/Home.css";
function Home() {
  const [flag, setFlag] = useState(false);
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const id = uuidv4();
  const handleSubmit = () => {
    setUrl(`/links/${id}`);
    setFlag(true);
  };
  const handleClose = ()=>{
    setOpen(false);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://kindalinktree.netlify.app${url}`);
    setOpen(true);
  }
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
          <button className="button" onClick={handleSubmit}>
            create Tree
          </button>
          {flag !== false ? (
            <Alert
              sx={{ color: "white", width: "300px" }}
              variant="outlined"
              severity="success"
            >
              <AlertTitle>success</AlertTitle>
              Your tree has been created — <strong>check it out!</strong>{" "}
              <p
                id="copy"
                onClick={copyToClipboard}
              >
                Copy your link: https://kindalinktree.netlify.app{url}
              </p>{" "}
              <a href={url}> click to navigate </a>
            </Alert>
          ) : (
            <></>
          )}
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" , backgroundColor: "green"}}
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
