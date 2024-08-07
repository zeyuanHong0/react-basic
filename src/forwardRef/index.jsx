import { useRef, forwardRef } from "react";
const Child = forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  );
});

const Parent = () => {
  const childRef = useRef();
  const showRef = () => {
    console.log(childRef.current);
    childRef.current.focus();
  };
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={showRef}>focus</button>
    </div>
  );
};

export default Parent;
