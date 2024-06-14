import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const shoppingCartStore = createSlice({
  name: "shoppingCart",
  initialState: {
    foodsList: [],
    activeIndex: 0,
    cartList: [],
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    // 添加商品
    addToCart(state, action) {
      // 判断购物车中是否有该商品
      const index = state.cartList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        state.cartList[index].count += 1;
      } else {
        action.payload.count = 1;
        state.cartList.push(action.payload);
      }
    },

    // 减少商品
    reduceCart(state, action) {
      const index = state.cartList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        if (state.cartList[index].count === 1) {
          state.cartList.splice(index, 1);
        } else {
          state.cartList[index].count -= 1;
        }
      }
    },

    // 清空购物车
    clearCart(state) {
      state.cartList = [];
    },
  },
});

const { setFoodsList, changeActiveIndex, addToCart, reduceCart, clearCart } =
  shoppingCartStore.actions;
const shoppingCartReducer = shoppingCartStore.reducer;

const fetchGetFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8000/takeaway");
    dispatch(setFoodsList(res.data));
  };
};

export {
  setFoodsList,
  changeActiveIndex,
  addToCart,
  reduceCart,
  clearCart,
  fetchGetFoodsList,
};
export default shoppingCartReducer;
