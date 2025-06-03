import { useUser } from "../Travel/UserContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function PostDetail() {
  const { user: currentUser } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  // 페이지가 로드될 때 localStorage에서 user 정보를 가져와 콘솔에 출력
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("로컬스토리지에서 가져온 user:", JSON.parse(storedUser));
    } else {
      console.log("로컬스토리지에 user 정보가 없습니다.");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    // 게시글 정보 가져오기 + 조회수 증가 처리
    fetch(`http://localhost:3001/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        fetch(`http://localhost:3001/posts/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ views: (data.views || 0) + 1 }), // 조회수 증가
        });
      });

    // 댓글 목록 가져올 때 createdAt, likes, likedUserIds 자동 추가
    fetch(`http://localhost:3001/comments?postId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((c) => ({
          ...c,
          createdAt: c.createdAt || new Date().toISOString(), // 댓글 작성 시간
          likes: c.likes || 0, // 댓글 좋아요 수
          likedUserIds: Array.isArray(c.likedUserIds) ? c.likedUserIds : [], // 좋아요 누른 유저 목록
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

  useEffect(() => {
    if (post) {
      console.log("현재 보고 있는 게시글:", post);
    }
  }, [post]);

  if (!post) return <div>잘못된 접근 입니다.</div>;

  return (
    <div>
      <PostHeader post={post} />
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
