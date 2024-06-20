import { createBrowserRouter } from "react-router-dom";
import Login from "../page/layout/login";
import Article from "../page/layout/article";
import Layout from "../page/layout";
import NotFound from "../page/layout/notFound";

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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
