import { useNavigate } from "react-router-dom";
import '../travel/travel.css';

const API_URL = "http://localhost:3001/members";

function DeleteMember ({ memberId, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    fetch(`${API_URL}/${memberId}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("멤버 정보가 삭제되었습니다.");
        onDelete();
        navigate("/team");
      });
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      🗑 삭제
    </button>
  );
}

export default DeleteMember;