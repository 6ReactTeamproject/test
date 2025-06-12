import { useState } from "react";

function CommentEditForm({ comment, onSave, onCancel }) {
  const [editingText, setEditingText] = useState(comment.text);

  return (
    <>
      <input
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      />
      <button onClick={() => onSave(editingText)}>저장</button>
      <button onClick={onCancel}>취소</button>
    </>
  );
}

export default CommentEditForm;
