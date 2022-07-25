import React from 'react'

import "../../Styles/Button.css";

function Button(props) {
  return (
    <div className='button'>
        <a href={props.url}><button onClick={props.handleSubmit}>{props.name}</button></a>
    </div>
  )
}

export default Button