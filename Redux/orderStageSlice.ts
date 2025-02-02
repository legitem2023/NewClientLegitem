'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  orderStage: 'New Order', // Initial state for orderStageSlice text
};

const orderStageSlice = createSlice({
  name: 'orderStage',
  initialState,
  reducers: {
    setorderStage: (state, action) => {
      state.orderStage = action.payload; // Update orderStageSlice text
    },
    resetorderStage: (state) => {
      state.orderStage = ''; // Reset orderStageSlice text to an empty string
    },
  },
});


export const { setorderStage, resetorderStage } = orderStageSlice.actions;
export default orderStageSlice.reducer;
