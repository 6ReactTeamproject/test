import { useNavigate, useLocation } from "react-router-dom";
import "../styles/navigation.css";

const Navigation = () => {
  const nav = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "카페홈" },
    { path: "/intro", label: "현지학기제 소개" },
    { path: "/team", label: "멤버 소개" },
    { path: "/post", label: "게시판" },
    { path: "/message", label: "쪽지함" },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => {
          const isActive =
            item.path === "/post"
              ? location.pathname.startsWith("/post")
              : location.pathname === item.path;

          return (
            <div
              key={item.path}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={() => nav(item.path)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
