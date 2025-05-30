import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title_content");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const navigate = useNavigate();

  // 게시글 가져오기
  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => {
        if (!res.ok) throw new Error("불러오기 실패!");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => console.error("게시글 가져오기 에러:", err));
  }, []);

  // 검색 필터링 자동 수행
  useEffect(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (keyword === "") {
      setFiltered([]);
      return;
    }

    const results = posts.filter((post) => {
      const title = typeof post.title === "string" ? post.title.toLowerCase() : "";
      const content = typeof post.content === "string" ? post.content.toLowerCase() : "";
      const userId = post.userId?.toString();

      switch (searchType) {
        case "title":
          return title.includes(keyword);
        case "content":
          return content.includes(keyword);
        case "title_content":
          return title.includes(keyword) || content.includes(keyword);
        case "userId":
          return userId === keyword;
        default:
          return false;
      }
    });

    setFiltered(results);
    setCurrentPage(1);
  }, [searchTerm, searchType, posts]);

  const isSearching = searchTerm.trim() !== "";
  const displayPosts = isSearching ? filtered : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = displayPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(displayPosts.length / postsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleAddPost = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    const newPost = {
      id: Date.now(), // 임시 ID
      title: newTitle,
      content: newContent,
      userId: 1, // 예시용 ID
      createdAt: new Date().toISOString(),
      views: 0,
    };

    // 백엔드에 POST 요청 (json-server 기준)
    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (!res.ok) throw new Error("등록 실패");
        return res.json();
      })
      .then((data) => {
        setPosts([data, ...posts]); // 새 글을 맨 위에 추가
        setNewTitle("");
        setNewContent("");
      })
      .catch((err) => {
        console.error("게시물 추가 오류:", err);
        alert("게시물 추가에 실패했습니다.");
      });
  };
  
  return (
    <div>
      <h2>게시판</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="내용"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <br />
        <button onClick={handleAddPost}>게시물 추가</button>
      </div>

      <div>
        <ul>
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
        </ul>
      </div>

      <div>
        <ul>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <li
                key={post.id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>
                  작성자 ID: {post.userId} / {post.createdAt} / 조회수: {post.views}
                </p>
              </li>
            ))
          ) : isSearching ? (
            <p>검색 결과가 없습니다</p>
          ) : (
            <p>게시물이 없습니다</p>
          )}
        </ul>

        {displayPosts.length > 0 && (
          <div>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
