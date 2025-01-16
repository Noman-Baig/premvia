const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        position: "absolute",
        bottom: "-120px",
        left: "0px",
        right: "0px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1a1a1a",
        color: "#f0f0f0",
        fontSize: "14px",
        flexWrap: "wrap",
        gap: "10px",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ display: "flex" }}>
        PREMVIA © {new Date().getFullYear()}&nbsp;
        <div>All rights reserved.</div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <a
          href="https://facebook.com/premvia"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#f0f0f0", textDecoration: "none" }}
        >
          <i
            style={{ fontSize: "25px" }}
            className="fab fa-facebook"
            aria-hidden="true"
          ></i>
        </a>
        <a
          href="https://instagram.com/premvia"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#f0f0f0", textDecoration: "none" }}
        >
          <i
            style={{ fontSize: "25px" }}
            className="fab fa-instagram"
            aria-hidden="true"
          ></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
