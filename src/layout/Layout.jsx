import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <Navigation />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
