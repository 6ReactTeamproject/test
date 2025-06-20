// 댓글 수정/삭제을 렌더링하는 컴포넌트
// 로그인된 사용자가 해당 댓글 작성자인 경우에만 보여짐
const CommentActions = ({
  comment,           // 댓글 데이터
  currentUser,       // 현재 로그인한 사용자 객체
  onEdit,            // 수정 버튼
  onDelete,          // 삭제 버튼
}) => {
  // 로그인/작성자가 아니면 안나옴
  if (!currentUser || String(currentUser.id) !== String(comment.userId))
    return null;

  return (
    <div className="comment-actions">
      {/* 수정 버튼 */}
      <button onClick={() => onEdit(comment)} className="comment-edit-button">
        수정
      </button>

      {/* 삭제 버튼 */}
      <button
        onClick={() => onDelete(comment)}
        className="comment-delete-button"
      >
        삭제
      </button>
    </div>
  );
};

export default CommentActions;
