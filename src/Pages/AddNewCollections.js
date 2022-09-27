import React, { useState } from "react";
import { storage } from "../Utils/firebase-config";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { v4 } from "uuid";
import { useAuth } from "../Contexts/AuthContext";

import ImagePriview from "../Components/UI/ImagePriview";

import axios from "../axios";
import "../Styles/AddLink.css";

import { Navigate, useNavigate } from "react-router";

function AddNewCollections() {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [tempURL, setTempURL] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    id: v4(),
    collectionName: "",
    photoURL: "",
  });

  const handleCollectionNameChange = (e) => {
    setData({ ...data, collectionName: e.target.value });
    // setCollectionName(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setTempURL(reader.result);
    };
    let imageName = document.getElementById("imageName");
    imageName.innerHTML = e.target.files[0].name;
  };


  const handleImageUpload = async () => {
    if (file == null) return;

    console.log(file);
    setLoading(true);
    const storageRef = ref(storage, `images/${file.name + v4()}`);
    let url = await uploadBytes(storageRef, file).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => {
        setData({ ...data, photoURL: url });
        console.log(true);
        setLoading(false);
      });
    });
    setPhotoURL(url);
  };

  const sendData = async () => {
    let config = {
      headers: {
        userId: user.uid,
      },
    };
    console.log(data);
    if (!loading) {
      await axios.post("/collections/newCollection", data, config).then(res => {
        navigate(-1);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleImageUpload();
  };

  const sendDataHelper = (e) => {
    e.preventDefault();
    sendData();
  };

  return (
    <div className="AddLink">
      <div className="box">
        <form className="AddLink-form" onSubmit={sendDataHelper}>
          <div className="AddLink-URL">
            <label>Enter Collection Name</label>
            <input
              required
              type="text"
              placeholder="URL Name"
              onChange={handleCollectionNameChange}
            />
          </div>
          <div className="AddLink-Collection">
            <label id="lable">Upload Collection Thumbnail</label>
            <label className="imageUpladInput" for="inputTag">
              <UploadFileIcon />
              <input id="inputTag" type="file" onChange={handleFileChange} />
              <span id="imageName" className="margin-left">
                Selet File
              </span>
            </label>
            <div className="linkPreview">
              {tempURL.length > 0 ? (
                <img src={tempURL} alt="" />
              ) : (
                <div className="placeholder"></div>
              )}
              <button className="AddLink-button" onClick={handleSubmit}>
                {loading ? " loading..." : "Upload Thumbnail"}
              </button>
            </div>
          </div>

          <button type="submit">Add New Collection</button>
        </form>
      </div>
    </div>
  );
}

export default AddNewCollections;
