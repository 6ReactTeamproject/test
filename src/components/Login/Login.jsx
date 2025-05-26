import { useState } from "react";

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch(`http://localhost:3001/users?loginId=${loginId}&password=${password}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          alert(`${data[0].name}님 환영합니다!`);
          localStorage.setItem("user", JSON.stringify(data[0]));
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

export default Login;