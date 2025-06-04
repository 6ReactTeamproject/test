import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useUser } from "../Travel/UserContext";
import "./Login.css";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // context에서 setUser 가져옴

  const handleLogin = () => {
    fetch(`http://localhost:3001/users?loginId=${loginId}&password=${password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const user = data[0];
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user); // context로 업데이트
          // 세션에 저장된 마지막 비인증 페이지 경로 가져오기
          const lastPublic = sessionStorage.getItem("lastPublicPath") || "/";
          // 만약 lastPublic이 로그인 또는 회원가입 페이지라면 기본값을 "/"
          const target =
            lastPublic === "/login" || lastPublic === "/signup"
              ? "/"
              : lastPublic;
          navigate(target);
        } else {
          alert("로그인 실패");
        }
      });
  };

  return (
    <div className="login-page">
      <button onClick={() => navigate("/")} className="back-button">
        🏠 홈으로
      </button>
      <div className="login-box">
        <input
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="아이디"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button onClick={handleLogin}>로그인</button>
      </div>
      <button className="signup-button" onClick={() => navigate("/signup")}>
        회원가입
      </button>
    </div>
  );
}
