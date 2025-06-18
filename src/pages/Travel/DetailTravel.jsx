import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../components/Travel&Member/DeleteButton";
import EditTravelIntro from "./EditTravelIntro";
import { useUser } from "../../hooks/UserContext";
import "../../styles/post.css";
import "../../styles/travel.css";

export default function DetailTravel() {
  const [travelPlace, setTravelPlace] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    fetch(`http://localhost:3001/semester/${id}`)
      .then((res) => res.json())
      .then((data) => setTravelPlace(data));
  }, [id]);

  if (!travelPlace) return <p>로딩 중...</p>;

  const isOwner = user?.id === travelPlace.authorId;

  return (
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
        <button
        className="close-button"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "12px",
          right: "20px",
          background: "none",
          border: "none",
          fontSize: "2rem",
          color: "#888",
          cursor: "pointer",
          zIndex: 10,
        }}
        aria-label="닫기"
      > × </button>
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
            {travelPlace.imageUrl && (
              <img
                src={travelPlace.imageUrl}
                alt="preview"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}
            <h3>{travelPlace.title}</h3>
            <p>{travelPlace.description}</p>
            {isOwner && (
              <div className="button-group">
                <button
                  onClick={() => setIsEditing(true)}
                  className="add-button"
                >
                  ✏️ 수정
                </button>
                <DeleteButton
                  endpoint="semester"
                  Id={travelPlace.id}
                  backaddress="/intro"
                />
              </div>
            )}
          </>
        )}
      </div>
  );
}
