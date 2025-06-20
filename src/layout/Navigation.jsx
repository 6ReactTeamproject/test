import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "./Layout.styles";
import "../styles/header.css";

const Navigation = () => {
  const nav = useNavigate();
  const location = useLocation();

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
        width: "200px",
        transition: "width 0.3s ease",
      }}
    >
      <div
        style={{
          ...styles.navMenu,
          flexDirection: "column",
          padding: "20px 0",
        }}
      >
        {menuItems.map((item) => {
          // 게시판의 경우 쿼리 파라미터가 있어도 활성 상태로 표시
          const isActive =
            item.path === "/post"
              ? location.pathname === "/post"
              : location.pathname === item.path;

          return (
            <div
              key={item.path}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => {
                // 게시판인 경우 페이지 정보를 포함해서 이동
                if (item.path === "/post") {
                  nav("/post?page=1");
                } else {
                  nav(item.path);
                }
              }}
            >
              <span className="nav-icon">
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
