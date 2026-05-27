import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Massishoots — Photographe & Vidéaste Montréal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gradient orb */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,205,214,0.12) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
            padding: "8px 20px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, letterSpacing: "0.1em" }}>
            ✦ MONTRÉAL · PHOTO & VIDÉO
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          MASSISHOOTS
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Photographe & Vidéaste Premium
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.06em",
          }}
        >
          massishoots.com
        </div>
      </div>
    ),
    { ...size }
  );
}
