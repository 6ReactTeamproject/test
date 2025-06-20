import React, { useState } from "react";
import { useUser } from "../../hooks/UserContext";
import Sidebar from "./Sidebar";

export default function ChangePasswordForm() {
  const { user } = useUser(); // 로그인된 사용자 정보 가져오기

  const [currentPw, setCurrentPw] = useState(""); // 현재 비밀번호 입력값
  const [newPw, setNewPw] = useState(""); // 새 비밀번호 입력값
  const [confirmPw, setConfirmPw] = useState(""); // 새 비밀번호 확인 입력값

  // 로그인하지 않은 사용자는 접근할 수 없음
  if (!user) return <p>로그인이 필요합니다.</p>; // 마이페이지에서 로그아웃한 경우 

  // 비밀번호 변경 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작(새로고침) 방지

    // 필드가 하나라도 비어있으면 알림 표시
    if (!currentPw || !newPw || !confirmPw) {
      alert("모든 비밀번호 필드를 입력해주세요.");
      return;
    }

    // 새 비밀번호와 확인 값이 일치하지 않을 경우
    if (newPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 사용자 정보 요청 (기존 비밀번호 확인)
      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const userData = await res.json();

      // 현재 비밀번호가 실제와 다르면 오류
      if (userData.password !== currentPw) {
        alert("현재 비밀번호가 틀립니다.");
        return;
      }

      // 비밀번호 업데이트 요청
      const updateRes = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPw }),
      });

      // 성공 시 메시지 출력 및 입력값 초기화
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
      <Sidebar />

      <form onSubmit={handleSubmit}>
        <h3>비밀번호 변경</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "250px",
          }}
        >
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
