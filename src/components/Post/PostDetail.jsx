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
      let url = "/post";
      const params = [];
      if (location.state.page) params.push(`page=${location.state.page}`);
      if (location.state.sort) params.push(`sort=${location.state.sort}`);
      if (params.length > 0) url += "?" + params.join("&");
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-wrapper">
      <div className="post-card">
        <button className="back-to-board-button" onClick={handleBackToBoard}>
          &larr; 목록으로
        </button>
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span>
              작성자: {postUser?.name || post.authorName || post.authorId}
            </span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
            <span>조회수: {post.views}</span>
          </div>
        </div>
        <div className="post-content">{post.content}</div>
        <PostActions
          post={post}
          postUser={postUser}
          currentUser={currentUser}
          id={id}
          navigate={navigate}
        />
      </div>
      <div className="comment-section">
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
          <div className="login-prompt-for-comment">
            댓글을 작성하려면 로그인하세요.
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
