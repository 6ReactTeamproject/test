import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "./api/fetch";
import PostItem from "./components/Board/PostItem";

const TopPosts = () => {
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await apiGet("posts");
        const allMembers = await apiGet("members");

        const sorted = [...allPosts].sort((a, b) => b.views - a.views);
        setPosts(sorted.slice(0, 5));
        setMembers(allMembers);
      } catch (err) {
        console.error("조회수 TOP5 게시글 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
      <h2>인기 게시글 TOP 5</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            members={members}
            onClick={() => navigate(`/post/${post.id}`)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TopPosts;
