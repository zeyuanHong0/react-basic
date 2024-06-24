import { Outlet, useNavigate } from "react-router-dom";
import { fetchBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TabBar } from "antd-mobile";
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from "antd-mobile-icons";
import "./index.scss";

const Bottom = () => {
  const navigate = useNavigate();
  const handleChangeTab = (key) => {
    navigate(key);
  };
  const tabs = [
    {
      key: "/",
      title: "月度",
      icon: <BillOutline />,
    },
    {
      key: "/new",
      title: "新建",
      icon: <AddCircleOutline />,
    },
    {
      key: "/year",
      title: "年度",
      icon: <CalculatorOutline />,
    },
  ];
  return (
    <TabBar onChange={(key) => handleChangeTab(key)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);
  return (
    <div className="page">
      <div className="content-wrap">
        <Outlet />
      </div>
      <div className="bottom">
        <Bottom />
      </div>
    </div>
  );
};

export default Layout;
