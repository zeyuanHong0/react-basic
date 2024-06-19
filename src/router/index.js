import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login";
import Article from "../page/article";
import Layout from "../page/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "article",
        element: <Article />,
      },
    ],
  },
]);

export default router;
