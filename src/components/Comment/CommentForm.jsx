import { apiPost } from "../../api/fetch";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import { useForm } from "../../hooks/useForm";
import { MESSAGES } from "../../constants";
import "../../styles/form.css";

export default function CommentForm({ currentUser, id, setComments }) {
  const { values, handleChange, reset } = useForm({ text: "" });

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
      createdAt: new Date().toISOString(),
      likes: 0,
      likedUserIds: [],
    }).then((newComment) => {
      setComments((prev) => [...prev, newComment]);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <FormInput
        name="text"
        value={values.text}
        onChange={handleChange}
        placeholder="댓글을 입력하세요"
      />
      <FormButton type="submit" className="add-button">
        댓글 작성
      </FormButton>
    </form>
  );
}
