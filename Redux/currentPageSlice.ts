'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentPage: '1', // Initial state for currentPage text
};

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setcurrentPage: (state, action) => {
      state.currentPage = action.payload; // Update currentPage text
    },
    resetcurrentPage: (state) => {
      state.currentPage = ''; // Reset currentPage text to an empty string
    },
  },
});


export const { setcurrentPage, resetcurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
