// src/components/Header.js
import React from 'react';
import "../assets/stylesheets/header.css";
import PropTypes from 'prop-types';
import FilterComponent from './FilterComponent';
import { useSelector } from 'react-redux';
import {WEBSITE_LOGO,WEBSITE_BANNER} from "../utils/constants.js";

function Header({ onFilterChange,cartCount}) {
  const filters = useSelector((state) => state.filters);

  return (
    <div className='header-wrapper'>
        <img src={WEBSITE_BANNER} alt='banner' className='image-banner'></img>
        <div className='website-logo'>
            <img src={WEBSITE_LOGO} width={140} height={90} alt='logo'></img>
        </div>
        <div className='menu-grid'>
        <div className='header-menu'>
            <ul className='header-menu-items'>
                <li className='menu-item'>Want to Buy?</li>
                <li className='menu-item'>Want to Rent?</li>
            </ul>
        </div>
        <div className="cart-info">
        <span className="cart-icon" style={{cursor:"pointer"}}>🛒</span>
        <span className="cart-count">{cartCount}</span>
      </div>
      </div>
        <FilterComponent onFilterChange={onFilterChange} filters={filters} />
    </div>
  );
}

Header.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
   cartCount: PropTypes.number.isRequired,
};

export default Header;
