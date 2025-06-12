function CommentActions({ comment, currentUser, onEdit, onDelete }) {
  const isOwner =
    currentUser && String(currentUser.id) === String(comment.userId);

  if (!isOwner) return null;

  return (
    <>
      <button onClick={() => onEdit(comment)}>수정</button>
      <button onClick={() => onDelete(comment)}>삭제</button>
    </>
  );
}

export default CommentActions;
