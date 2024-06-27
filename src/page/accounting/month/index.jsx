import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";

const useYearMonth = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    const current = new Date();
    setDate(dayjs(current).format("YYYY-MM"));
  }, []);
  return {
    date,
    setDate,
  };
};

const Month = () => {
  const { date, setDate } = useYearMonth();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [total, setTotal] = useState({
    pay: 0,
    income: 0,
  });
  const initTotal = () => {
    setTotal({
      pay: 0,
      income: 0,
    });
  };
  const { billList } = useSelector((state) => state.bill);
  // 对 billList进行处理
  const billListByMonth = useMemo(() => {
    // 按月分组 =>{yyyy-mm:[]}
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  // 计算总额
  const calculateTotal = (list) => {
    if (!list) {
      initTotal();
      return;
    }
    let allPay = 0;
    let allIncome = 0;
    list.map((item) => {
      if (item.type === "pay") {
        allPay += item.money;
      } else if (item.type === "income") {
        allIncome += item.money;
      }
    });
    setTotal({
      pay: allPay,
      income: allIncome,
    });
  };
  // 确认日期
  const handleConfirmDate = (val) => {
    const selectedDate = new Date(val);
    setDate(dayjs(selectedDate).format("YYYY-MM"));
  };

  useEffect(() => {
    calculateTotal(billListByMonth[date]);
  }, [billListByMonth, date]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">{date}月账单</span>
            <span
              className={classNames("arrow", { expand: showDatePicker })}
              onClick={() => handleShowDatePicker()}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{total.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{total.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">
                {(total.pay + total.income).toFixed(2)}
              </span>
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
      </div>
    </div>
  );
};

export default Month;
