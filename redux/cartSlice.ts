import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./types";

const initialState: CartState = {
  cartItems: [
    {
      id: "1",
      name: "1 WHOLE ROASTED CHICKEN",
      price: 289.0,
      quantity: 1,
      image: "https://static.wixstatic.com/media/nsplsh_ca173227ec4945119aa46c490b5b4435~mv2.jpg/v1/fill/w_336,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_ca173227ec4945119aa46c490b5b4435~mv2.jpg",
    },
    {
      id: "2",
      name: "1 WHOLE GRILLED CHICKEN",
      price: 389.0,
      quantity: 1,
      image: "https://static.wixstatic.com/media/nsplsh_ca173227ec4945119aa46c490b5b4435~mv2.jpg/v1/fill/w_336,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_ca173227ec4945119aa46c490b5b4435~mv2.jpg",
    },
  ],
  deliveryFee: 28.0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;