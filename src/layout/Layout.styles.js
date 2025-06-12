export const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#f8f9fa",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
    backgroundColor: "#e9ecef",
    padding: "10px",
    display: "flex",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  navMenu: {
    marginLeft: "auto",
  },
  main: {
    flex: 1,
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  footer: {
    backgroundColor: "#dee2e6",
    padding: "20px",
    marginTop: "auto",
    textAlign: "center",
    color: "#495057",
  },
};
