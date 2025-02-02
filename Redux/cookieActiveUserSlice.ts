'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cookieActiveUser: '1', // Initial state for cookieActiveUser text
};

const cookieActiveUserSlice = createSlice({
  name: 'cookieActiveUser',
  initialState,
  reducers: {
    setcookieActiveUser: (state, action) => {
      state.cookieActiveUser = action.payload; // Update cookieActiveUser text
    },
    resetcookieActiveUser: (state) => {
      state.cookieActiveUser = ''; // Reset cookieActiveUser text to an empty string
    },
  },
});


export const { setcookieActiveUser, resetcookieActiveUser } = cookieActiveUserSlice.actions;
export default cookieActiveUserSlice.reducer;
