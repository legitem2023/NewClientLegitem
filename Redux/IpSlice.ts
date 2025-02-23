"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ipAddress: "", // Initial state for visitor's IP
};

const ipSlice = createSlice({
  name: "ip",
  initialState,
  reducers: {
    setIpAddress: (state, action) => {
      state.ipAddress = action.payload; // Store visitor's IP
    },
    resetIpAddress: (state) => {
      state.ipAddress = ""; // Reset IP address
    },
  },
});

export const { setIpAddress, resetIpAddress } = ipSlice.actions;
export default ipSlice.reducer;
