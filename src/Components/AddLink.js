import { Alert, AlertTitle } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 as uuid } from "uuid";
import axios from "../axios";
import { isValidUrl } from "./Helpers/urlChecker";
import "../Styles/AddLink.css";

function AddLink() {
  const navigate = useNavigate();
  const [validateInput, setValidateInput] = useState(true);
  const [validURL, setValidURl] = useState(false);
  const [flag, setFlag] = useState(0);
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({
    uid: uuid(),
    name: "",
    link: "",
  });
  const { id } = useParams();

  const handleNameInput = (e) => {
    setData({ ...data, name: e.target.value });
    setValidURl(false);
    setValidateInput(false);
  };
  const handleLinkInput = (e) => {
    setData({ ...data, link: e.target.value });
    setValidURl(false);
    setValidateInput(false);

  };

  const url = `signIn/account/${id}`;

  const sendData = async () => {
    if (data.name.length > 0) {
      console.log(data);
      if (isValidUrl(data.link)) {
        setFlag(1);
        const promise_data = await axios
          .post(`/links/${id}`, data)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setDisable(true);
      } else {
        setValidURl(true);
      }
    }else{
      setValidateInput(true);
    }
  };

  const handleRouterChange = () => {
    navigate(-1);
  };
  const handleSubmit = async () => {
    await sendData();
  };
  return (
    <div className="AddLink">
      <div className="box">
        <p id="header">Add Link</p>

        <input
          required
          disabled={disable}
          type="text"
          placeholder="URL Name"
          onChange={handleNameInput}
        />
        <input
          required
          disabled={disable}
          type="text"
          placeholder="URL Link"
          onChange={handleLinkInput}
        />
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
            <div to={url} onClick={handleRouterChange}>
              {" "}
              click to navigate back{" "}
            </div>
          </Alert>
        ) : (
          <></>
        )}
      </div>
      <div>
        {validateInput ? (
          <Alert
            sx={{ color: "white", width: "300px" }}
            variant="outlined"
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            URL Name cannot be empty — <strong>check it out!</strong>
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AddLink;
