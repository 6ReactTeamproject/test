import { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import CommentActions from "./CommentActions";
import LikeButton from "./LikeButton";
import { apiPatch } from "../../api/fetch";
import "../../styles/comment.css";

export default function CommentList({
  comments,
  setComments,
  users,
  currentUser,
}) {
  const [editingCommentId, setEditingCommentId] = useState(null);

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
  };

  const handleSave = (commentId, newText) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, text: newText } : c))
    );
    setEditingCommentId(null);
  };

  const handleDelete = (comment) => {
    if (window.confirm("삭제할까요?")) {
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
    }
  };

  const handleLike = async (comment, alreadyLiked) => {
    try {
      const updatedLikes = alreadyLiked
        ? Math.max(0, comment.likes - 1)
        : comment.likes + 1;
      const updatedLikedUserIds = alreadyLiked
        ? comment.likedUserIds.filter((id) => id !== currentUser.id)
        : [...comment.likedUserIds, currentUser.id];

      // 서버에 좋아요 상태 업데이트
      await apiPatch("comments", comment.id, {
        likes: updatedLikes,
        likedUserIds: updatedLikedUserIds,
      });

      // 클라이언트 상태 업데이트
      setComments((prev) =>
        prev.map((c) =>
          c.id === comment.id
            ? { ...c, likes: updatedLikes, likedUserIds: updatedLikedUserIds }
            : c
        )
      );
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
      alert("좋아요 업데이트에 실패했습니다.");
    }
  };

  
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        const user = users.find((u) => String(u.id) === String(comment.userId));
        return (
          <div className="comment-item" key={comment.id}>
            <span className="comment-author">
              {user?.name || comment.authorName || comment.authorId}
            </span>
            {editingCommentId === comment.id ? (
              <CommentEditForm
                comment={comment}
                onSave={(newText) => handleSave(comment.id, newText)}
                onCancel={() => setEditingCommentId(null)}
              />
            ) : (
              <>
                <span className="comment-content">{comment.text}</span>
                <span className="comment-date">{comment.createdAt}</span>
                <span> | 좋아요: {comment.likes}</span>
                {currentUser && (
                  <LikeButton
                    comment={comment}
                    currentUser={currentUser}
                    onLike={handleLike}
                  />
                )}
                <span className="comment-actions">
                  <CommentActions
                    comment={comment}
                    currentUser={currentUser}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
