import { memo, useState } from "react";

const Child = ({ name }) => {
  console.log("子组件渲染了");
  return <div>{name}</div>;
};

const MemoChile = memo(Child);

const Father = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("张三");
  return (
    <div>
      <MemoChile name={name} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setName("李四")}>改变子组件名称</button>
    </div>
  );
};

export default Father;
