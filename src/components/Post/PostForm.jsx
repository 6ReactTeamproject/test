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
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="제목을 입력하세요"
        value={post.title}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />
      <textarea
        name="content"
        placeholder="내용을 입력하세요"
        value={post.content}
        onChange={handleChange}
        style={{
          width: "100%",
          minHeight: "300px",
          padding: "12px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "16px",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          onClick={() => nav(-1)}
          style={{
            padding: "10px 20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#f8f9fa",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background-color 0.2s",
          }}
        >
          취소
        </button>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background-color 0.2s",
          }}
        >
          {id ? "수정" : "작성"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
