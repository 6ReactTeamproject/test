import React, { useState } from "react";
import { useUser } from "../../hooks/UserContext";

export default function GitForm() {
  const { user, setUser } = useUser();
  const [gitInput, setGitInput] = useState("");
  const [isValid, setIsValid] = useState(true);

  // 영어와 숫자만 허용 (대소문자 + 숫자 + 하이픈 + 언더스코어는 허용할 수 있음)
  const gitIdRegex = /^[a-zA-Z0-9-_]*$/;

  const handleGitUpdate = async () => {
    const trimmedInput = gitInput.trim();

    if (!trimmedInput) {
      alert("깃허브 주소를 입력해주세요.");
      return;
    }

    // 유효성 검사
    if (!gitIdRegex.test(trimmedInput.replace("https://github.com/", ""))) {
      alert("깃허브 ID는 영문자와 숫자, -, _만 사용할 수 있습니다.");
      return;
    }

    let finalUrl = trimmedInput;
    if (!trimmedInput.startsWith("https://github.com/")) {
      finalUrl = "https://github.com/" + trimmedInput.replace(/^\/+/, '');
    }

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giturl: finalUrl }),
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

  const handleChange = (e) => {
    const input = e.target.value;
    setGitInput(input);

    // https://github.com/ 는 제외하고 검사
    const idPart = input.replace("https://github.com/", "");
    setIsValid(gitIdRegex.test(idPart));
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
          onChange={handleChange}
          placeholder="https://github.com/ 생략 가능"
          style={{ marginRight: "8px", padding: "4px" }}
        />
        <button onClick={handleGitUpdate}>저장</button>
      </div>
    </>
  );
}
