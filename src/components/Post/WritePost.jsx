import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import { useUser } from "../../hooks/UserContext";
import { apiGet, apiPost, apiPatch } from "../../api/fetch";

const WritePost = () => {
  const { id } = useParams(); // 수정이면 id 존재
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });
  const { user: currentUser } = useUser();

  useEffect(() => {
    if (id) {
      // 수정 시 기존 데이터 불러오기
      apiGet("posts", id).then((data) =>
        setPost({ title: data.title, content: data.content })
      );
    }
  }, [id]);

  const handleSubmit = () => {
    if (!currentUser || !currentUser.id) {
      alert("로그인된 사용자 정보가 없습니다.");
      return;
    }

    const postData = {
      ...post,
      ...(id
        ? {}
        : {
            userId: currentUser.id,
            createdAt: new Date().toISOString().slice(0, 10),
            views: 0,
          }),
    };

    if (id) {
      apiPatch("posts", id, postData).then(() => navigate(-1));
    } else {
      apiPost("posts", postData).then(() => navigate(-1));
    }
  };

  return (
    <div>
      <h2>{id ? "게시글 수정" : "새 글 작성"}</h2>
      <PostForm post={post} setPost={setPost} onSubmit={handleSubmit} id={id} />
    </div>
  );
};

export default WritePost;
