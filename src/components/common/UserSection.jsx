import { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/travel.css";
import "../../styles/header.css";

export function UserSection() {
  const { user, setUser } = useUser();
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const location = useLocation();

  // 컴포넌트 최초 렌더링 시 localStorage에서 유저 정보 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);            // 전역 상태
      setPreview(parsedUser.image || "");  // 프로필 이미지
    }
    setIsLoading(false);              // 로딩 완료 표시
  }, [setUser]);

  // 유저 이미지가 변경될 때마다 preview 상태 업데이트
  useEffect(() => {
    if (user?.image) {
      setPreview(user.image);
    }
  }, [user?.image]);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    nav("/login");
  };

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div className="user-section-container">
      {/* 로그인된 사용자 프로필 이미지 */}
      {user && (
        <img src={preview} alt="프로필" className="user-profile-image" />
      )}
      <div className="user-info-container">
        {/* 로그인 환영 문구 */}
        <span className="user-welcome-text">
          {user ? `${user.name}님 환영합니다!` : "Guest님 환영합니다!"}
        </span>

        {/* 로그인 상태에 따른 버튼 UI */}
        {user ? (
          <>
            {/* 현재 경로가 /mypage가 아니면 마이페이지 버튼 노출 */}
            {location.pathname !== "/mypage" && (
              <button onClick={() => nav("/mypage")} className="user-button">
                마이페이지
              </button>
            )}
            {/* 로그아웃 버튼 */}
            <button onClick={handleLogout} className="user-button">
              로그아웃
            </button>
          </>
        ) : (
          <>
            {/* 비로그인 상태일 때 로그인, 회원가입 버튼 */}
            <button onClick={() => nav("/login")} className="user-button">
              로그인
            </button>
            <button onClick={() => nav("/signup")} className="user-button">
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}
