import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/Board/PostForm";

const WritePost = () => {
  const { id } = useParams(); // 수정이면 id 존재
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    if (id) {
      // 수정 시 기존 데이터 불러오기
      fetch(`http://localhost:3001/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost({ title: data.title, content: data.content }));
    }
  }, [id]);

  const handleSubmit = () => {
    const method = id ? "PATCH" : "POST";
    const url = id
      ? `http://localhost:3001/posts/${id}`
      : "http://localhost:3001/posts";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...post,
        ...(id
          ? {}
          : {
              userId: 1,
              createdAt: new Date().toISOString().slice(0, 10),
              views: 0,
            }),
      }),
    }).then(() => navigate("/"));
  };

  return (
    <div>
      <h2>{id ? "게시글 수정" : "새 글 작성"}</h2>
      <PostForm post={post} setPost={setPost} onSubmit={handleSubmit} />
    </div>
  );
};

export default WritePost;
