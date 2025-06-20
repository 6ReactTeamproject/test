import React, { useState } from 'react';
import { useUser } from "../../hooks/UserContext";
import Sidebar from "./Sidebar";

export default function ChangeNameForm() {
  const { user, setUser } = useUser(); // 로그인한 사용자 정보와 설정 함수 가져오기
  const [name, setName] = useState(""); // 새 닉네임 입력값 상태
  const [isValid, setIsValid] = useState(true); // 닉네임 유효성 상태

  if (!user) return <p>로그인이 필요합니다.</p>; // 비로그인 상태 접근 방지 

  // 한글, 영문, 숫자만 허용 (특수문자 제외)
  const nameRegex = /^[가-힣a-zA-Z0-9]+$/;

  // 닉네임 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지

    // 유효성 검사 실패 시
    if (!nameRegex.test(name)) {
      setIsValid(false);
      return;
    }

    // 기존 닉네임과 동일할 경우 중복 경고
    if (name === user.name) {
      alert('현재 닉네임과 동일합니다.');
      return;
    }

    try {
      // 에 PATCH 요청 보내 닉네임 수정
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      const updatedUser = await res.json();

      // Context와 localStorage에 변경 내용 반영
      setUser({ ...user, name: updatedUser.name });
      localStorage.setItem('user', JSON.stringify({ ...user, name: updatedUser.name }));

      alert('닉네임이 변경되었습니다.');
      setName(""); // 입력창 초기화
    } catch (err) {
      console.error(err);
      alert('닉네임 변경 중 오류가 발생했습니다.');
    }
  };

  // 입력값 변경 시 유효성 실시간 검사
  const handleChange = (e) => {
    const input = e.target.value;
    setName(input);

    // 입력이 비었을 때는 경고 제거
    if (input === '') {
      setIsValid(true);
    } else {
      setIsValid(nameRegex.test(input)); // 정규식 통과 여부로 isValid 설정
    }
  };

  return (
    <div className="mypage-container">
      <Sidebar/>
      <div style={{ maxWidth: '300px', margin: '40px 0' }}>
        <hr />
      </div>
      <form onSubmit={handleSubmit} className="change-name-form">
        <h3>닉네임 변경</h3>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="변경할 닉네임"
            value={name}
            onChange={handleChange}
            required
          />
          <button type="submit">변경하기</button>
        </div>
        {/* 유효하지 않은 닉네임 입력 시 경고 메시지 */}
        {!isValid && name && (
          <p style={{ color: 'red', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            특수문자는 사용할 수 없어요!
          </p>
        )}
      </form>
    </div>
  );
}
