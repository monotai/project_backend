export default function Post() {
  const postStyle = {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "400px"
  };

  const firstPStyle = {
    fontWeight: "bold",
    marginBottom: "10px"
  };

  const imgStyle = {
    width: "100%",
    borderRadius: "6px",
    margin: "15px 0"
  };

  const buttonStyle = {
    background: "#1877f2",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background 0.2s"
  };

  return (
    <div style={postStyle}>
      <p style={firstPStyle}>Vat</p>
      <p>
        Lorem ipsum dolor sit amet, consectorum.
      </p>
      <img style={imgStyle} src="https://picsum.photos/200/200" alt="Random" />
      <button style={buttonStyle}>like</button>
    </div>
  );
}
