'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  category: '', // Initial state for category text
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload; // Update category text
    },
    resetCategory: (state) => {
      state.category = ''; // Reset category text to an empty string
    },
  },
});


export const { setCategory, resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
