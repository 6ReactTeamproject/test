import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "./Layout.styles";
import "../styles/header.css";

const Navigation = () => {
  const nav = useNavigate();
  const location = useLocation();

  // 네비게이션 메뉴 항목 정의
  const menuItems = [
    { path: "/intro", label: "여행 소개" },
    { path: "/team", label: "멤버 소개" },
    { path: "/post", label: "게시판" },
    { path: "/message", label: "쪽지함" },
  ];

  return (
    <nav
      style={{
        ...styles.nav,
        width: "200px", // 고정 너비 지정
        transition: "width 0.3s ease", // 너비 변화시 부드러운 애니메이션
      }}
    >
      <div
        style={{
          ...styles.navMenu,
          flexDirection: "column", // 메뉴 아이템 세로 정렬
          padding: "20px 0", // 위아래 여백
        }}
      >
        {menuItems.map((item) => {
          // "게시판" 메뉴는 쿼리 파라미터가 있더라도 활성화 상태로 표시
          const isActive =
            item.path === "/post"
              ? location.pathname === "/post"
              : location.pathname === item.path;

          return (
            <div
              key={item.path}
              className={`nav-item ${isActive ? "active" : ""}`} // 활성화시 "active" 클래스 추가
              onClick={() => {
                // "게시판" 메뉴 클릭 시 페이지 쿼리 포함 이동
                if (item.path === "/post") {
                  nav("/post?page=1");
                } else {
                  nav(item.path);
                }
              }}
            >
              <span className="nav-icon">
                {/* 경로에 따라 아이콘 출력 */}
                {item.path === "/intro" && "🏠"}
                {item.path === "/team" && "👥"}
                {item.path === "/post" && "📝"}
                {item.path === "/message" && "✉️"}
              </span>
              <span className="nav-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
