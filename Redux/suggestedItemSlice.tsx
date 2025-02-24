import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./../types/types";

interface SuggestedItemState {
  suggestedItems: CartItem[];
}

const initialState: SuggestedItemState = {
  suggestedItems: [],
};

const suggestedItemSlice = createSlice({
  name: "suggestedItems",
  initialState,
  reducers: {
    addSuggestedItems: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach((newItem) => {
        const existingItem = state.suggestedItems.find(
          (item) => item.id === newItem.id
        );

        if (!existingItem) {
          state.suggestedItems.push({ ...newItem, quantity: 1 });
        }
      });
    },

    removeSuggestedItem: (state, action: PayloadAction<{ id: string }>) => {
      state.suggestedItems = state.suggestedItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    clearSuggestedItems: (state) => {
      state.suggestedItems = [];
    },
  },
});

export const { addSuggestedItems, removeSuggestedItem, clearSuggestedItems } =
  suggestedItemSlice.actions;

export default suggestedItemSlice.reducer;
