import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../travel/travel.css";
const API_URL = "http://localhost:3001/members";

export default function TeamIntro() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <div className="page-container">
      {/* ✅ 왼쪽 상단 홈 버튼 */}
      <button onClick={() => navigate("/")} className="back-button-fixed">🏠 홈으로</button>

      <h1>조원 소개</h1>
      <div className="travel-grid">
        {members.map((member) => (
          <div
            key={member.id}
            className="travel-card"
            onClick={() => navigate(`/team/${member.id}`)} >
            <img src={member.profileImage} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.introduction}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/team/new")}
        className="floating-add-button"
      >
        ➕ 멤버 추가
      </button>
    </div>
  );
}
