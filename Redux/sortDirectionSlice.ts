'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  sortDirection: 'asc', // Initial state for sortDirection text
};

const sortDirectionSlice = createSlice({
  name: 'sortDirection',
  initialState,
  reducers: {
    setsortDirection: (state, action) => {
      state.sortDirection = action.payload; // Update sortDirection text
    },
    resetsortDirection: (state) => {
      state.sortDirection = ''; // Reset sortDirection text to an empty string
    },
  },
});


export const { setsortDirection, resetsortDirection } = sortDirectionSlice.actions;
export default sortDirectionSlice.reducer;
