import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStream: null as MediaStream | null, // Store actual live stream
  streamId: null as string | null, // Store unique stream ID
};

const streamingSlice = createSlice({
  name: "streaming",
  initialState,
  reducers: {
    setStreaming: (state, action) => {
      state.activeStream = action.payload.stream;
      state.streamId = action.payload.streamId;
    },
    stopStreaming: (state) => {
      state.activeStream = null;
      state.streamId = null;
    },
  },
});

export const { setStreaming, stopStreaming } = streamingSlice.actions;
export default streamingSlice.reducer;
