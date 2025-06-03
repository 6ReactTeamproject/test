import { useState } from "react";
import { useUser } from "../Travel/UserContext";

const PostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user: currentUser } = useUser();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요");
      return;
    }

    if (!currentUser) {
      alert("로그인 후 작성해주세요!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      views: 0,
    };

    onAddPost(newPost);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <br />
      <button onClick={handleSubmit}>게시물 추가</button>
    </div>
  );
};

export default PostForm;
