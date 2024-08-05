import { memo, useMemo, useState } from "react";

const Child = ({ name, list }) => {
  console.log("子组件渲染了");
  return (
    <div>
      <div>{name}</div>
      <div>{list}</div>
    </div>
  );
};

const MemoChile = memo(Child);

const Father = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("张三");
  // const list = [1, 2, 3];
  const list = useMemo(() => {
    return [1, 2, 3];
  }, []);
  return (
    <div>
      <MemoChile name={name} list={list} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setName("李四")}>改变子组件名称</button>
    </div>
  );
};

export default Father;
