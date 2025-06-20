import { useState } from "react";

// 댓글 수정 입력 폼 컴포넌트
function CommentEditForm({ comment, onSave, onCancel }) {
  // 수정할 텍스트 상태 (기존 댓글 텍스트로 초기화)
  const [editingText, setEditingText] = useState(comment.text);

  return (
    <div className="comment-edit-form">
      {/* 수정할 텍스트 입력창 (기존 텍스트가 미리 입력되어 있음) */}
      <input
        className="comment-edit-input"
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      />
      <div className="comment-edit-buttons">
        {/* 저장 버튼 (수정된 텍스트를 onSave 함수로 전달) */}
        <button
          className="comment-save-button"
          onClick={() => onSave(editingText)}
        >
          저장
        </button>
        {/* 취소 버튼 (수정 모드 해제) */}
        <button className="comment-cancel-button" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}

export default CommentEditForm;
