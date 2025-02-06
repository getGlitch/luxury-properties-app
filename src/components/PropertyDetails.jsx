import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';  
import { useNavigate, useParams } from 'react-router-dom';  
import "../assets/stylesheets/propertyDetails.css";
import PropTypes from 'prop-types';
import { setSelectedProperty } from '../redux/slices/propertiesSlice'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function PropertyDetails({ updateCartCount, properties }) {
  const { id } = useParams();  
  const selectedProperty = useSelector((state) => state.properties.selectedProperty);  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    
    const property = properties.find(p => p.property_id === parseInt(id));

    if (property) {

      dispatch(setSelectedProperty(property));
    } else {
      toast.error('Property not found for the provided ID');
      navigate("/");
      
    }
  }, [id, dispatch]);

  if (!selectedProperty || selectedProperty.property_id !== parseInt(id)) {
    return <div className="property-not-found">Property not found or loading...</div>;  
  }
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(selectedProperty); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartCount(cart.length);  
    toast.success('Property added to cart...');
  };
  const goBack = () => {
    navigate("/");  
  };
  return (
    <div className="property-detail-container">
      <button className="back-button" onClick={goBack}>Back to Listings</button>
      <div className="property-detail-header">
        <h2>{selectedProperty.address}</h2>
        <p className="property-location">{selectedProperty.city}</p>
      </div>

      <div className="property-detail-content">
        
        <div className="property-image">
          <img
            src={selectedProperty.property_image}
            alt="property-image"
            className="property-detail-image"
          />
        </div>

        <div className="property-info">
          <p><strong>Buy Price:</strong> ₹{selectedProperty.price.toLocaleString()}</p>
          <p><strong>Rent Price:</strong> ₹{selectedProperty.rent_price.toLocaleString()}</p>
          <p><strong>Property Type:</strong> {selectedProperty.property_type}</p>
          <p><strong>Description:</strong> {selectedProperty.description}</p>
          <button className="add-to-cart-button" onClick={addToCart}>
            Add to Cart
          </button>
         
        </div>
      </div>
    </div>
  );
}
PropertyDetails.propTypes = {
  updateCartCount: PropTypes.func.isRequired,  
  properties: PropTypes.arrayOf(
        PropTypes.shape({
             city: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          property_type: PropTypes.string.isRequired,
        })
      ).isRequired,
};

export default PropertyDetails;
