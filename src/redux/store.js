
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filterSlice.js';
import propertiesReducer from './slices/propertiesSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    properties: propertiesReducer
  }
});

export default store;
