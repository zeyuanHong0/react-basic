import { createBrowserRouter } from "react-router-dom";
// import layoutRouter from "./layout";
import accountingRouter from "./accounting";

const router = createBrowserRouter([
  // ...layoutRouter,
  // 记账路由
  ...accountingRouter,
]);

export default router;
