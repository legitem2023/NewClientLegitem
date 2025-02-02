'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  modal: false, // Initial state for modal text
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setmodal: (state, action) => {
      state.modal = action.payload; // Update modal text
    }
  },
});


export const { setmodal } = modalSlice.actions;
export default modalSlice.reducer;
