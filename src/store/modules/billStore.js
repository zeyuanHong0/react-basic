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
  },
});

const fetchBillList = () => {
  return async (dispatch) => {
    const { data } = await axios.get("http://localhost:8001/ka");
    dispatch(setBillList(data));
  };
};

const { setBillList } = billStore.actions;
const billReducer = billStore.reducer;

export { setBillList, fetchBillList };
export default billReducer;
