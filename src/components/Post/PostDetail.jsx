import { useUser } from "../../hooks/UserContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import CommentList from "../Comment/CommentList";
import CommentForm from "../Comment/CommentForm";
import { apiGet, apiPatch } from "../../api/fetch";
import "../../styles/post.css";

function PostDetail() {
  const { user: currentUser } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiGet("users").then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    // 게시글 정보 가져오기 + 조회수 증가 처리
    apiGet("posts", id).then((data) => {
      setPost(data);
      apiPatch("posts", id, { views: (data.views || 0) + 1 }); // 조회수 증가
    });

    // 댓글 목록 가져오기
    apiGet("comments", `?postId=${id}`).then((data) => {
      const enriched = data.map((c) => ({
        ...c,
        createdAt: c.createdAt || new Date().toISOString(),
        likes: c.likes || 0,
        likedUserIds: Array.isArray(c.likedUserIds) ? c.likedUserIds : [],
      }));
      setComments(enriched);
    });
  }, [id]);

  useEffect(() => {
    if (post && users.length > 0) {
      const user = users.find((u) => String(u.id) === String(post.userId));
      setPostUser(user);
    }
  }, [post, users]);

  // 게시판으로 돌아가는 함수
  const handleBackToBoard = () => {
    // 이전 페이지가 게시판이었다면 해당 페이지로 돌아가기
    if (location.state?.fromBoard) {
      navigate(
        "/post" + (location.state.page ? `?page=${location.state.page}` : "")
      );
    } else {
      navigate(-1);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container" style={{ position: "relative" }}>
      <button
        className="close-button"
        onClick={handleBackToBoard}
        style={{
          position: "absolute",
          top: "24px",
          right: "32px",
          background: "none",
          border: "none",
          fontSize: "2rem",
          color: "#888",
          cursor: "pointer",
          zIndex: 10,
        }}
        aria-label="닫기"
      >
        ×
      </button>
      <div className="post-detail-title">{post.title}</div>
      <div className="post-detail-meta">
        작성자: {postUser?.name || post.authorName || post.authorId} |{" "}
        {post.createdAt} | 조회수: {post.views}
      </div>
      <div className="post-detail-content">{post.content}</div>
      <PostActions
        post={post}
        postUser={postUser}
        currentUser={currentUser}
        id={id}
        navigate={navigate}
      />
      <hr />
      <div className="comment-count-box">
        <span className="comment-count-icon">💬</span>
        <span className="comment-count-text">
          댓글 <b>{comments.length}</b>개
        </span>
      </div>
      <CommentList
        comments={comments}
        setComments={setComments}
        users={users}
        currentUser={currentUser}
      />
      {currentUser ? (
        <CommentForm
          currentUser={currentUser}
          id={id}
          setComments={setComments}
        />
      ) : (
        <div>댓글을 작성하려면 로그인하세요.</div>
      )}
    </div>
  );
}

export default PostDetail;
