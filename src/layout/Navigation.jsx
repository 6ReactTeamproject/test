import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { styles } from "./Layout.styles";

const Navigation = ({ onExpand }) => {
  const nav = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { path: "/intro", label: "여행 소개" },
    { path: "/team", label: "멤버 소개" },
    { path: "/post", label: "게시판" },
  ];

  return (
    <nav
      style={{
        ...styles.nav,
        width: isExpanded ? "200px" : "60px",
        transition: "width 0.3s ease",
      }}
      onMouseEnter={() => {
        setIsExpanded(true);
        onExpand(true);
      }}
      onMouseLeave={() => {
        setIsExpanded(false);
        onExpand(false);
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
            </span>
            <span
              style={{
                marginLeft: "12px",
                opacity: isExpanded ? 1 : 0,
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
