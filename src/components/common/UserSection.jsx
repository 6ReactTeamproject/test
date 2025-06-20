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
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {user && (
        <img
          src={preview}
          alt="프로필"
          style={{
            width: "32px",
            height: "32px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "2px solid #e5e7eb",
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
          {user ? `${user.name}님 환영합니다!` : "Guest님 환영합니다!"}
        </span>
        {user ? (
          <>
            {location.pathname !== "/mypage" && (
              <button
                onClick={() => nav("/mypage")}
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  backgroundColor: "#f9fafb",
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                마이페이지
              </button>
            )}
            <button
              onClick={handleLogout}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                backgroundColor: "#f9fafb",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => nav("/login")}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                backgroundColor: "#f9fafb",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              로그인
            </button>
            <button
              onClick={() => nav("/signup")}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                backgroundColor: "#f9fafb",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}
