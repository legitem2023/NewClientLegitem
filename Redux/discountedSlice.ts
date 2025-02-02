'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  discounted: '', // Initial state for discounted text
};

const discountedSlice = createSlice({
  name: 'discounted',
  initialState,
  reducers: {
    setdiscounted: (state, action) => {
      state.discounted = action.payload; // Update discounted text
    },
    resetdiscounted: (state) => {
      state.discounted = ''; // Reset discounted text to an empty string
    },
  },
});


export const { setdiscounted, resetdiscounted } = discountedSlice.actions;
export default discountedSlice.reducer;
