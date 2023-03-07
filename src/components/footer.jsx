import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
  return (
    <div className='footer'>
    <div>
    <a href='/#'><TwitterIcon/></a>
      <a href='/#'><LinkedInIcon/></a>
      <a href='/#'><FacebookIcon/></a>
      <a href='/#'><InstagramIcon/></a>
    </div>
      <p>CopyRight Reserved by Aman &copy;</p>
    </div>
    
  )
}

export default Footer
