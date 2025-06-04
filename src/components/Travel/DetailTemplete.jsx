import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import { useUser } from "./UserContext";
import { apiGet } from "../../api/fetch";
import "../Travel/travel.css";

export default function DetailTemplate({
  endpoint,
  backTo,
  renderDisplay,
  renderEditor,
}) {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    apiGet(endpoint, id)
      .then(setData)
      .catch(console.error);
  }, [endpoint, id]);

  if (!data) return <p>로딩 중...</p>;

  const isOwner = user?.id === data.authorId;

  return (
    <div className="modal-overlay" onClick={() => navigate(backTo)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          renderEditor(data, (updated) => {
            setData(updated);
            setIsEditing(false);
          })
        ) : (
          <>
            {renderDisplay(data)}
            {isOwner && (
              <div className="button-group">
                <button onClick={() => setIsEditing(true)} className="add-button">
                  ✏️ 수정
                </button>
                <DeleteButton endpoint={endpoint} Id={data.id} backaddress={backTo} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
