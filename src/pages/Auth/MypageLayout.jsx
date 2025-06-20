import MypageSidebar from "./MypageSidebar";
import "./Mypage.css"

export default function MypageLayout({ children }) {
  return (
    <div className="mypage-container">
      <MypageSidebar />
      <div className="mypage-main">
        {children}
      </div>
    </div>
  );
}
