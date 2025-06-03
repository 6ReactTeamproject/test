import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Travel/UserContext";

const API_URL = "http://localhost:3001/members";

function CreateMember() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberContent, setMemberContent] = useState("");
  const [memberPicture, setMemberPicture] = useState("");

  const handleSubmit = () => {
    fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: memberName,
        role: memberRole,
        profileImage: memberPicture,
        introduction: memberContent,
        authorId: user.id, // 작성자 ID 포함
      }),
    }).then(() => {
      alert("멤버가 생성되었습니다.");
      navigate("/team");
      setMemberName("");
      setMemberPicture("");
      setMemberRole("");
      setMemberContent("");
    });
  };

  return (
    <>
      <h2>조원 추가</h2>
      <div>
        <input
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          placeholder="이름"
        />
        <br />
        <input
          value={memberRole}
          onChange={(e) => setMemberRole(e.target.value)}
          placeholder="역할"
        />
        <br />
        <textarea
          value={memberContent}
          onChange={(e) => setMemberContent(e.target.value)}
          placeholder="내용"
        />
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setMemberPicture(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <br />
        <button onClick={handleSubmit}>추가</button>
      </div>
    </>
  );
}

export default CreateMember;
