import { useMemo, useState } from "react";

// 斐波那契数列
function fibonacci(n) {
  console.log("计算斐波那契数列");
  if (n < 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const UseMemoDemo = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const result = useMemo(() => fibonacci(count1), [count1]);
  console.log("组件渲染了");

  return (
    <div>
      <div>
        <button onClick={() => setCount1(count1 + 1)}>{count1}</button>
        <button onClick={() => setCount2(count2 + 1)}>{count2}</button>
      </div>
      <div>result: {result}</div>
    </div>
  );
};

export default UseMemoDemo;
