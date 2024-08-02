import { useReducer } from "react";

const UseReducerDemo = () => {
  const countReducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      case "SET":
        return action.payload;
      default:
        return state;
    }
  };
  const [count, dispatch] = useReducer(countReducer, 0);

  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "SET", payload: 10 })}>
        set
      </button>
    </div>
  );
};

export default UseReducerDemo;
