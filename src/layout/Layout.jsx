import { UserSection } from "../components/Travel/UserSection";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../components/common/DropDownMenu";

const Layout = ({ children }) => {
  const nav = useNavigate();
  return (
    <div>
      <header
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ cursor: "pointer", fontWeight: "bold", fontSize: "20px" }}
          onClick={() => nav("/")}
        >
          로고예시
        </div>
        <div>
          <UserSection />
        </div>
      </header>

      <nav
        style={{
          backgroundColor: "#e9ecef",
          padding: "10px",
          display: "flex",
        }}
      >
        <div style={{ marginLeft: "auto" }}>
          <DropdownMenu
            trigger={<p>메뉴</p>}
            options={[
              { label: "여행 소개", onClick: () => nav("/intro") },
              { label: "멤버 소개", onClick: () => nav("/team") },
              { label: "게시판", onClick: () => nav("/post") },
            ]}
          />
        </div>
      </nav>

      <main style={{ padding: "20px" }}>{children}</main>

      <footer
        style={{
          backgroundColor: "#dee2e6",
          padding: "10px",
          marginTop: "30px",
        }}
      >
        푸터
      </footer>
    </div>
  );
};

export default Layout;
