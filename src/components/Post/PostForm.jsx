import React from "react";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post, setPost, onSubmit, id }) => {
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit();
        }
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={post.title}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="content"
        placeholder="내용"
        value={post.content}
        onChange={handleChange}
      />
      <br />
      {id ? (
        <>
          <button type="submit">수정</button>
          <button
            type="button"
            onClick={() => {
              nav(-1);
            }}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <button type="submit">작성</button>
          <button
            type="button"
            onClick={() => {
              nav(-1);
            }}
          >
            취소
          </button>
        </>
      )}
    </form>
  );
};

export default PostForm;
