import { useUser } from "../Travel/UserContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostDetail() {
  const { user: currentUser } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  // 댓글 수정 관련 상태
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

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
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>조회수: {post.views || 0}회</p> {/* 조회수 표시 */}
      <p>
        작성자: {postUser ? postUser.name : "알 수 없음"}
        {currentUser && String(currentUser.id) === String(post.userId) && (
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
          // likedUserIds가 없을 경우를 대비하여 기본값 처리(최종적으로는 항상 있음)
          const likedUserIds = Array.isArray(c.likedUserIds)
            ? c.likedUserIds
            : [];
          const alreadyLiked = likedUserIds.includes(currentUser.id);
          return (
            <li key={c.id}>
              {editingCommentId === c.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      fetch(`http://localhost:3001/comments/${c.id}`, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ text: editingText }),
                      }).then(() => {
                        setComments((prev) =>
                          prev.map((cm) =>
                            cm.id === c.id ? { ...cm, text: editingText } : cm
                          )
                        );
                        setEditingCommentId(null);
                        setEditingText("");
                      });
                    }}
                  >
                    저장
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditingText("");
                    }}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  {c.text} (작성자 : {user ? user.name : "알 수 없음"}){" "}
                  <span>({new Date(c.createdAt).toLocaleString()})</span>{" "}
                  {/* 댓글 작성 시각 표시 */}
                  <button
                    onClick={() => {
                      // 중복 좋아요 방지
                      let updatedLikes, updatedLikedUserIds;
                      if (alreadyLiked) {
                        // 좋아요 취소
                        updatedLikes = Math.max(0, c.likes - 1);
                        updatedLikedUserIds = likedUserIds.filter(
                          (uid) => uid !== currentUser.id
                        );
                      } else {
                        // 좋아요 추가
                        updatedLikes = c.likes + 1;
                        updatedLikedUserIds = [...likedUserIds, currentUser.id];
                      }
                      fetch(`http://localhost:3001/comments/${c.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          likes: updatedLikes,
                          likedUserIds: updatedLikedUserIds,
                        }),
                      }).then(() => {
                        setComments((prev) =>
                          prev.map((cm) =>
                            cm.id === c.id
                              ? {
                                  ...cm,
                                  likes: updatedLikes,
                                  likedUserIds: updatedLikedUserIds,
                                }
                              : cm
                          )
                        );
                      });
                    }}
                  >
                    {alreadyLiked ? "💔" : "❤️"} {c.likes}{" "}
                    {/* 좋아요 수 표시 */}
                  </button>
                  {isOwner && (
                    <>
                      <button
                        onClick={() => {
                          setEditingCommentId(c.id);
                          setEditingText(c.text);
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
                .then((data) => {
                  const enriched = data.map((c) => ({
                    ...c,
                    createdAt: c.createdAt || new Date().toISOString(),
                    likes: c.likes || 0,
                    likedUserIds: Array.isArray(c.likedUserIds)
                      ? c.likedUserIds
                      : [],
                  }));
                  setComments(enriched);
                });
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
