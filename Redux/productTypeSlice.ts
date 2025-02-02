'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  productType: '', // Initial state for productType text
};

const productTypeSlice = createSlice({
  name: 'productType',
  initialState,
  reducers: {
    setproductType: (state, action) => {
      state.productType = action.payload; // Update productType text
    },
    resetproductType: (state) => {
      state.productType = ''; // Reset productType text to an empty string
    },
  },
});


export const { setproductType, resetproductType } = productTypeSlice.actions;
export default productTypeSlice.reducer;
