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
  const [isIdChecked, setIsIdChecked] = useState(false);

  const defaultImageURL = "https://i.ibb.co/Fz1bk4g/default-profile.png";
  const navigate = useNavigate();

  const nameRegex = /^[가-힣a-zA-Z]+$/;
  const idRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^[^\u3131-\uD79D]+$/;

  const isNameValid = nameRegex.test(name);
  const isUserIdValid = idRegex.test(userId);
  const isPasswordValid = passwordRegex.test(passwd);

  const checkDuplicateId = async () => {
    if (!userId) {
      setIdCheckMsg("아이디를 입력하세요.");
      setIdCheckColor("red");
      setIsIdChecked(false);
      return;
    }
    if (!isUserIdValid) {
      setIdCheckMsg("아이디 형식이 올바르지 않습니다.");
      setIdCheckColor("red");
      setIsIdChecked(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}?loginId=${userId}`);
      const users = await res.json();

      if (users.length > 0) {
        setIdCheckMsg("이미 존재하는 아이디입니다.");
        setIdCheckColor("red");
        setIsIdChecked(false);
      } else {
        setIdCheckMsg("사용 가능한 아이디입니다.");
        setIdCheckColor("green");
        setIsIdChecked(true);
      }
    } catch (err) {
      console.error("중복 확인 중 오류:", err);
      setIdCheckMsg("중복 확인 중 오류가 발생했습니다.");
      setIdCheckColor("red");
      setIsIdChecked(false);
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

    if (!isIdChecked) {
      alert("아이디 중복확인 필수"); //
      return;
    }

    try {
      const postRes = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          loginId: userId,
          password: passwd,
          image: defaultImageURL,
          grade: "일반회원",
          giturl: "",
        }),
      });

      if (postRes.ok) {
        alert("회원가입 성공!");
        setName("");
        setUserId("");
        setPassword("");
        setIdCheckMsg("");
        setIsIdChecked(false);
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
              setIsIdChecked(false);
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
