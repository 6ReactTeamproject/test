import { styles } from "./Layout.styles";

const Footer = ({ style }) => {
  return (
    <footer style={{ ...styles.footer, ...style }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 10px 0", color: "#495057" }}>
              여행 커뮤니티
            </h3>
            <p style={{ margin: "0", color: "#6c757d" }}>
              함께 여행의 즐거움을 나누세요
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0 0 5px 0", color: "#6c757d" }}>
              문의: contact@example.com
            </p>
            <p style={{ margin: "0", color: "#6c757d" }}>
              © 2024 여행 커뮤니티. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
