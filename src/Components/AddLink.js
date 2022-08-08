import { Alert, AlertTitle } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

import Button from "./UI/Button";
import axios from "../axios";
import { isValidUrl } from "./Helpers/urlChecker";

import "../Styles/AddLink.css";

const textStyle = {
  width: "80%",
  margin: "25px",
};

function AddLink(props) {
  let navigate = useNavigate();
  const routerChange = (link) => {
    let path = link;
    navigate(path);
  };
  const [validURL, setValidURl] = useState(false);
  const [flag,setFlag] = useState(0);
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
  const url = `/links/${id}`;
  const changeLocation = () =>{
    window.location(`/links/${id}`)
  }
  const sendData = async () => {
    console.log("hi");
    if (isValidUrl(data.link)) {
      setFlag(1);
      await axios.post(`/links/${id}`, data).then((res) => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
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
            <a href = {url} > click to navigate back </a>
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AddLink;
