import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import "./Signup.css";

const API_URL = `${API_BASE_URL}/users`;

export function Signup() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [passwd, setPassword] = useState("");

  const [idCheckMsg, setIdCheckMsg] = useState("");
  const [idCheckColor, setIdCheckColor] = useState("black");

  const navigate = useNavigate();

  const nameRegex = /^[가-힣a-zA-Z]+$/; // 이름에 공백 허용x
  const idRegex = /^[a-zA-Z0-9]+$/; // 아이디에 영문, 숫자만 허용
  const passwordRegex = /^[^\u3131-\uD79D]+$/; // 비밀번호에 한글 x, (u3131-\uD79D는 유니코드 문자 범위에서 한글)

  const isNameValid = nameRegex.test(name);
  const isUserIdValid = idRegex.test(userId);
  const isPasswordValid = passwordRegex.test(passwd);

  const checkDuplicateId = async () => {
    // 아이디 입력칸에 입력하고 중복확인 버튼을 눌렀을때 실행
    if (!userId) {
      setIdCheckMsg("아이디를 입력하세요.");
      setIdCheckColor("red");
      return;
    }
    if (!isUserIdValid) {
      setIdCheckMsg("아이디 형식이 올바르지 않습니다.");
      setIdCheckColor("red");
      return;
    }

    try {
      const res = await fetch(`${API_URL}?loginId=${userId}`); // api_url?loginId=입력값 으로 fetch 요청
      const users = await res.json(); // json 배열을 받음

      if (users.length > 0) {
        // json 배열을 받아서 길이가 0이면 사용가능, 1 이상이면 이미 존재하는 아이디입니다
        setIdCheckMsg("이미 존재하는 아이디입니다.");
        setIdCheckColor("red");
      } else {
        setIdCheckMsg("사용 가능한 아이디입니다.");
        setIdCheckColor("green");
      }
    } catch (err) {
      console.error("중복 확인 중 오류:", err);
      setIdCheckMsg("중복 확인 중 오류가 발생했습니다.");
      setIdCheckColor("red");
    }
  };

  const handleSignup = async () => {
    if (!name || !userId || !passwd) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    if (!isNameValid) {
      alert("이름 형식이 올바르지 않습니다.");
      return;
    }

    if (!isUserIdValid) {
      alert("아이디 형식이 올바르지 않습니다.");
      return;
    }

    if (!isPasswordValid) {
      alert("비밀번호에 한글을 포함할 수 없습니다.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}?loginId=${userId}`);
      const existingUsers = await res.json();

      if (existingUsers.length > 0) {
        alert("이미 존재하는 아이디입니다.");
        return;
      }

      const postRes = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          loginId: userId,
          password: passwd,
        }),
      });

      if (postRes.ok) {
        alert("회원가입 성공!");
        setName("");
        setUserId("");
        setPassword("");
        setIdCheckMsg("");
        navigate("/login");
      } else {
        alert("회원가입 실패! 서버 오류");
      }
    } catch (err) {
      console.error("에러 발생:", err);
      alert("서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>회원가입</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 (한글/영어만)"
        />
        {name && !isNameValid && (
          <div className="warn">
            이름에는 숫자나 특수문자를 사용할 수 없습니다.
          </div>
        )}

        <div className="id-check">
          <input
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setIdCheckMsg("");
            }}
            placeholder="아이디 (영문/숫자만)"
          />
          <button onClick={checkDuplicateId}>중복확인</button>
        </div>
        {userId && !isUserIdValid && (
          <div className="warn">특수문자 또는 한글은 사용할 수 없습니다.</div>
        )}
        {idCheckMsg && <div style={{ color: idCheckColor }}>{idCheckMsg}</div>}

        <input
          type="password"
          value={passwd}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (한글 제외)"
        />
        {passwd && !isPasswordValid && (
          <div className="warn">비밀번호에 한글을 포함할 수 없습니다.</div>
        )}

        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
}

export default Signup;
