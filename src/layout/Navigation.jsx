import { useNavigate } from "react-router-dom";
import DropdownMenu from "../components/common/DropdownMenu";
import { styles } from "./Layout.styles";

const Navigation = () => {
  const nav = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.navMenu}>
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
  );
};

export default Navigation;
