import { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/travel.css";

export function UserSection() {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const location = useLocation();

  // localStorage로부터 초기 로딩 완료 여부 판단
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div className="user-section" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <p>{user?.name ?? "Guest"}님 환영합니다!</p>
      {user ? (
        <>
          {location.pathname !== "/mypage" && (
            <button onClick={() => nav("/mypage")}>마이페이지</button>
          )}
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <button onClick={() => nav("/login")}>로그인</button>
          <button onClick={() => nav("/signup")}>회원가입</button>
        </>
      )}
    </div>
  );
}
