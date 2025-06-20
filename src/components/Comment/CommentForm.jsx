// 댓글/대댓글 작성 폼 컴포넌트
import { useState } from "react";
import { apiPost } from "../../api/fetch";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import { MESSAGES } from "../../constants";
import "../../styles/form.css";

function CommentForm({ currentUser, id, setComments, onCancel, parentId }) {
  // 댓글 텍스트 상태 관리
  const [values, setValues] = useState({ text: "" });

  // 입력창에 텍스트 입력할 때마다 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // 입력창 초기화 (빈 텍스트로 리셋)
  const reset = () => {
    setValues({ text: "" });
  };

  // 폼 제출 처리 (댓글/대댓글 저장)
  const handleSubmit = (e) => {
    e.preventDefault();
    // 빈 텍스트면 경고창 띄우고 함수 종료
    if (!values.text.trim()) {
      alert(MESSAGES.REQUIRED_FIELD);
      return;
    }

    // 서버에 댓글/대댓글 데이터 전송
    apiPost("comments", {
      text: values.text,
      postId: id,
      userId: currentUser.id,
      parentId: parentId || null, // 대댓글이면 parentId, 일반 댓글이면 null
      createdAt: new Date().toISOString(),
      likes: 0, // 초기 좋아요 수는 0
      likedUserIds: [], // 초기 좋아요한 유저 목록은 빈 배열
    }).then((newComment) => {
      // 댓글 목록에 새 댓글 추가
      setComments((prev) => [...prev, newComment]);
      // 입력창 초기화
      reset();
      // 취소 함수가 있으면 실행 (대댓글 입력창 닫기)
      if (onCancel) {
        onCancel();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <FormInput
        name="text"
        value={values.text}
        onChange={handleChange}
        placeholder={parentId ? "답글을 입력하세요" : "댓글을 입력하세요"}
        className="form-input"
      />
      <div className="button-group">
        {/* 대댓글이면 "답글 작성", 일반 댓글이면 "댓글 작성" */}
        <FormButton type="submit" className="add-button">
          {parentId ? "답글 작성" : "댓글 작성"}
        </FormButton>
        {/* onCancel 함수가 있으면 취소 버튼 보여줌 (대댓글 입력창에서만) */}
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

export default CommentForm;
