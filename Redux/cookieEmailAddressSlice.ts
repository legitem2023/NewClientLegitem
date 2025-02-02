'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cookieEmailAddress: '1', // Initial state for cookieEmailAddress text
};

const cookieEmailAddressSlice = createSlice({
  name: 'cookieEmailAddress',
  initialState,
  reducers: {
    setcookieEmailAddress: (state, action) => {
      state.cookieEmailAddress = action.payload; // Update cookieEmailAddress text
    },
    resetcookieEmailAddress: (state) => {
      state.cookieEmailAddress = ''; // Reset cookieEmailAddress text to an empty string
    },
  },
});


export const { setcookieEmailAddress, resetcookieEmailAddress } = cookieEmailAddressSlice.actions;
export default cookieEmailAddressSlice.reducer;
