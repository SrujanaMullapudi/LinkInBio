import React, { useEffect, useState } from "react";
import axios from "axios";
import { isValidUrl } from "./Helpers/urlChecker";
import "../Styles/LinkPreview.css";

function LinkPreview(props) {
  const [data, setData] = useState({ image: "" });
  const getPreview = async () => {
    if (isValidUrl(props.urlLink)) {
      await axios
        .post("https://api.linkpreview.net", {
          q: props.urlLink,
          key: "7f1c54445800a987aff2a2147394fc59",
        })
        .then((res) => {
          setData(res.data);
          props.imageURL(res.data.image);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setData({ image: "" });
    }
  };
  const handleRemovePreview = () =>{

  }
  useEffect(() => {
    getPreview();
    console.log("hi")
  }, [props.urlLink]);
  return (
    <div className="LinkPreview">
      <div className="LinkPreview-img">
        {data.image.length>0 ? <img src={data.image} alt=""/> : <div className="placeholder"></div>}
      </div>
      <div className="LinkPreview-Action">
        <p onClick={handleRemovePreview}>Remove Preview</p>
      </div>
    </div>
  );
}

export default LinkPreview;
