import React, { useState } from "react";
import { useUser } from "../../hooks/UserContext";
import Sidebar from "./Sidebar";

export default function ChangePasswordForm() {
  const { user } = useUser();

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  if (!user) return <p>로그인이 필요합니다.</p>; // 마이페이지에서 로그아웃 한 경우에 띄우는 메세지예요

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
      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const userData = await res.json();

      if (userData.password !== currentPw) {
        alert("현재 비밀번호가 틀립니다.");
        return;
      }

      const updateRes = await fetch(`http://localhost:3001/users/${user.id}`, {
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
    <div className="mypage-container">
      <Sidebar/>
      
      <form onSubmit={handleSubmit}>
        <h3>비밀번호 변경</h3>
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
