import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { styles } from "./Layout.styles";

const Layout = ({ children }) => {
  // 항상 펼친 상태로 고정
  const isNavExpanded = true;

  return (
    <div style={styles.layout}>
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
      >
        {children}
      </main>
      <Footer
        style={{
          ...styles.footer,
          ...(isNavExpanded ? styles.footerExpanded : {}),
        }}
      />
    </div>
  );
};

export default Layout;
