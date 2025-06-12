import { useUser } from "../../hooks/UserContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
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
      <h3>댓글</h3>
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
