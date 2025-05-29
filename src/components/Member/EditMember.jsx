import { useState } from "react";
import '../travel/travel.css';

const API_URL = "http://localhost:3001/members";

function EditMember ({ member, onDone }) {
    const name = member.name;
    const [role, setRole] = useState(member.role);
    const [introduction, setIntroduction] = useState(member.introduction);
    const [profileImage, setProfileImage] = useState(member.profileImage);
    
    const handleUpdate = (e) => {
        e.preventDefault();
    
        fetch(`${API_URL}/${member.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            ...member,
            name,
            role,
            introduction,
            profileImage,
        }),
        })
        .then((res) => res.json())
        .then((updatedMember) => {
            alert("멤버 정보가 수정되었습니다.");
            onDone(updatedMember);
        });
    };
    
    return (
        <div className="form-container">
            <h2>{name} 정보 수정</h2>
            <label>역할</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} />

            <label>이미지 링크</label>
            <input value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />

            <label>조원 소개</label>
            <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} />

            <div className="button-group">
            <button onClick={handleUpdate} className="add-button">💾 저장</button>
            <button onClick={() => onDone(member)} className="cancel-button">❌ 취소</button>
      </div>
    </div>
    );
}

export default EditMember;