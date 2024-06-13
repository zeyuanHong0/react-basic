import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterStore";
import channelReducer from "./modules/channelStore";
import shoppingCartReducer from "./modules/shoppingCartStore";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    channel: channelReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export default store;
