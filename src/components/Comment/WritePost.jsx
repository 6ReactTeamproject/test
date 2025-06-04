import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import { useUser } from "../Travel/UserContext";

const WritePost = () => {
  const { id } = useParams(); // 수정이면 id 존재
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });
  const { user: currentUser } = useUser();

  useEffect(() => {
    if (id) {
      // 수정 시 기존 데이터 불러오기
      fetch(`http://localhost:3001/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost({ title: data.title, content: data.content }));
    }
  }, [id]);

  useEffect(() => {
    console.log("현재 로그인된 유저:", currentUser);
  }, [currentUser]);

  const handleSubmit = () => {
    console.log("handleSubmit 실행됨");
    console.log("currentUser:", currentUser);
    console.log("작성될 userId:", currentUser?.id);

    if (!currentUser || !currentUser.id) {
      alert("로그인된 사용자 정보가 없습니다.");
      return;
    }

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
              userId: currentUser.id,
              createdAt: new Date().toISOString().slice(0, 10),
              views: 0,
            }),
      }),
    }).then(() => navigate(-1));
  };

  return (
    <div>
      <h2>{id ? "게시글 수정" : "새 글 작성"}</h2>
      <PostForm post={post} setPost={setPost} onSubmit={handleSubmit} id={id} />
    </div>
  );
};

export default WritePost;
