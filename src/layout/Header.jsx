import { Link } from "react-router-dom";
import { UserSection } from "../components/common/UserSection";

const Header = ({ style }) => {
  return (
    <header style={style}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          minWidth: 0,
          gap: "20px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            whiteSpace: "nowrap",
            display: "block",
            minWidth: "120px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1.5rem",
              color: "#333",
              fontWeight: 700,
              lineHeight: "1",
            }}
          >
            여행 커뮤니티
          </h1>
        </Link>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <UserSection />
      </div>
    </header>
  );
};

export default Header;
