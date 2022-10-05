import { Alert, AlertTitle } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 as uuid } from "uuid";
import axios from "../axios";
import { isValidUrl } from "./Helpers/urlChecker";
import LinkPreview from "./LinkPreview";
import "../Styles/AddLink.css";
import { getDefaultExpiryDate } from "./Helpers/DateExpiryHelper";
import {useAuth} from "../Contexts/AuthContext";

function AddLinkProffessional() {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [validateInput, setValidateInput] = useState(true);
  const [validURL, setValidURl] = useState(false);
  const [flag, setFlag] = useState(0);
  const [disable, setDisable] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [date,setDate] = useState("");
  const [loading,setLoading] = useState(false);
  const [dateFlag, setDateFlag] = useState(false);
  const [data, setData] = useState({
    id: uuid(),
    name: "",
    link: "",
    imageURL: "",
    CouponCode: "",
    OfferType: "",
    OfferValue: "",
    CouponCodeExipry: getDefaultExpiryDate(),
    CouponCriteria: "",
    type: "Professional Link",
  });

  const {uid,linkId} = useParams();

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

  const imageURL = (previewimagURL) => {
    setData({ ...data, imageURL: previewimagURL });
  };
  const handleOfferTypeChange = (e) => {
    setData({ ...data, OfferType: e.target.value });
  };
  const handleOfferValue = (e) => {
    setData({ ...data, OfferValue: e.target.value });
  };
  const handleExpiryChange = (e) =>{
    setDateFlag(true);
    let date = new Date(e.target.value);
    console.log(date.toISOString(e.target.value))
    setData({ ...data, CouponCodeExipry: date.toISOString() });
    setDate(e.target.value);
  }

  const handleCouponCriteria = (e) =>{
    setData({ ...data, CouponCriteria: e.target.value });

  }
  const handleCouponCode = (e) =>{
    setData({ ...data, CouponCode: e.target.value });
    console.log(data);

  }

  const url = `signIn/account/${uid}`;

  const sendData = async () => {
    if (data.name.length > 0) {
      console.log(data);
      if (isValidUrl(data.link)) {
        setFlag(1);
        const promise_data = await axios
          .post(`links/Edit/${uid}/${linkId}`, data)
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
    } else {
      setValidateInput(true);
    }
  };

 
  const handleRouterChange = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
  };
  const getLinkData = async () => {
    setLoading(true);
    const res_data = await axios
      .get(`links/Edit/${uid}/${linkId}`)
      .then((res) => {
        setLoading(false);
        return res.data;
      })
      .catch((error) => console.log(error));

    setData(res_data[0]);
    console.log(data);
  };
  useEffect(() => {
    getLinkData();
  }, []);
  return (
    <div className="AddLink">
      <div className="box">
        <form className="AddLink-form">
          <div className="AddLink-URL">
            <label>Enter URL Name</label>
            <input
              required
              disabled={disable}
              value={data.name}
              type="text"
              placeholder="URL Name"
              onChange={handleNameInput}
            />
          </div>
          <div className="AddLink-URL">
            <label>Enter URL Link</label>
            <input
              required
              disabled={disable}
              value={data.link}
              type="text"
              placeholder="URL Link"
              onChange={handleLinkInput}
            />
          </div>
          <div className="linkPreview">
            <LinkPreview imageURL={imageURL} urlLink={data.link} />
          </div>
          <div className="OfferType">
            <label>Offer Type</label>
            <div className="Dropdown">
              <select
                onChange={handleOfferTypeChange}
                value={data.OfferType}
                placeholder="Select Type"
              >
                <option value="Select Type">Select Type</option>
                <option value="Percentage Discount">Percentage Discount</option>
                <option value="Flat Discount">Flat Discount</option>
              </select>
              <div className="Offer_Value">
                <input
                  type="text"
                  placeholder="Enter Value Here"
                  onChange={handleOfferValue}
                  value={data.OfferValue}
                />
              </div>
            </div>
          </div>
          <div className="NormalInputDiv">
            <label>Coupon Code</label>
            <input type="text" placeholder="Type Here" value={data.CouponCode} onChange={handleCouponCode}/>
          </div>
          <div className="Date">
            <label>Coupon Expiry Date</label>
            <div className="Date_actions">
              <div className="Date_actions_input">{console.log(data)}
                <input type="date" placeholder="Date"  value={!dateFlag?data.CouponCodeExipry.substring(0,10):date} onChange={handleExpiryChange}/>
              </div>
              <div className="Date_actions_checkbox">
                <label>Default 90 Days</label>
                <input
                  type="checkbox"
                  placeholder="Enter Value Here"
                  checked={true}
                  // onChange={handleToggle}
                />
              </div>
            </div>
          </div>
          <div className="NormalInputDiv">
            <label>Coupon Criteria</label>
            <input type="text" placeholder="Type Here" value={data.CouponCriteria} onChange={handleCouponCriteria}/>
          </div>
          <button
            type="submit"
            className="AddLink-button"
            onClick={handleSubmit}
          >
            Done
          </button>
        </form>
      </div>
      <div>
        {validURL ? (
          <Alert
            sx={{ color: "black", width: "300px" }}
            variant="outlined"
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            Specify a valid URL — <strong>check it out!</strong>
          </Alert>
        ) : flag !== 0 ? (
          <Alert
            sx={{ color: "black", width: "300px" }}
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
            sx={{ color: "black", width: "300px" }}
            variant="outlined"
            severity="error"
          >
            <AlertTitle>
              <b>Error</b>
            </AlertTitle>
            URL Name cannot be empty — <strong>check it out!</strong>
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AddLinkProffessional;
