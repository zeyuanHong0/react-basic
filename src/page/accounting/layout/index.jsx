import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      我是 layout
      <Outlet />
    </div>
  );
};

export default Layout;
