import { styles } from "./Layout.styles";
import { useRouteHistory } from "../hooks/useRouteHistory";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => {
  useRouteHistory();

  return (
    <div style={styles.container}>
      <Header />
      <Navigation />
      <main style={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
