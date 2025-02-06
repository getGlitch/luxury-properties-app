import React from 'react';
import "../assets/stylesheets/header.css"; 
import PropTypes from 'prop-types';
import {WEBSITE_LOGO,WEBSITE_BANNER} from "../utils/constants.js";

function PropertyDetailsHeader({ cartCount }) {

   

  return (
    <div className='header-wrapper'>
        <img 
          src={WEBSITE_BANNER}
          alt='banner' 
          className='image-banner' 
        />
        <div className='website-logo'>
            <img 
              src= {WEBSITE_LOGO}
              width={140} 
              height={90} 
              alt='logo'
            />
        </div>
        <div className='menu-grid'>
        <div className='header-menu'>
            <ul className='header-menu-items'>
                <li className='menu-item'>Contact Us</li>
                <li className='menu-item'>About</li>
            </ul>
        </div>
        <div className="cart-info">
        <span className="cart-icon" style={{cursor:"pointer"}}>🛒</span>
        <span className="cart-count">{cartCount}</span>
      </div>
      </div>
    </div>
  );
}

PropertyDetailsHeader.propTypes = {
    cartCount: PropTypes.number.isRequired,  
  };

export default PropertyDetailsHeader;
