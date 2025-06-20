import { useState } from "react";
import { apiPost } from "../../api/fetch";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import { MESSAGES } from "../../constants";
import "../../styles/form.css";

export default function CommentForm({
  currentUser,   // 로그인 중인 사용자
  id,            // 댓글을 작성할 게시글 ID
  setComments,   // 댓글 목록을 갱신
  onCancel,      // 취소 버튼 클릭
  parentId,      // 답글 작성
}) {
  const [values, setValues] = useState({ text: "" }); // 입력값 상태

  // 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // 초기화
  const reset = () => {
    setValues({ text: "" });
  };

  // 댓글/답글
  const handleSubmit = (e) => {
    e.preventDefault();

    // 비어 있으면 알림 후 중단
    if (!values.text.trim()) {
      alert(MESSAGES.REQUIRED_FIELD);
      return;
    }

    // 댓글 생성
    apiPost("comments", {
      text: values.text,
      postId: id,
      userId: currentUser.id,
      parentId: parentId || null,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedUserIds: [],
    }).then((newComment) => {
      // 새 댓글을 기존 댓글 목록에 추가
      setComments((prev) => [...prev, newComment]);
      reset();         // 입력 초기화
      if (onCancel) {
        onCancel();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* 댓글/답글 입력 필드 */}
      <FormInput
        name="text"
        value={values.text}
        onChange={handleChange}
        placeholder={parentId ? "답글을 입력하세요" : "댓글을 입력하세요"}
        className="form-input"
      />

      {/* 버튼 영역 */}
      <div className="button-group">
        <FormButton type="submit" className="add-button">
          {parentId ? "답글 작성" : "댓글 작성"}
        </FormButton>

        {/* 취소 버튼은 답글일 때만 표시 */}
        {onCancel && (
          <FormButton
            type="button"
            onClick={onCancel}
            className="cancel-button"
          >
            취소
          </FormButton>
        )}
      </div>
    </form>
  );
}
