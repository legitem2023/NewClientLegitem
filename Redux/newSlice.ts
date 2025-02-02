'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  new: '', // Initial state for new text
};

const newSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {
    setnew: (state, action) => {
      state.new = action.payload; // Update new text
    },
    resetnew: (state) => {
      state.new = ''; // Reset new text to an empty string
    },
  },
});


export const { setnew, resetnew } = newSlice.actions;
export default newSlice.reducer;
