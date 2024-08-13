import useStore from "@/zuStandStore";
import { useEffect } from "react";

const Demo = () => {
  const { count, increment, decrement, getChannelList, channelList } =
    useStore();
  useEffect(() => {
    getChannelList();
  }, []);
  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>

      {/* 列表 */}
      <ul>
        {channelList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Demo;
