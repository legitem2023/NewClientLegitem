'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  reciever: "", // Initial state for reciever text
};

const recieverSlice = createSlice({
  name: 'reciever',
  initialState,
  reducers: {
    setreciever: (state, action) => {
      state.reciever = action.payload; // Update reciever text
    },
    resetreciever: (state) => {
      state.reciever = ""; // Reset reciever text to an empty string
    },
  },
});


export const { setreciever, resetreciever } = recieverSlice.actions;
export default recieverSlice.reducer;
