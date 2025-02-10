'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStream: null as MediaStream | null, // Store live WebRTC stream
};

const streamingSlice = createSlice({
  name: "streaming",
  initialState,
  reducers: {
    setStreaming: (state, action) => {
      state.activeStream = action.payload;
    },
    stopStreaming: (state) => {
      state.activeStream = null;
    },
  },
});

export const { setStreaming, stopStreaming } = streamingSlice.actions;
export default streamingSlice.reducer;

