export default function App() {
  return (
    <div style={{ 
      padding: "2rem", 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      fontFamily: "system-ui"
    }}>
      <h1>LiqUIdify Landing Page</h1>
      <p>If you can see this, React is working!</p>
      <button style={{
        padding: "12px 24px",
        background: "rgba(255,255,255,0.2)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "8px",
        color: "white",
        cursor: "pointer"
      }}>
        Test Button
      </button>
    </div>
  );
}
