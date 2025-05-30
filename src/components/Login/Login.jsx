import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Travel/UserContext";

export default function Login({ setUser }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch(`http://localhost:3001/users?loginId=${loginId}&password=${password}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const user = data[0];
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user); // Context 업데이트
          navigate("/");
        } else {
          alert("로그인 실패");
        }
      });
  };

  return (
    <div>
      <h2>로그인</h2>
      <input value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="아이디" />
      <br />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" type="password" />
      <br />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
