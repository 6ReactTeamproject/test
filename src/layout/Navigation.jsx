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
        {menuItems.map((item) => (
          <div
            key={item.path}
            style={{
              ...styles.navItem,
              backgroundColor:
                location.pathname === item.path ? "#f0f7ff" : "transparent",
              borderLeft:
                location.pathname === item.path ? "4px solid #4f46e5" : "none",
              padding: "12px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            onClick={() => nav(item.path)}
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
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
