'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state
interface TabState {
  TabA: number;
  TabB: number;
  TabC: number;
  TabD: number;
}

// Initial state
const initialState: TabState = {
  TabA: 0,
  TabB: 0,
  TabC: 0,
  TabD: 0,
};

// Create the slice
const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabValue: (state, action: PayloadAction<{ tab: keyof TabState; value: number }>) => {
      const { tab, value } = action.payload;
      state[tab] = value;
    },
    resetTabs: (state) => {
      state.TabA = 0;
      state.TabB = 0;
      state.TabC = 0;
      state.TabD = 0;
    },
  },
});

// Export actions and reducer
export const { setTabValue, resetTabs } = tabSlice.actions;
export default tabSlice.reducer;
