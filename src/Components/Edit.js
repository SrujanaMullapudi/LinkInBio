import { CircularProgress } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { link } from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../axios";
import "../Styles/AddLink.css";
import { isValidUrl } from "./Helpers/urlChecker";
function Edit() {
  const [linkData, setLinkData] = useState({ name: "", URL: "" });
  const [success, setSuccess] = useState(false);
  const [validURL, setValidURL] = useState(undefined);
  const [name, setName] = useState("");
  const [URL, setURL] = useState("");
  const [loading, setLoading] = useState(false);
  const { uid, linkId } = useParams();
  const navigate = useNavigate();

  const getLinkData = async () => {
    setLoading(true);
    const data = await axios
      .get(`links/Edit/${uid}/${linkId}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    setLinkData(data);
    setName(data[0].name);
    setURL(data[0].link);
    setLoading(false);
  };

  const handleNameChange = (e) => {
    setValidURL(false);
    setSuccess(false);
    setName(e.target.value);
    setLinkData({ name: e.target.value });
  };
  const handleURLChange = (e) => {
    setValidURL(false);
    setSuccess(false);
    setURL(e.target.value);
    setLinkData({...linkData, URL: e.target.value });
  };
  const handleEditSubmit = async () => {
    console.log(linkData);
    if (URL !== undefined) {
      if (isValidUrl(URL)) {
        const data = await axios
          .post(`links/Edit/${uid}/${linkId}`, linkData)
          .then((res) => res.data);
        setSuccess(true);
      } else {
        setURL("");
        setName("");
        setValidURL(true);
      }
    } else if (URL === undefined) {
      const data = await axios
        .post(`links/Edit/${uid}/${linkId}`, linkData)
        .then((res) => res.data);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getLinkData();
    setValidURL(false);
  }, []);
  return (
    <div className="AddLink">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="box">
          <p id="header">Edit Link</p>
          <input placeholder="Enter URL Name" onChange={handleNameChange} name="name" value={name} />
          <input placeholder="Ener URL Link" onChange={handleURLChange} name="URL" value={URL} />
          <button className="button" onClick={handleEditSubmit}>
            Submit
          </button>
          {validURL ? (
            <Alert
              sx={{ color: "white", width: "300px" }}
              variant="outlined"
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              Specify a valid URL — <strong>check it out!</strong>
            </Alert>
          ) : success ? (
            <Alert
              sx={{ color: "white", width: "300px" }}
              variant="outlined"
              severity="success"
            >
              <AlertTitle>Success!!</AlertTitle>
              Your Link Has Been Succesfully Edited{" "}
              <div id="cursor" onClick={handleGoBack}>
                Click To Go Back
              </div>
            </Alert>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default Edit;
