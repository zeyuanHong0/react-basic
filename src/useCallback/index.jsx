import { useCallback, memo, useState } from "react";

const Child = memo(({ onChange }) => {
  console.log("子组件渲染了");
  return (
    <div>
      <input type="text" onChange={(e) => onChange(e.target.value)} />
    </div>
  );
});

const Parent = () => {
  const [count, setCount] = useState(0);
  //   const onChange = (value) => {
  //     console.log(value);
  //   };
  const onChange = useCallback((value) => {
    console.log(value);
  }, []);
  return (
    <div>
      <Child onChange={onChange} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};

export default Parent;
