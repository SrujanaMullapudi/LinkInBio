import { Alert, AlertTitle } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { v4 as uuid } from "uuid";
import axios from "../axios";
import { isValidUrl } from "./Helpers/urlChecker";
import "../Styles/AddLink.css";
import { useAuth } from "../Contexts/AuthContext";

function AddLink() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [validURL, setValidURl] = useState(false);
  const [flag, setFlag] = useState(0);
  const [disable,setDisable] = useState(false);
  const [data, setData] = useState({
    uid: uuid(),
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
  // const setId = () => {
  //   setData({ ...data, uid: uuid() });
  //   setValidURl(false);
  // };
  const url = `/account/${id}`;

  const sendData = async () => {
    console.log("hi");
    if (data.name.length > 0) {
      // setId();
      setDisable(true);
      console.log(data);
      if (isValidUrl(data.link)) {
        setFlag(1);
        await axios
          .post(`/links/${id}`, data)
          .then((res) => {
            console.log(res.data);;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setValidURl(true);
      }
    }
  };

  const handleSubmit = async() => {
    await sendData();
  };
  return (
    <div className="AddLink">
      <div className="box">
        <p id="header">Add Link</p>
        <input disabled={disable} type="text" placeholder="URL Name" onChange={handleNameInput} />
        <input disabled={disable} type="text" placeholder="URL Link" onChange={handleLinkInput} />
        <button disabled={disable} className="button" onClick={handleSubmit}>
          Submit
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
            <a href={url}> click to navigate back </a>
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AddLink;
