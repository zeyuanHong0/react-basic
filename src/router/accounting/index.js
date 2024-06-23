import Layout from "@/page/accounting/layout";
import Year from "@/page/accounting/year";
import Month from "@/page/accounting/month";
import New from "@/page/accounting/new";

const accountingRouter = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/year",
        element: <Year />,
      },
      {
        index: true,
        element: <Month />,
      },
    ],
  },
  {
    path: "/new",
    element: <New />,
  },
];

export default accountingRouter;