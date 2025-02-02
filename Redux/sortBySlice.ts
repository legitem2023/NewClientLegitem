'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  sortBy: 'price', // Initial state for sortBy text
};

const sortBySlice = createSlice({
  name: 'sortBy',
  initialState,
  reducers: {
    setsortBy: (state, action) => {
      state.sortBy = action.payload; // Update sortBy text
    },
    resetsortBy: (state) => {
      state.sortBy = ''; // Reset sortBy text to an empty string
    },
  },
});


export const { setsortBy, resetsortBy } = sortBySlice.actions;
export default sortBySlice.reducer;
