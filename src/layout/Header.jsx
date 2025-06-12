import { useNavigate } from "react-router-dom";
import { UserSection } from "../components/common/UserSection";
import { styles } from "./Layout.styles";

const Header = () => {
  const nav = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.logo} onClick={() => nav("/")}>
        로고예시
      </div>
      <div>
        <UserSection />
      </div>
    </header>
  );
};

export default Header;
