'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messagecount: typeof window !== 'undefined' ? Number(localStorage.getItem('messagecount')) || 0 : 0,
};

const messagecountSlice = createSlice({
  name: 'messagecount',
  initialState,
  reducers: {
    setmessagecount: (state, action) => {
      state.messagecount = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('messagecount', action.payload);
      }
    },
    resetmessagecount: (state) => {
      state.messagecount = 0;
      if (typeof window !== 'undefined') {
        localStorage.setItem('messagecount', '0');
      }
    },
  },
});

export const { setmessagecount, resetmessagecount } = messagecountSlice.actions;
export default messagecountSlice.reducer;
