import React from 'react'
import "../Styles/Home.css";
import AuthGoogle from '../Utils/AuthGoogle';
function SignIn() {
  return (
    <div className='home'><AuthGoogle /></div>
  )
}

export default SignIn