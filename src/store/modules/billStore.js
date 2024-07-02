import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },

  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    // 新建账单
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

const fetchBillList = () => {
  return async (dispatch) => {
    const { data } = await axios.get("http://localhost:8001/ka");
    dispatch(setBillList(data));
  };
};

const addBillList = (bill) => {
  return async (dispatch) => {
    const { data } = await axios.post("http://localhost:8001/ka", bill);
    dispatch(addBill(data));
  };
};

const { setBillList, addBill } = billStore.actions;
const billReducer = billStore.reducer;

export { setBillList, addBill, fetchBillList, addBillList };
export default billReducer;
