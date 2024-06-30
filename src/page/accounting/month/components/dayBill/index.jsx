import classNames from "classnames";
import "./index.scss";
import { useMemo } from "react";
import { billTypeToName } from "@/page/accounting/common";
import { useState, forwardRef, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Icon from "@/page/accounting/components/icon";

const BillList = forwardRef(({ bills }, ref) => (
  <div ref={ref} className="billList">
    {bills.map((item) => (
      <div className="bill" key={item.id}>
        <Icon type={item.useFor} />
        <div className="detail">
          <div className="billType">{billTypeToName[item.useFor]}</div>
        </div>
        <div className={classNames("money", item.type)}>
          {item.money.toFixed(2)}
        </div>
      </div>
    ))}
  </div>
));

const DailyBill = ({ bills, date }) => {
  const nodeRef = useRef(null);
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

  // 是否展示单日列表
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span
            className={classNames("arrow", { expand: showDetail })}
            onClick={() => setShowDetail(!showDetail)}
          ></span>
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
      {/* 单日列表 */}
      <TransitionGroup>
        {showDetail && (
          <CSSTransition nodeRef={nodeRef} timeout={300} classNames="fade">
            <BillList ref={nodeRef} bills={bills} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
export default DailyBill;
