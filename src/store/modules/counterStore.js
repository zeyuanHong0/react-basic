import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },

    addToNum(state, action) {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, addToNum } = counterStore.actions;
const counterReducer = counterStore.reducer;
export default counterReducer;
