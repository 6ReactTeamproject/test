// ReadMember.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditMember from "./EditMember";
import DeleteMember from "./DeleteMember";
import '../travel/travel.css';

const API_URL = "http://localhost:3001/members";

function ReadMember() {
    const [members, setMembers] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/${id}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
              console.log("dadadadada", data)
              setMembers(data)
            });
    }, [id]);

    if (!members) return <p>로딩 중...</p>;

    return (
        <div className="modal-overlay" onClick={() => navigate("/team")}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                <img src={members.profileImage} alt="preview" style={{ fit_content:10, borderRadius: "8px" }} />
                <br />
                <strong>{members.name}</strong> - {members.role}  
                <p>{members.introduction}</p>
                <div className="button-group">
                  <button onClick={() => setIsEditing(true)} className="add-button">✏️ 수정</button>
                  <DeleteMember
                    memberId ={members.id}
                    onDelete={() => navigate("/team")} />
                </div>
              </>
            )}
          </div>
        </div>
      );

}



export default ReadMember;