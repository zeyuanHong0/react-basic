import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToNum } from "../store/modules/counterStore";
const ReactReduxDemo = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <br />
      <br />
      <button onClick={() => dispatch(addToNum(10))}>add 10</button>
      <button onClick={() => dispatch(addToNum(20))}>add 20</button>
    </div>
  );
};

export default ReactReduxDemo;
