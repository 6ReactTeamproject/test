import { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/travel.css";

export function UserSection() {
  const { user, setUser } = useUser();
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setPreview(parsedUser.image || "");
    }
    setIsLoading(false);
  }, [setUser]);

  useEffect(() => {
    if (user?.image) {
      setPreview(user.image);
    }
  }, [user?.image]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    nav("/login");
  };

  if (isLoading) return <p>로딩 중...</p>;

  return (
  <div>
    {user && <img src={preview} alt="프로필" className="profile-img" />}
    <p>{user ? `${user.name}님 환영합니다!` : "Guest님 환영합니다!"}</p>
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
