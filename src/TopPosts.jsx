import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "./api/fetch";
import PostItem from "./components/Board/PostItem";

const TopPosts = () => {
<<<<<<< Updated upstream
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
=======
  const [posts, setPosts] = useState([]); // 상위 5개 게시글 저장
  const [users, setUsers] = useState([]); // 전체 사용자 정보 저장
  const navigate = useNavigate(); // 상세페이지로 이동하는 데 사용
>>>>>>> Stashed changes

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 게시글 및 사용자 데이터 불러오기
    const fetchData = async () => {
      try {
<<<<<<< Updated upstream
        const allPosts = await apiGet("posts");
        const allMembers = await apiGet("members");
=======
        const allPosts = await apiGet("posts"); // 전체 게시글
        const allUsers = await apiGet("users"); // 전체 유저
>>>>>>> Stashed changes

        // 게시글을 조회수 기준으로 내림차순 정렬
        const sorted = [...allPosts].sort((a, b) => b.views - a.views);

        // 상위 5개만 상태에 저장
        setPosts(sorted.slice(0, 5));
        setMembers(allMembers);
      } catch (err) {
        console.error("조회수 TOP5 게시글 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

<<<<<<< Updated upstream
=======
  // 사용자 ID를 받아 해당 유저의 이름 반환 (없으면 익명)
  const getAuthorName = (userId) =>
    users.find((u) => u.id === userId)?.name || "익명";

>>>>>>> Stashed changes
  return (
    <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
      <h2>인기 게시글 TOP 5</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
<<<<<<< Updated upstream
            post={post}
            members={members}
            onClick={() => navigate(`/post/${post.id}`)}
          />
=======
            className="top-post-item"
            onClick={() => navigate(`/post/${post.id}`)} // 게시글 클릭 시 상세 페이지 이동
          >
            <div className="post-title">{post.title}</div> {/* 게시글 제목 */}
            <div className="post-preview">{post.content}</div> {/* 게시글 내용 */}
            <div className="post-meta">
              {getAuthorName(post.userId)} · 💬 {post.comments?.length || 0} {/* 작성자명 및 댓글 수 */}
            </div>
          </li>
>>>>>>> Stashed changes
        ))}
      </ul>
    </div>
  );
};

export default TopPosts;
