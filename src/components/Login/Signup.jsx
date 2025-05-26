import React, { useState } from "react";

const API_URL = "http://localhost:3001/users";

export function Signup() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [passwd, setPassword] = useState("");

  const handleSignup = async () => {
    // 🔒 유효성 검사
    if (!name || !userId || !passwd) {
      alert("이름, 아이디, 비밀번호를 모두 입력하세요.");
      return;
    }

    // 아이디 중복 확인
    const res = await fetch(`${API_URL}?loginId=${userId}`);
    const existingUsers = await res.json();

    if (existingUsers.length > 0) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }

    // 회원가입 요청
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, loginId: userId, password: passwd }),
    })
      .then((res) => {
        if (res.ok) {
          alert("회원가입 성공!");
          // 입력값 초기화
          setName("");
          setUserId("");
          setPassword("");
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("에러 발생!");
      });
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <br />
      <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디" />
      <br />
      <input value={passwd} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" type="password" />
      <br />
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default Signup;