import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useUser } from "../Travel/UserContext";
import "./Login.css";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = () => {
    fetch(`http://localhost:3001/users?loginId=${loginId}&password=${password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const user = data[0];
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user); 
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
