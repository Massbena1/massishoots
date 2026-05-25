"use client";
import { useEffect, useRef } from "react";

const CALENDLY_URL = "https://calendly.com/massishot-ca/consultation-gratuite";

export function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // Load Calendly widget script once
    const existing = document.getElementById("calendly-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "relative",
      }}
    >
      {/* Calendly inline widget */}
      <div
        ref={containerRef}
        className="calendly-inline-widget"
        data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=c4cdd6`}
        style={{ minWidth: 280, height: 700 }}
      />
    </div>
  );
}
