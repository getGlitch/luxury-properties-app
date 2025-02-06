import React from 'react';
import "../assets/stylesheets/PropertyCard.css";
import PropTypes from 'prop-types';

function PropertyCard({ property }) {
  
  return (
    
    <div className="card-container">
  <div className={`tag ${property.property_type.toLowerCase()}`}>
    {property.property_type}
  </div>
  <div className="property-image">
    <img src={property.property_image} alt="property-image" className="prop-image" />
  </div>
  <div className="property-details">
    {property.address + " | " + property.city}
  </div>
</div>
  )
}
PropertyCard.propTypes = {
    property: PropTypes.shape({
      city: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      property_type: PropTypes.string.isRequired,
    }).isRequired,
  };
export default PropertyCard
