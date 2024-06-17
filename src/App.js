// import ReplyList from "./replyList"; //评论案例
// import ReactReduxDemo from "./react-redux";
// import ShoppingCart from "./shopping-cart";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <div className="App">
      {/* <ReplyList /> */}
      {/* <ReactReduxDemo /> */}
      {/* <ShoppingCart /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
