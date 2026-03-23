function Banner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)",
        color: "#ffffff",
        padding: "40px 32px",
        borderRadius: "12px",
        marginBottom: "32px",
        boxShadow: "0 4px 16px rgba(13, 110, 253, 0.3)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "2.4rem", fontWeight: 700, letterSpacing: "-0.5px" }}>
        The Library
      </h1>
      <p style={{ margin: "8px 0 0", fontSize: "1rem", opacity: 0.85 }}>
        Browse, discover, and build your reading list
      </p>
    </div>
  );
}

export default Banner;
