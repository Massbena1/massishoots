const items = [
  "PERSONAL BRANDING", "✦", "CORPORATE B2B", "✦",
  "EVENTS & WEDDINGS", "✦", "MONTRÉAL", "✦",
  "PHOTOGRAPHY", "✦", "VIDEOGRAPHY", "✦",
  "SONY A7 III", "✦", "DJI MINI 5 PRO", "✦",
];

const doubled = [...items, ...items];

export default function Ticker() {
  return (
    <div style={{
      overflow: "hidden",
      padding: "16px 0",
      background: "rgba(255,255,255,0.025)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      position: "relative",
    }}>
      {/* Top highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        pointerEvents: "none",
      }} />
      <div className="animate-marquee" style={{ display: "flex", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-bebas"
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              padding: "0 24px",
              color: item === "✦" ? "#00e5ff" : "rgba(255,255,255,0.28)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
