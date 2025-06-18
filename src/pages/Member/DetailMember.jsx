import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditMember from "./EditMember";
import DeleteButton from "../../components/Travel&Member/DeleteButton";
import { useUser } from "../../hooks/UserContext";
import "../../styles/travel.css";
import "../../styles/post.css";
const API_URL = "http://localhost:3001/members";

function DetailMember() {
  const [members, setMembers] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    fetch(`${API_URL}/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
      });
  }, [id]);

  if (!members) return <p>로딩 중...</p>;

  const isOwner = user?.id === members.authorId;

  return (
    <>
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
            <EditMember
              member={members}
              onDone={(updated) => {
                setMembers(updated);
                setIsEditing(false);
              }}
            />
          ) : (
            <>
              {members.imageUrl && (
                <img
                  src={members.imageUrl}
                  alt="preview"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
              <br />
              <strong>{members.name}</strong>
              <p>{members.introduction}</p>

              {isOwner && (
                <div className="button-group">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="add-button"
                  >
                    ✏️ 수정
                  </button>
                  <DeleteButton
                    endpoint="members"
                    Id={members.id}
                    backaddress="/team"
                  />
                </div>
              )}
            </>
          )}
        </div>
    </>
  );
}

export default DetailMember;
