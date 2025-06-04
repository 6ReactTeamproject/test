import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostF";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import Pagination from "./Pagination";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title_content");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("에러:", err));
  }, []);

  useEffect(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (keyword === "") {
      setFiltered([]);
      return;
    }

    const results = posts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const content = post.content?.toLowerCase() || "";
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

  const displayPosts = searchTerm.trim() ? filtered : posts;
  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = displayPosts.slice(
    indexOfLastPost - postsPerPage,
    indexOfLastPost
  );
  const totalPages = Math.ceil(displayPosts.length / postsPerPage);

  const handleAddPost = (newPost) => {
    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
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
      {/* <PostForm onAddPost={handleAddPost} /> */}

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
