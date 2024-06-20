import { useSearchParams } from "react-router-dom";

const Article = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  return <div>我是文章{name}</div>;
};

export default Article;
