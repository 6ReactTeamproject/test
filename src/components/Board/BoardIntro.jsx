import { useEffect, useState } from "react";

const BoardIntro = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title_content"); // 기본값
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // 한 페이지에 5개씩 보여주기

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => {
        if (!res.ok) throw new Error("불러오기 실패!");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => console.error("게시글 가져오기 에러:", err));
  }, []);

  const [filtered, setFiltered] = useState([]);

  // 보여줄 게시글 배열 결정 (검색된 게시글 있으면 그걸, 없으면 전체 게시글)
  const displayPosts = filtered.length > 0 ? filtered : posts; //추가함

  // 현재 페이지에 보여줄 게시글 범위 계산
  const indexOfLastPost = currentPage * postsPerPage; //추가함
  const indexOfFirstPost = indexOfLastPost - postsPerPage; //추가함
  const currentPosts = displayPosts.slice(indexOfFirstPost, indexOfLastPost); //추가함

  const totalPages = Math.ceil(displayPosts.length / postsPerPage); //추가함

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1); //추가함
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1); //추가함
  };


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
      <h2>게시판</h2>
      <button onClick={""}>게시물 ㄱ</button>
          {/* 게시물 추가 자리 */}
          
          {/* 추가함 */}
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
        <button onClick={handleSearch}>검색</button>
        </ul>
      </div>
        
      <ul>
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                작성자 ID: {post.userId} / {post.createdAt} {post.views}
              </p>
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다</p>
        )}
      </ul>
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
          {/* 여기까지 */}
    </div>
  );
};

export default BoardIntro;