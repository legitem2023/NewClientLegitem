'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  collectionItem: '', // Initial state for collectionItem text
};

const collectionItemSlice = createSlice({
  name: 'collectionItem',
  initialState,
  reducers: {
    setcollectionItem: (state, action) => {
      state.collectionItem = action.payload; // Update collectionItem text
    },
    resetcollectionItem: (state) => {
      state.collectionItem = ''; // Reset collectionItem text to an empty string
    },
  },
});


export const { setcollectionItem, resetcollectionItem } = collectionItemSlice.actions;
export default collectionItemSlice.reducer;
