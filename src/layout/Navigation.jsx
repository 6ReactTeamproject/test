import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "./Layout.styles";

const Navigation = () => {
  const nav = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/intro", label: "여행 소개" },
    { path: "/team", label: "멤버 소개" },
    { path: "/post", label: "게시판" },
    { path: "/message", label: "쪽지함" },
  ];

  const handleMenuClick = (path) => {
    // 게시판인 경우 페이지 정보를 포함해서 이동
    if (path === "/post") {
      nav("/post?page=1");
    } else {
      nav(path);
    }
  };

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
              style={{
                ...styles.navItem,
                backgroundColor: isActive ? "#f0f7ff" : "transparent",
                borderLeft: isActive ? "4px solid #4f46e5" : "none",
                padding: "12px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onClick={() => handleMenuClick(item.path)}
            >
              <span style={{ minWidth: "24px", textAlign: "center" }}>
                {item.path === "/intro" && "🏠"}
                {item.path === "/team" && "👥"}
                {item.path === "/post" && "📝"}
                {item.path === "/message" && "✉️"}
              </span>
              <span
                style={{
                  marginLeft: "12px",
                  opacity: 1,
                  transition: "opacity 0.2s",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
