'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  messagecount: 0, // Initial state for messagecount text
};

const messagecountSlice = createSlice({
  name: 'messagecount',
  initialState,
  reducers: {
    setmessagecount: (state, action) => {
      state.messagecount = action.payload; // Update messagecount text
    },
    resetmessagecount: (state) => {
      state.messagecount = 0; // Reset messagecount text to an empty string
    },
  },
});


export const { setmessagecount, resetmessagecount } = messagecountSlice.actions;
export default messagecountSlice.reducer;
