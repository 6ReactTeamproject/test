import React, { useState } from 'react';
import { useUser } from "../../hooks/UserContext";

export default function ChangeNameForm({ userId, currentName }) {
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);

  // 한글, 영문, 숫자만 허용 (특수문자 제외)
  const nameRegex = /^[가-힣a-zA-Z0-9]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nameRegex.test(name)) {
      setIsValid(false);
      return;
    }

    if (name === currentName) {
      alert('현재 닉네임과 동일합니다.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const updatedUser = await res.json();

      // Context와 localStorage 동기화
      setUser({ ...user, name: updatedUser.name });
      localStorage.setItem('user', JSON.stringify({ ...user, name: updatedUser.name }));

      alert('닉네임이 변경되었습니다.');
      setName("");
    } catch (err) {
      console.error(err);
      alert('닉네임 변경 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setName(input);
    // 입력이 없을 때는 메시지 숨기기
    if (input === '') {
      setIsValid(true);
    } else {
      setIsValid(nameRegex.test(input));
    }
  };

  return (
    <>
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
        {/* 입력값이 있을 때만 유효성 경고 출력 */}
        {!isValid && name && (
          <p style={{ color: 'red', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            특수문자는 사용할 수 없어요!
          </p>
        )}
      </form>
    </>
  );
}
