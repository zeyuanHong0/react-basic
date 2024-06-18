import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Link to="/article?name=哲理源">文章</Link>
      <Link to="/login?id=1" style={{ marginLeft: "20px" }}>登录</Link>
      <br />
      <Outlet />
    </div>
  );
};

export default Layout;