import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login";
import Article from "../page/article";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/article",
    element: <Article />,
  },
]);

export default router;
