import { useState, Children, cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Travel/UserContext";
import { apiPost } from "../../api/fetch";
import './travel.css';

export default function CreateButton({ table, redirect, empty, children }) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!empty(inputs)) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    try {
      await apiPost(table, {
        ...inputs,
        authorId: user.id,
      }, () => {
        alert("게시글이 생성되었습니다.");
        navigate(redirect);
      });
    } catch (error) {
      alert("게시글 생성에 실패했습니다.");
      console.error(error);
    }
  };

  const enhancedChildren = Children.map(children, (child) => {
    if (!child?.props?.name) return child;
    return cloneElement(child, {
      value: inputs[child.props.name] || "",
      onChange: handleChange,
    });
  });

  return (
    <div className="form-container">
      {enhancedChildren}
      <div className="button-group">
        <button onClick={handleSubmit} className="add-button">등록</button>
        <button onClick={() => navigate(redirect)} className="cancel-button">취소</button>
      </div>
    </div>
  );
}
