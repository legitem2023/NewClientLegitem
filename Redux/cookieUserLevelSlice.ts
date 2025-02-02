'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cookieUserLevel: '1', // Initial state for cookieUserLevel text
};

const cookieUserLevelSlice = createSlice({
  name: 'cookieUserLevel',
  initialState,
  reducers: {
    setcookieUserLevel: (state, action) => {
      state.cookieUserLevel = action.payload; // Update cookieUserLevel text
    },
    resetcookieUserLevel: (state) => {
      state.cookieUserLevel = ''; // Reset cookieUserLevel text to an empty string
    },
  },
});


export const { setcookieUserLevel, resetcookieUserLevel } = cookieUserLevelSlice.actions;
export default cookieUserLevelSlice.reducer;
