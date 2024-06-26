import "./index.scss";
import { useState, useRef, useEffect } from "react";
import { formatDate } from "../utils";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const user = {
  uuid: "1",
  avatar: "/assets/images/avatar.png",
  name: "哲理源",
};

const userReplyList = [
  {
    id: 1,
    user: {
      uuid: "1",
      avatar: "/assets/images/avatar.png",
      name: "哲理源",
    },
    content: "这是一条评论内容",
    time: "2024-06-01",
    like: 10,
  },
  {
    id: 2,
    user: {
      uuid: "2",
      avatar: "/assets/images/avatar.png",
      name: "晓风残月",
    },
    content: "这是一条非常有见地的评论内容",
    time: "2024-06-02",
    like: 15,
  },
  {
    id: 3,
    user: {
      uuid: "3",
      avatar: "/assets/images/avatar.png",
      name: "云中君",
    },
    content: "感谢分享，非常有帮助！",
    time: "2024-06-03",
    like: 8,
  },
  {
    id: 4,
    user: {
      uuid: "4",
      avatar: "/assets/images/avatar.png",
      name: "竹林听雨",
    },
    content: "写得真好，受益匪浅。",
    time: "2024-06-04",
    like: 12,
  },
  {
    id: 5,
    user: {
      uuid: "5",
      avatar: "/assets/images/avatar.png",
      name: "文艺青年",
    },
    content: "这个观点我非常赞同。",
    time: "2024-06-05",
    like: 20,
  },
  {
    id: 6,
    user: {
      uuid: "6",
      avatar: "/assets/images/avatar.png",
      name: "乐观派",
    },
    content: "谢谢你的分享，真的很棒！",
    time: "2024-06-06",
    like: 5,
  },
  {
    id: 7,
    user: {
      uuid: "7",
      avatar: "/assets/images/avatar.png",
      name: "旅行者",
    },
    content: "看了你的评论，我也有了很多新的想法。",
    time: "2024-06-07",
    like: 7,
  },
  {
    id: 8,
    user: {
      uuid: "8",
      avatar: "/assets/images/avatar.png",
      name: "技术宅",
    },
    content: "你的评论帮助我解决了一个困惑已久的问题。",
    time: "2024-06-08",
    like: 18,
  },
  {
    id: 9,
    user: {
      uuid: "9",
      avatar: "/assets/images/avatar.png",
      name: "思考者",
    },
    content: "你的观点很有启发性。",
    time: "2024-06-09",
    like: 13,
  },
  {
    id: 10,
    user: {
      uuid: "10",
      avatar: "/assets/images/avatar.png",
      name: "冒险家",
    },
    content: "我完全同意你的看法。",
    time: "2024-06-10",
    like: 22,
  },
];

// 封装请求逻辑
const useList = () => {
  const [replyList, setReplyList] = useState([]);
  useEffect(() => {
    fetchGetList();
  }, []);

  const fetchGetList = async () => {
    const res = await axios.get("http://localhost:8000/list");
    setReplyList(res.data);
  };

  return {
    replyList,
    setReplyList,
  };
};

const ReplyList = () => {
  const [activeTab, setActiveTab] = useState("");
  const { replyList, setReplyList } = useList();

  const Header = () => {
    // 根据时间来排序 格式 2023-05-12 2023-12-23，最新的时间在前面
    const handleSort = () => {
      setActiveTab("time");
      setReplyList(
        [...replyList].sort((a, b) => new Date(b.time) - new Date(a.time))
      );
    };

    // 根据点赞数来排序 最多的点赞在前面
    const handleSortByLike = () => {
      setActiveTab("like");
      setReplyList([...replyList].sort((a, b) => b.like - a.like));
    };
    return (
      <div className="header">
        <div className="h-left">
          <h3>评论</h3>
          <span>{replyList.length}</span>
        </div>
        <div className="h-right">
          <span
            className={activeTab === "time" ? "active" : ""}
            onClick={handleSort}
          >
            最新
          </span>
          <span>|</span>
          <span
            className={activeTab === "like" ? "active" : ""}
            onClick={handleSortByLike}
          >
            最热
          </span>
        </div>
      </div>
    );
  };

  const ReplyInput = () => {
    const [contentValue, setContentValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);
    // 发布评论
    const handleRelease = () => {
      if (!contentValue) {
        message.warning("评论内容不能为空");
        return;
      }
      const newReply = {
        id: uuidv4(),
        user,
        content: contentValue,
        // 时间格式 2023-05-12 2023-12-23
        time: formatDate(new Date()),
        like: 0,
      };
      message.success("评论成功");
      setReplyList([...replyList, newReply]);
      setContentValue("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    return (
      <div className="reply">
        <img className="avatar" src="/assets/images/avatar.jpg" alt="" />
        <input
          placeholder="发一条友善的评论"
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
          ref={inputRef}
        />
        <button onClick={handleRelease}>发布</button>
      </div>
    );
  };

  // 评论项封装
  const Item = ({ item, onDelete }) => {
    return (
      <div className="list" key={item.id}>
        <div className="user">
          <img src={item.user.avatar} alt="" />
          <span>{item.user.name}</span>
        </div>
        <div className="content">
          <p>{item.content}</p>
        </div>
        <div className="info">
          <span>{item.time}</span>
          <span>点赞数：{item.like}</span>
          {item.user.name === "哲理源" && (
            <span onClick={() => onDelete(item.id)}>删除</span>
          )}
        </div>
      </div>
    );
  };

  const List = () => {
    // 删除评论
    const handleDelete = (id) => {
      setReplyList(replyList.filter((item) => item.id !== id));
    };
    return (
      <div>
        {replyList.map((item) => (
          <Item item={item} key={item.id} onDelete={handleDelete} />
        ))}
      </div>
    );
  };
  return (
    <div className="reply-list">
      <Header />
      <ReplyInput />
      <List />
    </div>
  );
};

export default ReplyList;
