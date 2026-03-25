import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "@/utils/types";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const price = Number(action.payload.price ?? 0);
        const finalPrice = Number(
          action.payload.finalPrice ?? action.payload.price ?? 0,
        );

        state.items.push({
          ...action.payload,
          price,
          finalPrice,
          quantity: 1,
        });
      }
    },
    decreaseFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, decreaseFromCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
