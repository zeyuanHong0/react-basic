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
  const { billList } = useSelector((state) => state.bill);
  // 对 billList进行处理
  const billListByMonth = useMemo(() => {
    // 按月分组 =>{yyyy-mm:[]}
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log(billListByMonth);
  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleConfirmDate = (val) => {
    const selectedDate = new Date(val);
    setDate(dayjs(selectedDate).format("YYYY-MM"));
    setShowDatePicker(false);
  };
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
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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
            onCancel={() => setShowDatePicker(false)}
            onConfirm={handleConfirmDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
