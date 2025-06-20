import { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import CommentActions from "./CommentActions";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";
import { apiPatch } from "../../api/fetch";
import "../../styles/comment.css";

export default function CommentList({
  comments,        // 전체 댓글
  setComments,     // 댓글 리스트를 업데이트
  users,           // 사용자 정보 배열
  currentUser,     // 로그인 중인 사용자 정보
}) {
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글
  const [sortType, setSortType] = useState("");                    // 정렬 방식
  const [replyTo, setReplyTo] = useState(null);                    // 답글을 작성 중인 댓글

  // 특정 댓글의 대댓글
  const getReplies = (parentId) =>
    comments.filter((c) => c.parentId === parentId);

  // 댓글 수정 시작
  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
  };

  // 댓글 수정/저장
  const handleSave = (commentId, newText) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, text: newText } : c))
    );
    setEditingCommentId(null);
  };

  // 댓글 삭제
  const handleDelete = (comment) => {
    if (window.confirm("삭제할까요?")) {
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
    }
  };

  // 댓글 좋아요 처리
  const handleLike = async (comment, alreadyLiked) => {
    try {
      const updatedLikes = alreadyLiked
        ? Math.max(0, comment.likes - 1)
        : comment.likes + 1;

      const updatedLikedUserIds = alreadyLiked
        ? comment.likedUserIds.filter((id) => id !== currentUser.id)
        : [...comment.likedUserIds, currentUser.id];

      await apiPatch("comments", comment.id, {
        likes: updatedLikes,
        likedUserIds: updatedLikedUserIds,
      });

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

  // 정렬된 전체 댓글 목록
  const sortedComments = [...comments].sort((a, b) => {
    if (sortType === "likes") return b.likes - a.likes; // 좋아요순
    return new Date(b.createdAt) - new Date(a.createdAt); // 최신순 (기본값)
  });

  // 댓글/답글 구분
  const parentComments = sortedComments.filter((c) => !c.parentId);

  return (
    <div className="comment-list">
      {/* 정렬 버튼 */}
      <div>
        <button onClick={() => setSortType("latest")}>최신순</button>
        <button onClick={() => setSortType("likes")}>좋아요순</button>
      </div>

      {/* 댓글 렌더링 */}
      {parentComments.map((comment) => {
        const user = users.find((u) => String(u.id) === String(comment.userId));

        return (
          <div className="comment-item" key={comment.id} style={{ flexDirection: "column", alignItems: "flex-start" }}>
            {/* 댓글 수정 중인지 여부에 따라 렌더링 분기 */}
            {editingCommentId === comment.id ? (
              <CommentEditForm
                comment={comment}
                onSave={(newText) => handleSave(comment.id, newText)}
                onCancel={() => setEditingCommentId(null)}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="comment-author">{user?.name || comment.authorName || comment.authorId}</span>
                <span className="comment-content">{comment.text}</span>
                <span className="comment-date">{comment.createdAt}</span>
                <span> | 좋아요: {comment.likes}</span>

                {/* 좋아요, 수정, 삭제, 답글버튼 */}
                <div className="comment-buttons">
                  {currentUser && (
                    <LikeButton
                      comment={comment}
                      currentUser={currentUser}
                      onLike={handleLike}
                    />
                  )}
                  <CommentActions
                    comment={comment}
                    currentUser={currentUser}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  {currentUser && (
                    <button
                      onClick={() => setReplyTo(comment.id)}
                      className="comment-reply-button"
                    >
                      답글달기
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 답글 입력 */}
            {replyTo === comment.id && (
              <CommentForm
                currentUser={currentUser}
                id={comment.postId}
                setComments={setComments}
                parentId={comment.id}
                onCancel={() => setReplyTo(null)}
              />
            )}

            {/* 대댓글 리스트 */}
            <div style={{ marginLeft: 32 }}>
              {getReplies(comment.id).map((reply) => {
                const replyUser = users.find((u) => String(u.id) === String(reply.userId));
                return (
                  <div className="reply-item comment-item" key={reply.id}>
                    {editingCommentId === reply.id ? (
                      <CommentEditForm
                        comment={reply}
                        onSave={(newText) => handleSave(reply.id, newText)}
                        onCancel={() => setEditingCommentId(null)}
                      />
                    ) : (
                      <>
                        <span className="reply-label">↳ 대댓글</span>
                        <span className="comment-author">{replyUser?.name || reply.authorName || reply.authorId}</span>
                        <span className="comment-content">{reply.text}</span>
                        <span className="comment-date">{reply.createdAt}</span>
                        <span> | 좋아요: {reply.likes}</span>
                        <div className="comment-buttons">
                          {currentUser && (
                            <LikeButton
                              comment={reply}
                              currentUser={currentUser}
                              onLike={handleLike}
                            />
                          )}
                          <CommentActions
                            comment={reply}
                            currentUser={currentUser}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
