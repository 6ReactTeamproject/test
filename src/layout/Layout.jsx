import { UserSection } from "../components/Travel/UserSection";

const Layout = ({ children }) => {
  return (
    <div>
      <header
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <UserSection />
        </div>
      </header>

      <nav style={{ backgroundColor: "#e9ecef", padding: "10px" }}>
        내비게이션
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
