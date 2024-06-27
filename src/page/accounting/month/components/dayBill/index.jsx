import classNames from "classnames";
import "./index.scss";
import dayjs from "dayjs";
import { useMemo } from "react";

const DailyBill = ({ bills, date }) => {
  const dayResult = useMemo(() => {
    // 计算每天的总支出和总收入
    let pay = 0;
    let income = 0;
    if (bills && bills.length > 0) {
      bills.map((item) => {
        if (item.type === "pay") {
          pay += item.money;
        } else if (item.type === "income") {
          income += item.money;
        }
      });
    }
    return { pay, income, balance: income + pay };
  }, [bills]);

  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames("arrow")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.balance}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyBill;
