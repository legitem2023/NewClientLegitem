import { createSlice, PayloadAction } from "@reduxjs/toolkit"; import { CartItem } from "./../types/types";

interface SuggestedItemState { suggestedItems: CartItem[]; }

const initialState: SuggestedItemState = { suggestedItems: [], };

const suggestedItemSlice = createSlice({ name: "suggestedItem", initialState, reducers: { addSuggestedItem: (state, action: PayloadAction<CartItem>) => { const existingItem = state.suggestedItems.find( (item) => item.id === action.payload.id ); if (!existingItem) { state.suggestedItems.push({ ...action.payload, quantity: 1 }); } },

removeSuggestedItem: (state, action: PayloadAction<{ id: string }>) => {
  state.suggestedItems = state.suggestedItems.filter(
    (item) => item.id !== action.payload.id
  );
},

clearSuggestedItems: (state) => {
  state.suggestedItems = [];
},

}, });

export const { addSuggestedItem, removeSuggestedItem, clearSuggestedItems } = suggestedItemSlice.actions;

export default suggestedItemSlice.reducer;

