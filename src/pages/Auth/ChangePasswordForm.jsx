import React, { useState } from "react";

export default function ChangePasswordForm({ userId }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPw || !newPw || !confirmPw) {
      alert("모든 비밀번호 필드를 입력해주세요.");
      return;
    }

    if (newPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`);
      const user = await res.json();

      if (user.password !== currentPw) {
        alert("현재 비밀번호가 틀립니다.");
        return;
      }

      const updateRes = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPw }),
      });

      if (updateRes.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        alert("비밀번호 변경 실패: 서버 오류");
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류:", error);
      alert("비밀번호 변경 실패: 통신 오류");
    }
  };

  return (
    <div>
      <h3>비밀번호 변경</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "250px" }}>
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
          <button type="submit">변경하기</button>
        </div>
      </form>
    </div>
  );
}
