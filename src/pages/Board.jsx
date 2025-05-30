import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가

const PostBoard = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title_content");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate(); // ✅ 네비게이트 훅 사용

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => {
        if (!res.ok) throw new Error("불러오기 실패!");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => console.error("게시글 가져오기 에러:", err));
  }, []);

  const handleSearch = () => {
    const keyword = searchTerm.toLowerCase();

    if (searchTerm.trim() === "") {
      setFiltered([]);
      return;
    }

    const results = posts.filter((post) => {
      switch (searchType) {
        case "title":
          return post.title.toLowerCase().includes(keyword);
        case "content":
          return post.content.toLowerCase().includes(keyword);
        case "title_content":
          return (
            post.title.toLowerCase().includes(keyword) ||
            post.content.toLowerCase().includes(keyword)
          );
        case "userId":
          return post.userId.toString() === searchTerm.trim();
        default:
          return true;
      }
    });

    setFiltered(results);
  };

  return (
    <div>
      <h2>📋 게시판</h2>

      <div>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="title_content">제목+내용</option>
          <option value="userId">작성자 ID</option>
        </select>
        <button onClick={handleSearch}>검색</button>
      </div>

      <ul>
        {(filtered.length > 0 ? filtered : posts).length > 0 ? (
          (filtered.length > 0 ? filtered : posts).map((post) => (
            <li
              key={post.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/posts/${post.id}`)} // ✅ 게시글 클릭 시 상세로 이동
            >
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                작성자 ID: {post.userId} / {post.createdAt} / 조회수: {post.views}
              </p>
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다 🥲</p>
        )}
      </ul>
    </div>
  );
};

export default PostBoard;
