'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  viewed: '', // Initial state for category text
};

const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    setviewed: (state, action) => {
      state.viewed = action.payload; // Update viewed text
    },
    resetviewed: (state) => {
      state.viewed = ''; // Reset viewed text to an empty string
    },
  },
});


export const { setviewed, resetviewed } = viewedSlice.actions;
export default viewedSlice.reducer;
