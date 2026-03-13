import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      console.log("Incoming product:", item);
      console.log("Current cart:", state.items);

      const existing = state.items.find(
        (i) => Number(i.id) === Number(item.id),
      );

      console.log("Existing item:", existing);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }

      console.log("Updated cart:", state.items);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
