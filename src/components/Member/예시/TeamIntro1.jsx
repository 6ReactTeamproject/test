// components/TeamIntro.jsx
import { useEffect, useState } from "react";
import IntroForm from "./IntroForm";
import { MemberItem } from "./MemberItem";

const API_URL = "http://localhost:3001/members";

function TeamIntro() {
  const [members, setMembers] = useState([]);
  const [magnifyMember, setMagnifyMember] = useState(null);

  const fetchMembers = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMembers(data));
  };

  const handleAddMember = (newMember) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMember),
    }).then(() => {
      alert("멤버가 생성되었습니다.");
      fetchMembers();
    });
  };

  const handleDeleteMember = (memberId) => {
    fetch(`${API_URL}/${memberId}`, { method: "DELETE" })
      .then(() => {
        alert("멤버가 삭제되었습니다.");
        fetchMembers();
      });
  };

  const handleEditMember = (memberId) => {
    const memberToEdit = members.find(m => m.id === memberId);
    if (!memberToEdit) return;

    fetch(`${API_URL}/${memberId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberToEdit),
    }).then(() => {
      alert("멤버가 수정되었습니다.");
      fetchMembers();
    });
  };

  const handleMemberClick = (memberId) => {
    fetch(`${API_URL}/${memberId}`)
      .then(res => res.json())
      .then(data => setMagnifyMember(data));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <h2>조원 소개</h2>
      <IntroForm onSubmit={handleAddMember} />
      <ul>
        {members.map(member => (
          <MemberItem
            key={member.id}
            member={member}
            onClick={handleMemberClick}
            onDelete={handleDeleteMember}
            onEdit={handleEditMember}
          />
        ))}
      </ul>
      {magnifyMember && (
        <div>
          <h3>{magnifyMember.name} 상세 보기</h3>
          <p>{magnifyMember.role}</p>
          <p>{magnifyMember.introduction}</p>
          <img src={magnifyMember.profileImage} alt={magnifyMember.name} width={300} />
        </div>
      )}
    </div>
  );
}

export default TeamIntro;
