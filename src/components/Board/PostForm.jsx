import React from "react";

const PostForm = ({ post, setPost, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
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
      <button type="submit">저장</button>
    </form>
  );
};

export default PostForm;