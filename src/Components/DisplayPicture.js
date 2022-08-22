import "../Styles/DisplayPicture.css"
import React from 'react'


import image from '../Images/face.jpg';


function DisplayPicture(props) {
  return (
    <div className="image">
        <img src={props.imageURL} alt="" referrerPolicy="no-referrer"/>
    </div>
  )
}

export default DisplayPicture