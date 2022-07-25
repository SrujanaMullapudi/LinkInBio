import "../Styles/DisplayPicture.css"
import React from 'react'


import image from '../Images/face.jpg';


function DisplayPicture() {
  return (
    <div className="image">
        <img src={image} alt=""/>
    </div>
  )
}

export default DisplayPicture