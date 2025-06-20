import { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import CommentActions from "./CommentActions";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";
import { apiPatch } from "../../api/fetch";
import "../../styles/comment.css";

// 댓글/대댓글 목록 컴포넌트
export default function CommentList({
  comments,
  setComments,
  users,
  currentUser,
}) {
  // 수정 중인 댓글 id 저장
  const [editingCommentId, setEditingCommentId] = useState(null);
  // 정렬 타입(최신순/좋아요순)
  const [sortType, setSortType] = useState("");
  // 대댓글 입력창 열려있는 댓글 id
  const [replyTo, setReplyTo] = useState(null);

  // parentId가 일치하는 대댓글만 골라서 반환
  const getReplies = (parentId) =>
    comments.filter((c) => c.parentId === parentId);

  // 수정 버튼 누르면 해당 댓글 id를 editingCommentId에 저장
  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
  };

  // 저장 버튼 누르면 댓글 내용 업데이트하고 수정 모드 해제
  const handleSave = (commentId, newText) => {
    // 댓글 목록에서 해당 댓글 찾아서 텍스트만 바꿔줌
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, text: newText } : c))
    );
    // 수정 모드 해제
    setEditingCommentId(null);
  };

  // 삭제 버튼 누르면 확인창 띄우고, 확인 누르면 해당 댓글 삭제
  const handleDelete = (comment) => {
    if (window.confirm("삭제할까요?")) {
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
    }
  };

  // 좋아요 버튼 누르면 서버에 PATCH 요청 보내고, 상태 업데이트
  const handleLike = async (comment, alreadyLiked) => {
    try {
      // 이미 좋아요 눌렀으면 -1, 아니면 +1
      const updatedLikes = alreadyLiked
        ? Math.max(0, comment.likes - 1)
        : comment.likes + 1;
      // likedUserIds 배열에서 현재 유저 id 추가/제거
      const updatedLikedUserIds = alreadyLiked
        ? comment.likedUserIds.filter((id) => id !== currentUser.id)
        : [...comment.likedUserIds, currentUser.id];

      // 서버에 PATCH 요청
      await apiPatch("comments", comment.id, {
        likes: updatedLikes,
        likedUserIds: updatedLikedUserIds,
      });

      // 상태 업데이트
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

  // 정렬 타입에 따라 댓글 정렬
  const sortedComments = [...comments].sort((a, b) => {
    if (sortType === "likes") return b.likes - a.likes; // 좋아요순
    return new Date(b.createdAt) - new Date(a.createdAt); // 최신순
  });

  // 부모 댓글만 추출(대댓글 제외)
  const parentComments = sortedComments.filter((c) => !c.parentId);

  return (
    <div className="comment-list">
      {/* 정렬 버튼 영역 */}
      <div className="comment-sort-buttons">
        {/* 최신순 버튼 */}
        <button
          className={`comment-sort-button${
            sortType === "latest" ? " active" : ""
          }`}
          onClick={() => setSortType("latest")}
        >
          최신순
        </button>
        {/* 좋아요순 버튼 */}
        <button
          className={`comment-sort-button${
            sortType === "likes" ? " active" : ""
          }`}
          onClick={() => setSortType("likes")}
        >
          좋아요순
        </button>
      </div>

      {/* 댓글 목록 렌더링 */}
      {parentComments.map((comment) => {
        // 댓글 작성자 정보 찾기
        const user = users.find((u) => String(u.id) === String(comment.userId));
        return (
          <div
            className="comment-item"
            key={comment.id}
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            {/* 수정 중이면 수정 폼 보여주고, 아니면 댓글 내용 보여줌 */}
            {editingCommentId === comment.id ? (
              <CommentEditForm
                comment={comment}
                onSave={(newText) => handleSave(comment.id, newText)}
                onCancel={() => setEditingCommentId(null)}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* 작성자 이름 */}
                <span className="comment-author">
                  {user?.name || comment.authorName || comment.authorId}
                </span>
                {/* 댓글 내용 */}
                <span className="comment-content">{comment.text}</span>
                {/* 작성일 */}
                <span className="comment-date">{comment.createdAt}</span>
                {/* 좋아요 수 */}
                <span> | 좋아요: {comment.likes}</span>
                <div className="comment-buttons">
                  {/* 좋아요 버튼 */}
                  {currentUser && (
                    <LikeButton
                      comment={comment}
                      currentUser={currentUser}
                      onLike={handleLike}
                    />
                  )}
                  {/* 수정/삭제 버튼 */}
                  <CommentActions
                    comment={comment}
                    currentUser={currentUser}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  {/* 답글달기 버튼 (로그인한 유저만) */}
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

            {/* 대댓글 입력 폼 (답글달기 버튼 눌렀을 때만) */}
            {replyTo === comment.id && (
              <CommentForm
                currentUser={currentUser}
                id={comment.postId}
                setComments={setComments}
                parentId={comment.id}
                onCancel={() => setReplyTo(null)}
              />
            )}

            {/* 대댓글 목록 렌더링 */}
            <div style={{ marginLeft: 32 }}>
              {getReplies(comment.id).map((reply) => {
                // 대댓글 작성자 정보 찾기
                const replyUser = users.find(
                  (u) => String(u.id) === String(reply.userId)
                );
                return (
                  <div className="reply-item comment-item" key={reply.id}>
                    {/* 대댓글 수정 중이면 수정 폼, 아니면 대댓글 내용 */}
                    {editingCommentId === reply.id ? (
                      <CommentEditForm
                        comment={reply}
                        onSave={(newText) => handleSave(reply.id, newText)}
                        onCancel={() => setEditingCommentId(null)}
                      />
                    ) : (
                      <>
                        {/* 대댓글 표시 라벨 */}
                        <span className="reply-label">↳ 대댓글</span>
                        {/* 대댓글 작성자 */}
                        <span className="comment-author">
                          {replyUser?.name ||
                            reply.authorName ||
                            reply.authorId}
                        </span>
                        {/* 대댓글 내용 */}
                        <span className="comment-content">{reply.text}</span>
                        {/* 대댓글 작성일 */}
                        <span className="comment-date">{reply.createdAt}</span>
                        {/* 대댓글 좋아요 수 */}
                        <span> | 좋아요: {reply.likes}</span>
                        <div className="comment-buttons">
                          {/* 대댓글 좋아요 버튼 */}
                          {currentUser && (
                            <LikeButton
                              comment={reply}
                              currentUser={currentUser}
                              onLike={handleLike}
                            />
                          )}
                          {/* 대댓글 수정/삭제 버튼 */}
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
