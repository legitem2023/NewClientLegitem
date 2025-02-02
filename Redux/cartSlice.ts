import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./../types/types";

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: loadCartFromLocalStorage(), 
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },

    clearCart: (state) => {
      state.cartItems = [];

      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
