import { Alert, AlertTitle } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";

import Button from "./UI/Button";
import axios from "../axios";
import { isValidUrl } from "./Helpers/urlChecker";

import "../Styles/AddLink.css";

const textStyle = {
  width: "80%",
  margin: "25px",
};

function AddLink(props) {
  const [validURL, setValidURl] = useState(false);
  let flag = 0;
  const [data, setData] = useState({
    uid: props.id,
    name: "",
    link: "",
  });
  const { id } = useParams();
  const handleNameInput = (e) => {
    setData({ ...data, name: e.target.value });
    setValidURl(false);
  };
  const handleLinkInput = (e) => {
    setData({ ...data, link: e.target.value });
    setValidURl(false);
  };
  const sendData = () => {
    console.log("hi");
    if (isValidUrl(data.link)) {
      flag = 1;
      axios.post(`/links/${id}`, data).then(() => {});
      window.location = `/links/${id}`;
    } else {
      setValidURl(true);
    }
  };

  const handleSubmit = () => {
    sendData();
  };
  return (
    <div className="AddLink">
      <div className="box">
        <p>Add Link</p>
        <input
          type="text"
          placeholder="Add URL Name"
          onChange={handleNameInput}
        />
        <input
          type="text"
          placeholder="Add URL Link"
          onChange={handleLinkInput}
        />
        <button className="button" onClick={handleSubmit}>
          AddLink
        </button>
      </div>
      <div>
        {validURL ? (
          <Alert
            sx={{ color: "white", width: "300px" }}
            variant="outlined"
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            Specify a valid URL — <strong>check it out!</strong>
          </Alert>
        ) : flag !== 0 ? (
          <Alert
            sx={{ color: "white", width: "300px" }}
            variant="outlined"
            severity="success"
          >
            <AlertTitle>success</AlertTitle>
            Your URL has been added to your tree —{" "}
            <strong>check it out!</strong>
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AddLink;
