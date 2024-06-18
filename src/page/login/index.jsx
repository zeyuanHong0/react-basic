import { useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  return <div>我是登录{id}</div>;
};

export default Login;
