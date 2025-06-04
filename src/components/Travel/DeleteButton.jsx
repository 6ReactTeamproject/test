import { useNavigate } from "react-router-dom";
import './travel.css';

export default function DeleteButton({ endpoint, Id, backaddress }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;
    
    fetch(`http://localhost:3001/${endpoint}/${Id}`, {
      method: "DELETE",
    }).then(() => {
      alert("삭제 완료");
      navigate(backaddress);
    });
  };
    
  return (
    <button onClick={handleDelete} className="delete-button">
      🗑 삭제
    </button>
  );
}
