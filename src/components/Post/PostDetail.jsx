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
  const { user: currentUser } = useUser(); // 현재 로그인 사용자 정보
  const { id } = useParams(); // URL 파라미터에서 게시글 ID 가져오기
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(null); // 게시글 데이터 상태
  const [postUser, setPostUser] = useState(null); // 게시글 작성자 정보
  const [comments, setComments] = useState([]); // 댓글 목록 상태
  const [users, setUsers] = useState([]); // 사용자 목록 상태

  // 사용자 목록 한번만 불러오기
  useEffect(() => {
    apiGet("users").then((data) => setUsers(data));
  }, []);

  // 게시글과 댓글 불러오기 및 조회수 증가 처리
  useEffect(() => {
    // 게시글 정보 조회
    apiGet("posts", id).then((data) => {
      setPost(data);
      // 조회수 1 증가
      apiPatch("posts", id, { views: (data.views || 0) + 1 });
    });

    // 해당 게시글 댓글 목록 조회
    apiGet("comments", `?postId=${id}`).then((data) => {
      // 댓글에 기본 값들 보정
      const enriched = data.map((c) => ({
        ...c,
        createdAt: c.createdAt || new Date().toISOString(),
        likes: c.likes || 0,
        likedUserIds: Array.isArray(c.likedUserIds) ? c.likedUserIds : [],
      }));
      setComments(enriched);
    });
  }, [id]);

  // 게시글 작성자 정보 찾아 상태에 저장
  useEffect(() => {
    if (post && users.length > 0) {
      const user = users.find((u) => String(u.id) === String(post.userId));
      setPostUser(user);
    }
  }, [post, users]);

  // 게시판으로 돌아가기 함수
  const handleBackToBoard = () => {
    // 이전 페이지가 게시판이라면 그 상태(페이지, 정렬) 유지하며 돌아가기
    if (location.state?.fromBoard) {
      let url = "/post";
      const params = [];
      if (location.state.page) params.push(`page=${location.state.page}`);
      if (location.state.sort) params.push(`sort=${location.state.sort}`);
      if (params.length > 0) url += "?" + params.join("&");
      navigate(url);
    } else {
      // 이전 페이지로 돌아가기
      navigate(-1);
    }
  };

  if (!post) return <div>Loading...</div>; // 데이터 로딩 중 표시

  return (
    <div className="post-detail-container">
      <button
        className="close-button"
        onClick={handleBackToBoard}
        aria-label="닫기"
      >
        ×
      </button>

      {/* 게시글 제목 */}
      <div className="post-detail-title">{post.title}</div>

      {/* 게시글에 작성자, 작성일, 조회수 표시 */}
      <div className="post-detail-meta">
        작성자: {postUser?.name || post.authorName || post.authorId} |{" "}
        {post.createdAt} | 조회수: {post.views}
      </div>

      {/* 게시글 본문 */}
      <div className="post-detail-content">{post.content}</div>

      {/* 게시글 수정/삭제 버튼 및 동작 */}
      <PostActions
        post={post}
        postUser={postUser}
        currentUser={currentUser}
        id={id}
        navigate={navigate}
      />

      <hr />

      {/* 댓글 개수 표시 */}
      <div className="comment-count-box">
        <span className="comment-count-icon">💬</span>
        <span className="comment-count-text">
          댓글 <b>{comments.length}</b>개
        </span>
      </div>

      {/* 댓글 목록 */}
      <CommentList
        comments={comments}
        setComments={setComments}
        users={users}
        currentUser={currentUser}
      />

      {/* 로그인 시 댓글 작성 폼, 아니면 로그인 안내 */}
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
