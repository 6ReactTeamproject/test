import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteTravelIntro from "./DeleteTravelIntro";
import EditTravelIntro from "./EditTravelIntro";
import './travel.css';

export default function DetailTravel() {
  const [travelPlace, setTravelPlace] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/semester/${id}`)
      .then(res => res.json())
      .then(data => setTravelPlace(data));
  }, [id]);

  if (!travelPlace) return <p>로딩 중...</p>;

  return (
    <div className="modal-overlay" onClick={() => navigate("/intro")}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <EditTravelIntro
            travelPlace={travelPlace}
            onDone={(updated) => {
              setTravelPlace(updated);
              setIsEditing(false);
            }}
          />
        ) : (
          <>
            <img src={travelPlace.imageUrl} alt="preview" style={{ width: "100%", borderRadius: "8px" }} />
            <h3>{travelPlace.title}</h3>
            <p>{travelPlace.description}</p>
            <div className="button-group">
              <button onClick={() => setIsEditing(true)} className="add-button">✏️ 수정</button>
              <DeleteTravelIntro travelId={travelPlace.id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
