import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const shoppingCartStore = createSlice({
  name: "shoppingCart",
  initialState: {
    foodsList: [],
    activeIndex: 0,
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

const { setFoodsList, changeActiveIndex } = shoppingCartStore.actions;
const shoppingCartReducer = shoppingCartStore.reducer;

const fetchGetFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8000/takeaway");
    dispatch(setFoodsList(res.data));
  };
};

export { setFoodsList, changeActiveIndex, fetchGetFoodsList };
export default shoppingCartReducer;
