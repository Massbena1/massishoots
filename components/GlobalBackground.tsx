"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useState, useEffect } from "react";

export default function GlobalBackground() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const read = () =>
      setIsLight(document.documentElement.getAttribute("data-theme") === "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100vw", height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
    }}>

      {/* ── Dark : #0a0a0a + #16161a ── */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: isLight ? 0 : 1,
        transition: "opacity 0.7s ease",
      }}>
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#0a0a0a", "#16161a", "#0f0f12", "#0a0a0a", "#16161a"]}
          speed={0.18}
        />
      </div>

      {/* ── Light : ivoire chaud ── */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: isLight ? 1 : 0,
        transition: "opacity 0.7s ease",
      }}>
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#f2f0ec", "#e8e4de", "#ede9e4", "#f5f2ee", "#e0dcd5"]}
          speed={0.18}
        />
      </div>

    </div>
  );
}
