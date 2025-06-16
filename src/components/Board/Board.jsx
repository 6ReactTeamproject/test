/* 
좋아요 순으로 정렬 ✅
검색기능 버튼 눌렀을 때 실행되도록 ✅
댓글 좋아요 순으로 ✅
*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import Pagination from "./Pagination";
import { apiGet, apiPost } from "../../api/fetch";
import { filterPosts } from "../../utils/search";
import { getPaginatedItems, getTotalPages } from "../../utils/pagination";
import { useUser } from "../../hooks/UserContext";
import HandleAuth from "../common/HandleAuth";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title_content");
  const [filtered, setFiltered] = useState([]);
  const [members, setMembers] = useState([]);
  const [sortType, setSortType] = useState("views")
  const { user } = useUser();
  const postsPerPage = 5;
  
  const nav = useNavigate();
  
  useEffect(() => {
    apiGet("posts")
      .then((data) => setPosts([...data].reverse()))
      .catch((err) => console.error("에러:", err));
    apiGet("members")
      .then((data) => setMembers(data))
      .catch((err) => console.error("에러:", err));
    apiGet("members")
      .then((data) => setMembers(data))
      .catch((err) => console.error("에러:", err));
  }, []);

  const handleSearch = () => {
    const results = filterPosts(
      posts,
      inputTerm.trim().toLowerCase(),
      searchType
    );

    setFiltered(results);
    setSearchTerm(inputTerm);
    setCurrentPage(1);
  }

  const source = searchTerm.trim() ? filtered : posts;
  const sortedPosts = [...source].sort((a, b) => {
    if (sortType === "views") return b.views - a.views;
    return 0;
  })

  const displayPosts = searchTerm.trim() ? filtered : posts;
  const currentPosts = getPaginatedItems(
    sortedPosts,
    currentPage,
    postsPerPage
  );
  const totalPages = getTotalPages(displayPosts, postsPerPage);

  const handleAddPost = (newPost) => {
    apiPost("posts", newPost)
      .then((data) => setPosts([data, ...posts]))
      .catch((err) => console.error("에러:", err));
  };

  return (
    <div>
      <h2>게시판</h2>
      <button
        onClick={() => HandleAuth(user, nav, "/post/write")}
      >
      게시글 작성
      </button>
      <div style={{ marginTop: "25px" }}>
      <button onClick={() => setSortType("views")}>조회수순</button>
      <button onClick={() => setSortType("")}>최신순</button>
      </div>
      <PostList
        members={members}
        posts={currentPosts}
        onClickPost={(id) => nav(`/post/${id}`)}
      />

      {displayPosts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      )}
      <SearchBar
        searchTerm={searchTerm}
        searchType={searchType}
        onTermChange={setInputTerm}
        onTypeChange={setSearchType}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default Board;