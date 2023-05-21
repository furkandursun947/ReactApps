import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)
      if (index >= 0)
      {
        let newBasket = [...state.items];
        newBasket.splice(index, 1);
        console.log(newBasket)
        state.items = newBasket;
      }
      else {
        console.warn("Can not remove the product. Not in the basket.")
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;


export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
