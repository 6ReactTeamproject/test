import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { styles } from "./Layout.styles";

const Layout = ({ children }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div style={styles.layout}>
      <Header
        style={{
          ...styles.header,
          ...(isNavExpanded ? styles.headerExpanded : {}),
        }}
      />
      <Navigation onExpand={(expanded) => setIsNavExpanded(expanded)} />
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
