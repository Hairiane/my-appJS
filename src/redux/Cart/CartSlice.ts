import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartSliceState } from "./types";

const initialState: CartSliceState = getCartFromLS();

export const CardSlice = createSlice({
  name: "Card",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;
        console.log(action.payload);
      }
    },
    removeItems: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    removeAllItems: (state, action) => {
      state.items = [];
      state.totalPrice = 0;
    },
    // setSelectedPage: (state, action) => {
    //   state.selectedPage = action.payload;
    // },
    // SetSearchValue: (state, action) => {
    //   state.SearchValue = action.payload;
    // },
  },
});

export const {
  addItem,
  minusItem,
  removeItems,
  removeAllItems,
  // setSelectedPage
  // SetSearchValue,
} = CardSlice.actions;

export default CardSlice.reducer;