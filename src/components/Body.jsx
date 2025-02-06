import React from 'react';
import "../assets/stylesheets/body.css";
import PropTypes from 'prop-types';
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { setSelectedProperty } from '../redux/slices/propertiesSlice'; 



function Body({ properties }) {
  const dispatch = useDispatch(); 
  const filters = useSelector((state => state.filters))

  const handleCardClick = (property) => {
    dispatch(setSelectedProperty(property));
  };
  return (
    <div className='body-wrapper'>
      <div className='filtered-by'>
        <h3>City: <span>{filters.city ? filters.city : "Any"}</span></h3>
        <h3>Price: <span>{filters.price ? filters.price : "Any"}</span></h3>
        <h3>Property Type: <span>{filters.property_type ? filters.property_type : "Any"}</span></h3>
      </div>
      <div className='property-listing'>
        {
           properties.length == 0 ? <div style={{textAlign:"center", width:"100%", fontWeight:"bold"}}>No Property Found....</div> : properties.map((property, index)=>{
               return <Link to={`/property/${property.property_id}`} className="card-link" key={property.property_id} onClick={() => handleCardClick(property)}><PropertyCard property={property} /></Link>
            })
        }
        </div>

    </div>
  )
}
Body.propTypes = {
    properties: PropTypes.arrayOf(
      PropTypes.shape({
           city: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        property_type: PropTypes.string.isRequired,
      })
    ).isRequired,  
  };

export default Body
