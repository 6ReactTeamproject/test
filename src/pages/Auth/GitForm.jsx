import React, { useState } from "react";
import { useUser } from "../../hooks/UserContext";

export default function GitForm() {
  const { user, setUser } = useUser();
  const [gitInput, setGitInput] = useState("");

  const handleGitUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giturl: gitInput }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setGitInput(""); // 입력 초기화
        alert("깃허브 주소가 저장되었습니다.");
      } else {
        alert("저장 실패");
      }
    } catch (error) {
      console.error("에러:", error);
      alert("오류 발생");
    }
  };

  return (
    <>
      <p>
        깃허브 주소 :
        {user.giturl ? (
          <a
            href={user.giturl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ffffff" }}
          >
            {user.giturl}
          </a>
        ) : (
          <span style={{ color: "gray" }}> 주소를 입력해 주세요 </span>
        )}
      </p>

      <div className="giturl-form" style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={gitInput}
          onChange={(e) => setGitInput(e.target.value)}
          placeholder="https://github.com/your-id"
          style={{ marginRight: "8px", padding: "4px" }}
        />
        <button onClick={handleGitUpdate}>저장</button>
      </div>
    </>
  );
}
