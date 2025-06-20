import { Link } from "react-router-dom";
import { UserSection } from "../components/common/UserSection";
import "../styles/header.css";

const Header = ({ style }) => {
  return (
    <header style={style} className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1 className="header-title">여행 커뮤니티</h1>
        </Link>
        <UserSection />
      </div>
    </header>
  );
};

export default Header;
