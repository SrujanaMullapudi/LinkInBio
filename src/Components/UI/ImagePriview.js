import React from "react";
import "../../Styles/LinkPreview.css";
function ImagePriview(props) {
  return (
    <div>
      {props.image.length > 0 ? (
        <img src={props.image} alt="" />
      ) : (
        <div className="placeholder"></div>
      )}
    </div>
  );
}

export default ImagePriview;
