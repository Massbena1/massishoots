"use client";
import { useState } from "react";

const items = [
  "PERSONAL BRANDING", "✦", "CORPORATE B2B", "✦",
  "EVENTS & WEDDINGS", "✦", "MONTRÉAL", "✦",
  "PHOTOGRAPHY", "✦", "VIDEOGRAPHY", "✦",
  "SONY A7 III", "✦", "DJI MINI 5 PRO", "✦",
];

const doubled = [...items, ...items];

export default function Ticker() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        overflow: "hidden",
        padding: "16px 0",
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        cursor: "none",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        pointerEvents: "none",
      }} />
      <div
        className="animate-marquee"
        style={{
          display: "flex",
          width: "max-content",
          animationPlayState: paused ? "paused" : "running",
          transition: "opacity 0.3s",
          opacity: paused ? 0.7 : 1,
        }}
      >
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
              transition: "color 0.3s",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
