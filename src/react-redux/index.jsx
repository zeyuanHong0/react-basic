import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToNum } from "../store/modules/counterStore";
import { fetchGetChannelList } from "../store/modules/channelStore";

const ReactReduxDemo = () => {
  const { count } = useSelector((state) => state.counter);
  const { channelList } = useSelector((state) => state.channel);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetChannelList());
  }, [dispatch]);
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <br />
      <br />
      <button onClick={() => dispatch(addToNum(10))}>add 10</button>
      <button onClick={() => dispatch(addToNum(20))}>add 20</button>
      <br />
      {/* 列表 */}
      <ul>
        {channelList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReactReduxDemo;
