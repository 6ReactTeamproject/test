import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../components/Travel/DeleteButton";
import EditTravelIntro from "./EditTravelIntro";
import { useUser } from "../components/Travel/UserContext";
import '../components/Travel/travel.css';

export default function DetailTravel() {
  const [travelPlace, setTravelPlace] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    fetch(`http://localhost:3001/semester/${id}`)
      .then(res => res.json())
      .then(data => setTravelPlace(data));
  }, [id]);

  if (!travelPlace) return <p>로딩 중...</p>;

  const isOwner = user?.id === travelPlace.authorId;

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
            {isOwner && (
              <div className="button-group">
                <button onClick={() => setIsEditing(true)} className="add-button">✏️ 수정</button>
                <DeleteButton endpoint="semester" Id={travelPlace.id} backaddress="/intro" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
