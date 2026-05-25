"use client";

const row1 = [
  "Restaurant Palma",
  "Studio Noir",
  "Atelier Lumière",
  "Conférence MTL",
  "ModeFlux Agency",
  "Gala Prestige 2024",
  "Brand & Co",
  "InnovateMTL",
  "LuxeVie",
];

const row2 = [
  "Entrepreneurs MTL",
  "RÉVLR Studio",
  "Mariage Côté",
  "Palais des Congrès",
  "Lifestyle by K",
  "Studio Forma",
  "APEX Brand",
  "The Wedding Co",
  "Nomad Creative",
];

function MarqueeRow({
  names,
  direction,
}: {
  names: string[];
  direction: "left" | "right";
}) {
  const doubled = [...names, ...names];
  const animationName =
    direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div
      style={{
        display: "flex",
        width: "200%",
        animation: `${animationName} 30s linear infinite`,
        willChange: "transform",
      }}
    >
      {doubled.map((name, i) => (
        <span
          key={i}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0 24px",
            whiteSpace: "nowrap",
          }}
        >
          <span
            className="font-bebas"
            style={{
              fontSize: 15,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.18)",
              textTransform: "uppercase",
            }}
          >
            {name}
          </span>
          <span
            style={{
              marginLeft: 24,
              color: "rgba(255,255,255,0.1)",
              fontSize: 15,
              lineHeight: 1,
            }}
          >
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Clients() {
  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Top separator line */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      <section style={{ padding: "48px 0", overflow: "hidden" }}>
        {/* Label */}
        <p
          className="font-dm"
          style={{
            textAlign: "center",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginBottom: 20,
          }}
        >
          Ils nous font confiance
        </p>

        {/* Marquee container with fade-edge mask */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%)",
          }}
        >
          {/* Row 1 — scrolls left */}
          <div style={{ overflow: "hidden", marginBottom: 10 }}>
            <MarqueeRow names={row1} direction="left" />
          </div>

          {/* Row 2 — scrolls right */}
          <div style={{ overflow: "hidden" }}>
            <MarqueeRow names={row2} direction="right" />
          </div>
        </div>
      </section>
    </>
  );
}
