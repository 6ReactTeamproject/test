import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { styles } from "./Layout.styles";
import "../styles/layout.css";

const Layout = ({ children }) => {
  // 항상 펼친 상태로 고정
  const isNavExpanded = true;

  return (
    <div style={styles.layout} className="layout-container">
      <Header
        style={{
          ...styles.header,
          ...(isNavExpanded ? styles.headerExpanded : {}),
        }}
      />
      <Navigation onExpand={() => {}} /> {/* onExpand는 더 이상 필요 없음 */}
      <main
        style={{
          ...styles.mainContent,
          ...(isNavExpanded ? styles.mainContentExpanded : {}),
          marginTop: "60px",
        }}
        className={`main-content ${
          isNavExpanded ? "main-content-expanded" : ""
        }`}
      >
        {children}
      </main>
      <Footer
        style={{
          ...styles.footer,
          ...(isNavExpanded ? styles.footerExpanded : {}),
        }}
        className={`footer-container ${
          isNavExpanded ? "footer-container-expanded" : ""
        }`}
      />
    </div>
  );
};

export default Layout;
