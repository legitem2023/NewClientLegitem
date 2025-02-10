'use client'
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  streaming: '', // Initial state for streaming text
};

const streamingSlice = createSlice({
  name: 'streaming',
  initialState,
  reducers: {
    setStreaming: (state, action) => {
      state.streaming = action.payload; // Update streaming text
    },
    resetstreaming: (state) => {
      state.streaming = ''; // Reset streaming text to an empty string
    },
  },
});


export const { setStreaming, resetstreaming } = streamingSlice.actions;
export default streamingSlice.reducer;
