import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  price: '',
  property_type: ''
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.city = action.payload.city;
      state.price = action.payload.price;
      state.property_type = action.payload.property_type;
    }
  }
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
