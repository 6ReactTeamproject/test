import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostDetail() {
  const currentUser = { id: 1, name: "강희준" }; // 강제 로그인
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [likedComments, setLikedComments] = useState([]);

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

    // 댓글 목록 가져올 때 createdAt과 likes 자동 추가
    fetch(`http://localhost:3001/comments?postId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((c) => ({
          ...c,
          createdAt: c.createdAt || new Date().toISOString(), // 댓글 작성 시간
          likes: c.likes || 0, // 댓글 좋아요 수
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

  if (!post) return <div>잘못된 접근 입니다.</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>조회수: {post.views || 0}회</p> {/* 조회수 표시 */}
      <p>
        작성자: {postUser ? postUser.name : "알 수 없음"}
        {currentUser && currentUser.id === post.userId && (
          <>
            <button
              onClick={() => {
                navigate(`/edit/${id}`);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                if (window.confirm("게시글을 삭제할까요?")) {
                  fetch(`http://localhost:3001/posts/${id}`, {
                    method: "DELETE",
                  }).then(() => {
                    navigate("/");
                  });
                }
              }}
            >
              삭제
            </button>
          </>
        )}
      </p>
      <hr />
      <h3>댓글</h3>
      <ul>
        {comments.map((c) => {
          const user = users.find((u) => String(u.id) === String(c.userId));
          const isOwner = currentUser && currentUser.id === c.userId;
          return (
            <li key={c.id}>
              {c.text} (작성자 : {user ? user.name : "알 수 없음"}){" "}
              <span>({new Date(c.createdAt).toLocaleString()})</span>{" "}
              {/* 댓글 작성 시각 표시 */}
              <button
                onClick={() => {
                  const alreadyLiked = likedComments.includes(c.id);
                  const updatedLikes = alreadyLiked ? c.likes - 1 : c.likes + 1;

                  fetch(`http://localhost:3001/comments/${c.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ likes: updatedLikes }),
                  }).then(() => {
                    setComments((prev) =>
                      prev.map((cm) =>
                        cm.id === c.id ? { ...cm, likes: updatedLikes } : cm
                      )
                    );
                    setLikedComments((prev) =>
                      alreadyLiked
                        ? prev.filter((id) => id !== c.id)
                        : [...prev, c.id]
                    );
                  });
                }}
              >
                {likedComments.includes(c.id) ? "💔" : "❤️"} {c.likes}{" "}
                {/* 좋아요 수 표시 */}
              </button>
              {isOwner && (
                <>
                  <button
                    onClick={() => {
                      navigate(`/edit/${id}`);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("정말 삭제할까요?")) {
                        fetch(`http://localhost:3001/comments/${c.id}`, {
                          method: "DELETE",
                        }).then(() => {
                          setComments((prev) =>
                            prev.filter((cm) => cm.id !== c.id)
                          );
                        });
                      }
                    }}
                  >
                    삭제
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
      {currentUser ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const text = formData.get("text");
            if (!text.trim()) return;
            fetch("http://localhost:3001/comments", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                postId: Number(id),
                userId: currentUser?.id,
                text,
              }),
            }).then(() => {
              e.target.reset();
              fetch(`http://localhost:3001/comments?postId=${id}`)
                .then((res) => res.json())
                .then((data) => setComments(data));
            });
          }}
        >
          <input type="text" name="text" placeholder="댓글을 입력하세요" />
          <button type="submit">댓글 작성</button>
        </form>
      ) : (
        <div>댓글을 작성하려면 로그인하세요.</div>
      )}
    </div>
  );
}

export default PostDetail;