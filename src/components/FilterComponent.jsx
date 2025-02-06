
import React, { useState, useEffect } from 'react';
import "../assets/stylesheets/filter.css";
import mockData from "../utils/mock-data.json";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';

const FilterComponent = ({ filters }) => {
  const dispatch = useDispatch();

  const [selectedCity, setSelectedCity] = useState(filters.city);
  const [selectedPrice, setSelectedPrice] = useState(filters.price);
  const [selectedType, setSelectedType] = useState(filters.property_type);

  const cities = [
    ...new Set(mockData['real-estate-data'].listings.map((property) => property.city)),

    
  ];
  
  const prices = [
    'Below Rs10,00,000',
    'Rs10,00,000 - Rs50,00,000',
    'Rs50,00,000 - Rs10,000,000'
  ];
  const propertyTypes = [
      ...new Set(mockData['real-estate-data'].listings.map((property) => property.property_type)),
  ];

  useEffect(() => {
    setSelectedCity(filters.city);
    setSelectedPrice(filters.price);
    setSelectedType(filters.property_type);
  }, [filters]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    dispatch(setFilters({ ...filters, city: e.target.value }));
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
    dispatch(setFilters({ ...filters, price: e.target.value }));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    dispatch(setFilters({ ...filters, property_type: e.target.value }));
  };

  return (
    <div className="filter-container">
      <h2 style={{marginInline:"20px"}}>Filter Properties</h2>
      <div className="filters">
        <div className="filter">
          <label htmlFor="city">City</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="price">Price</label>
          <select id="price" value={selectedPrice} onChange={handlePriceChange}>
            <option value="">Select Price Range</option>
            {prices.map((price, index) => (
              <option key={index} value={price}>{price}</option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="type">Property Type</label>
          <select id="type" value={selectedType} onChange={handleTypeChange}>
            <option value="">Select Property Type</option>
            {propertyTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

FilterComponent.propTypes = {
  filters: PropTypes.shape({
    city: PropTypes.string,
    price: PropTypes.string,
    property_type: PropTypes.string,
  }).isRequired,
};

export default FilterComponent;
