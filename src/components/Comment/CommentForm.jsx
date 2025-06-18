import { useState } from "react";
import { apiPost } from "../../api/fetch";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import { MESSAGES } from "../../constants";
import "../../styles/form.css";

export default function CommentForm({
  currentUser,
  id,
  setComments,
  onCancel,
  parentId,
}) {
  const [values, setValues] = useState({ text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setValues({ text: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.text.trim()) {
      alert(MESSAGES.REQUIRED_FIELD);
      return;
    }

    apiPost("comments", {
      text: values.text,
      postId: id,
      userId: currentUser.id,
      parentId: parentId || null,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedUserIds: [],
    }).then((newComment) => {
      setComments((prev) => [...prev, newComment]);
      reset();
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
      />
      <FormButton type="submit" className="add-button">
        {parentId ? "답글 작성" : "댓글 작성"}
      </FormButton>
      {onCancel && (
        <FormButton
          type="button"
          onClick={onCancel}
          style={{ marginLeft: "8" }}
        >
          취소
        </FormButton>
      )}
    </form>
  );
}
