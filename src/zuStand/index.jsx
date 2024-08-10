import useStore from "@/zuStandStore";

const Demo = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  );
};

export default Demo;