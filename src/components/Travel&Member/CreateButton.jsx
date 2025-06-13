import { Children, cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import { apiPost } from "../../api/fetch";
import FormButton from "../common/FormButton";
import { MESSAGES } from "../../constants";
import "../../styles/form.css";

export default function CreateButton({
  endpoint,
  redirect,
  empty,
  children,
  inputs,
  setInputs,
}) {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!empty(inputs)) {
      alert(MESSAGES.REQUIRED_FIELD);
      return;
    }

    try {
      await apiPost(
        endpoint,
        {
          ...inputs,
          authorId: user.id,
        },
        () => {
          alert(MESSAGES.CREATE_SUCCESS);
          navigate(redirect);
        }
      );
    } catch (error) {
      alert(MESSAGES.CREATE_FAIL);
      console.error(error);
    }
  };

  const enhancedChildren = Children.map(children, (child) => {
    if (!child?.props?.name) return child;
    return cloneElement(child, {
      value: inputs[child.props.name] || "",
      onChange: (e) =>
        setInputs((prev) => ({
          ...prev,
          [child.props.name]: e.target.value,
        })),
    });
  });

  return (
    <div className="form-container">
      {enhancedChildren}
      <div className="button-group">
        <FormButton onClick={handleSubmit} className="add-button">
          등록
        </FormButton>
        <FormButton
          onClick={() => navigate(redirect)}
          className="cancel-button"
        >
          취소
        </FormButton>
      </div>
    </div>
  );
}
