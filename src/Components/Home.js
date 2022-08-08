import { create } from "@mui/material/styles/createTransitions";
import React, { useState } from "react";
import SearchAppBar from "./UI/Appbar";
import Input from "./UI/Input";
import { v4 as uuidv4 } from "uuid";
import { Alert, AlertTitle } from "@mui/material";

import "../Styles/Home.css";
function Home() {
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(false);
  const [url,setUrl] = useState("");
  const handleNameInput = (e) => {
    setInput(e.target.value);
  };
  const id = uuidv4();
  const handleSubmit = () => {
    setUrl(`/links/${id}`)
    setFlag(true);
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
              Your tree has been created — <strong>check it out!</strong>
              <strong>
                <a href={url}> click to navigate back </a>
              </strong>
            </Alert>
          ) : (
            <></>
          )}
        </div>

        {/* <Input button={buttonName} /> */}
      </div>
    </div>
  );
}

export default Home;
