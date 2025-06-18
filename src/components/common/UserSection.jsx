import { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

import "../../styles/travel.css";

export function UserSection() {
  const { user, setUser } = useUser();
  const [preview, setPreview] = useState(user?.image || "");
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [setUser]);

  useEffect(() => {
    if (user?.image) {
      setPreview(user.image);
    }
  }, [user?.image]);

  if (isLoading || !user) return <p>로딩 중...</p>;

  return (
    <>
      <img src={preview} alt="프로필" className="profile-img" />
      <div className="user-section">
        <p>{user.name}님 환영합니다!</p>
        {location.pathname !== "/mypage" && (
          <button onClick={() => nav("/mypage")}>마이페이지</button>
        )}
        <button onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}>로그아웃</button>
      </div>
    </>
  );
}
