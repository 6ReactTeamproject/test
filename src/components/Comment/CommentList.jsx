import { useState } from "react";

function CommentList({ comments, setComments, users, currentUser }) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  return (
    <ul>
      {comments.map((comment) => {
        const user = users.find((u) => u.id == comment.userId);
        const isOwner =
          currentUser && String(currentUser.id) === String(comment.userId);
        const likedUserIds = Array.isArray(comment.likedUserIds)
          ? comment.likedUserIds
          : [];
        const alreadyLiked = currentUser
          ? likedUserIds.includes(currentUser.id)
          : false;

        return (
          <li key={comment.id}>
            {editingCommentId === comment.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button
                  onClick={() => {
                    fetch(`http://localhost:3001/comments/${comment.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ text: editingText }),
                    }).then(() => {
                      setComments((prev) =>
                        prev.map((c) =>
                          c.id === comment.id ? { ...c, text: editingText } : c
                        )
                      );
                      setEditingCommentId(null);
                      setEditingText("");
                    });
                  }}
                >
                  저장
                </button>
                <button onClick={() => setEditingCommentId(null)}>취소</button>
              </>
            ) : (
              <>
                <span>{comment.text}</span> (작성자:{" "}
                {user?.name || "알 수 없음"})
                <span> | 좋아요: {comment.likes}</span>
                <button
                  onClick={() => {
                    const updatedLikes = alreadyLiked
                      ? Math.max(0, comment.likes - 1)
                      : comment.likes + 1;
                    const updatedLikedUserIds = alreadyLiked
                      ? likedUserIds.filter((id) => id !== currentUser.id)
                      : [...likedUserIds, currentUser.id];

                    fetch(`http://localhost:3001/comments/${comment.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        likes: updatedLikes,
                        likedUserIds: updatedLikedUserIds,
                      }),
                    }).then(() => {
                      setComments((prev) =>
                        prev.map((c) =>
                          c.id === comment.id
                            ? {
                                ...c,
                                likes: updatedLikes,
                                likedUserIds: updatedLikedUserIds,
                              }
                            : c
                        )
                      );
                    });
                  }}
                >
                  {alreadyLiked ? "💔" : "❤️"}
                </button>
                {isOwner && (
                  <>
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditingText(comment.text);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("삭제할까요?")) {
                          fetch(
                            `http://localhost:3001/comments/${comment.id}`,
                            {
                              method: "DELETE",
                            }
                          ).then(() => {
                            setComments((prev) =>
                              prev.filter((c) => c.id !== comment.id)
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
  );
}

export default CommentList;
