import { styles } from "./Layout.styles";
import "../styles/layout.css";

const Footer = ({ style }) => {
  return (
    <footer style={{ ...styles.footer, ...style }} className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-info">
            <h3 className="footer-title">여행 커뮤니티</h3>
            <p className="footer-description">
              여행 정보를 공유하고 소통하는 커뮤니티입니다.
            </p>
          </div>
          <div className="footer-contact">
            <p className="footer-contact-title">연락처</p>
            <p className="footer-contact-info">
              이메일: contact@travelcommunity.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
