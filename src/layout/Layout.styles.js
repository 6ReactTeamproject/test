export const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  mainContent: {
    flex: 1,
    marginLeft: "60px",
    padding: "20px",
    transition: "margin-left 0.3s ease",
  },
  mainContentExpanded: {
    marginLeft: "200px",
  },
  header: {
    backgroundColor: "#f8f9fa",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "fixed",
    top: 0,
    left: "60px",
    right: 0,
    zIndex: 999,
    transition: "left 0.3s ease",
  },
  headerExpanded: {
    left: "200px",
  },
  logo: {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#333",
    textDecoration: "none",
    ":hover": {
      color: "#007bff",
    },
  },
  nav: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    backgroundColor: "white",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  navMenu: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "60px",
  },
  navItem: {
    transition: "background-color 0.2s",
  },
  footer: {
    backgroundColor: "#dee2e6",
    padding: "20px",
    marginTop: "auto",
    textAlign: "center",
    color: "#495057",
    marginLeft: "60px",
    transition: "margin-left 0.3s ease",
  },
  footerExpanded: {
    marginLeft: "200px",
  },
};
