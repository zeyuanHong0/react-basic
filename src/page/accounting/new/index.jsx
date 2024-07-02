import { Button, DatePicker, Input, NavBar, Toast } from "antd-mobile";
import Icon from "@/page/accounting/components/icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/page/accounting/common";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addBillList } from "@/store/modules/billStore";

const New = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("pay");
  const [money, setMoney] = useState(undefined);
  const [useFor, setUseFor] = useState("");

  // 提交账单
  const handleSubmit = () => {
    if (!useFor) {
      Toast.show({
        content: "请选择一个类别",
      });
      return;
    }
    if (!money) {
      Toast.show({
        content: "请输入金额",
      });
      return;
    }
    const bill = {
      type,
      money: type === "pay" ? -money : money,
      date: new Date(),
      useFor,
      id: uuidv4(),
    };
    dispatch(addBillList(bill));
    navigate(-1);
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames({ selected: type === "pay" })}
            onClick={() => setType("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames({ selected: type === "income" })}
            shape="rounded"
            onClick={() => setType("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{"今天"}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(val) => setMoney(Number(val))}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[type].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames("item", {
                        selected: useFor === item.type,
                      })}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={handleSubmit}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
