// components/IntroForm.jsx
import { useState } from "react";

export default function IntroForm({ onSubmit }) {
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberContent, setMemberContent] = useState("");
  const [memberPicture, setMemberPicture] = useState("");

  const handleSubmit = () => {
    onSubmit({ name: memberName, role: memberRole, introduction: memberContent, profileImage: memberPicture });
    setMemberName("");
    setMemberRole("");
    setMemberContent("");
    setMemberPicture("");
  };

  return (
    <div>
      <input value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="이름" />
      <br />
      <input value={memberRole} onChange={(e) => setMemberRole(e.target.value)} placeholder="역할" />
      <br />
      <textarea value={memberContent} onChange={(e) => setMemberContent(e.target.value)} placeholder="내용" />
      <br />
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setMemberPicture(reader.result);
          reader.readAsDataURL(file);
        }
      }} />
      <br />
      <button onClick={memberName && memberRole ? handleSubmit : () => alert("이름과 역할은 반드시 입력해야 합니다.")}>추가</button>
    </div>
  );
}
