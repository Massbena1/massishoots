"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export default function GlobalBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#0a0a0a", "#16161a", "#0a0a0a", "#111116", "#16161a"]}
        speed={0.18}
      />
    </div>
  );
}
