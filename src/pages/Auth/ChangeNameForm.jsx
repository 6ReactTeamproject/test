import React, { useState } from 'react';
import { useUser } from "../../hooks/UserContext";
import MypageLayout from "./MypageLayout";
import "../../styles/mypageform.css"; // 공통 스타일 import

export default function ChangeNameForm() {
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);

  if (!user) return <p>로그인이 필요합니다.</p>;

  const nameRegex = /^[가-힣a-zA-Z0-9]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRegex.test(name)) {
      setIsValid(false);
      return;
    }

    if (name === user.name) {
      alert('현재 닉네임과 동일합니다.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      const updatedUser = await res.json();
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
    if (input === '') {
      setIsValid(true);
    } else {
      setIsValid(nameRegex.test(input));
    }
  };

  return (
    <MypageLayout>
      <form onSubmit={handleSubmit} className="mypage-form">
        <h2 className="mypage-form-title">닉네임 변경</h2>

        <input
          type="text"
          placeholder="변경할 닉네임"
          value={name}
          onChange={handleChange}
          className="mypage-form-input"
          required
        />

        <button type="submit" className="mypage-form-button">
          변경하기
        </button>

        {!isValid && name && (
          <p className="mypage-form-error">특수문자는 사용할 수 없어요!</p>
        )}
      </form>
    </MypageLayout>
  );
}
