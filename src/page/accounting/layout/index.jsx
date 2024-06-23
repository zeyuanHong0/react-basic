import { Outlet } from "react-router-dom";
import { fetchBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);
  return (
    <div>
      我是 layout
      <Outlet />
    </div>
  );
};

export default Layout;
