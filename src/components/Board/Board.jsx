import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../Post/PostForm";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import Pagination from "./Pagination";
import { apiGet, apiPost } from "../../api/fetch";
import { filterPosts } from "../../utils/search";
import { getPaginatedItems, getTotalPages } from "../../utils/pagination";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title_content");
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    apiGet("posts")
      .then((data) => setPosts(data))
      .catch((err) => console.error("에러:", err));
  }, []);

  useEffect(() => {
    const results = filterPosts(
      posts,
      searchTerm.trim().toLowerCase(),
      searchType
    );
    setFiltered(results);
    setCurrentPage(1);
  }, [searchTerm, searchType, posts]);

  const displayPosts = searchTerm.trim() ? filtered : posts;
  const currentPosts = getPaginatedItems(
    displayPosts,
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
        onClick={() => {
          navigate("/post/write");
        }}
      >
        게시글 작성
      </button>

      <PostList
        posts={currentPosts}
        onClickPost={(id) => navigate(`/post/${id}`)}
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
        onTermChange={setSearchTerm}
        onTypeChange={setSearchType}
      />
    </div>
  );
};

export default Board;
