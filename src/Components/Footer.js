import React from 'react'

import InstagramIcon from '@mui/icons-material/Instagram'; 
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';

import "../Styles/Footer.css";

function Footer() {
  return (
    <div className='Footer'>
      <InstagramIcon fontSize="large"/>
      <TwitterIcon fontSize="large"/>
      <YouTubeIcon fontSize="large" />
      <EmailIcon fontSize="large" />
    </div>
  )
}

export default Footer