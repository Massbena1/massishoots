export default function TestInstagramPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <h1>🧪 Test Page Instagram Analysis</h1>
      <p>Cette page de test se charge-t-elle ?</p>
      <div style={{
        background: "rgba(255,255,255,0.1)",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "20px"
      }}>
        <h2>✅ Diagnostics :</h2>
        <ul>
          <li>✅ Page simple sans composant complexe</li>
          <li>✅ Pas de hooks React problématiques</li>
          <li>✅ Pas d'import externe</li>
          <li>✅ JSX basique uniquement</li>
        </ul>
      </div>

      <div style={{ marginTop: "20px" }}>
        <a
          href="/api/debug-env"
          style={{
            color: "#C9A84C",
            textDecoration: "none",
            padding: "10px 20px",
            border: "1px solid #C9A84C",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          🔍 Test API Variables
        </a>
      </div>

      <div style={{
        marginTop: "20px",
        fontSize: "12px",
        color: "rgba(255,255,255,0.6)"
      }}>
        Si cette page se charge, le problème est dans AnalyseInstagram.tsx
      </div>
    </div>
  );
}