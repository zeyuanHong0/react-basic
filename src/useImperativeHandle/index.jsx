import { useRef, forwardRef, useImperativeHandle } from "react";
const Child = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const handlefocus = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => ({
    handlefocus,
  }));
  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
});

const Parent = () => {
  const childRef = useRef();
  const click = () => { 
    console.log("🚀 ~ showRef ~ childRef.current:", childRef.current);
    childRef.current.handlefocus();
  };
 
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={click}>focus</button>
    </div>
  );
};

export default Parent;
