'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  page: '',
};

const pageTitleSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPageTitle: (state, action) => {
      state.page = action.payload;
    }
  },
});


export const { setPageTitle } = pageTitleSlice.actions;
export default pageTitleSlice.reducer;
