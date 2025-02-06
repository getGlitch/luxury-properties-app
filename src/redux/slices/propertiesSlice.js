import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  selectedProperty: null,  
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.listings = action.payload;
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;  
    },
  },
});

export const { setProperties, setSelectedProperty } = propertiesSlice.actions;

export default propertiesSlice.reducer;
