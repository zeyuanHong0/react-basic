import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";
import DailyBill from "./components/dayBill";

const Month = () => {
  const { billList } = useSelector((state) => state.bill);
  // 对 billList进行处理
  const billListByMonth = useMemo(() => {
    // 按月分组 =>{yyyy-mm:[]}
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs().format("YYYY-MM")
  );
  const [currentMonthList, setCurrentMonthList] = useState([]);

  const overview = useMemo(() => {
    console.log("重新计算了");
    // 计算每个月的总支出和总收入
    let pay = 0;
    let income = 0;
    if (currentMonthList && currentMonthList.length > 0) {
      currentMonthList.map((item) => {
        if (item.type === "pay") {
          pay += item.money;
        } else if (item.type === "income") {
          income += item.money;
        }
      });
    }
    return { pay, income, balance: income + pay };
  }, [currentMonthList]);

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };
  // 确认日期
  const handleConfirmDate = (val) => {
    const monthKey = dayjs(val).format("YYYY-MM");
    setCurrentDate(monthKey);
    setCurrentMonthList(billListByMonth[monthKey]);
  };

  useEffect(() => {
    const list = billListByMonth[dayjs().format("YYYY-MM")];
    console.log(list);
    if (list && list.length > 0) {
      setCurrentMonthList(list);
    }
  }, [billListByMonth]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">{currentDate}月账单</span>
            <span
              className={classNames("arrow", { expand: showDatePicker })}
              onClick={() => handleShowDatePicker()}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{overview.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{overview.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{overview.balance.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={showDatePicker}
            max={new Date()}
            onClose={() => setShowDatePicker(false)}
            onConfirm={handleConfirmDate}
          />
        </div>
        {/* 日账单 */}
        <DailyBill />
      </div>
    </div>
  );
};

export default Month;
