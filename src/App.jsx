// src/App.js
import React,{useEffect,useState} from 'react';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import { setProperties } from './redux/slices/propertiesSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from "./redux/slices/filterSlice";
import PropertyDetails from './components/PropertyDetails.jsx';
import mockData from './utils/mock-data.json';
import PropertyDetailsHeader from './components/PropertyDetailsHeader.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import BreadCrumbs from './components/BreadCrumbs.jsx';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(setProperties(mockData['real-estate-data'].listings));
  }, [dispatch]);
  const filters = useSelector((state) => state.filters);

  const properties = [...mockData['real-estate-data'].listings];


  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };
  const [cartCount, setCartCount] = useState(0);

  
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);  
  }, []);

 
  const filteredProperties = properties.filter((property) => {
    let isCityMatch = true;
    let isPriceMatch = true;
    let isTypeMatch = true;

  
    if (filters.city && property.city !== filters.city) {
      isCityMatch = false;
    }

  
    if (filters.price) {
      if (filters.price === 'Below Rs10,00,000' && property.price >= 1000000) {
        isPriceMatch = false;
      } else if (filters.price === 'Rs10,00,000 - Rs50,00,000' && (property.price < 1000000 || property.price > 5000000)) {
        isPriceMatch = false;
      } else if (filters.price === 'Rs50,00,000 - Rs10,000,000'  && (property.price < 5000000 || property.price > 10000000)) {
        isPriceMatch = false;
      } 
    }

    
    if (filters.property_type && property.property_type !== filters.property_type) {
      isTypeMatch = false;
    }

    return isCityMatch && isPriceMatch && isTypeMatch;
  });

  return (
    <ThemeProvider>
    <Router>
    <div className='main'>
      <Routes>
      <Route path="/" element={
        <>
      <Header onFilterChange={handleFilterChange} filters={filters} cartCount={cartCount}/>
       
        <Body properties={filteredProperties} />
        </>
      } />
          <Route path="/property/:id" element={<><PropertyDetailsHeader cartCount={cartCount}/><PropertyDetails updateCartCount={setCartCount} properties={properties} /></>} />
      </Routes>
    </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
