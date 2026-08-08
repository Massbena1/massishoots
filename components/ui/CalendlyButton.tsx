"use client";
import { Calendar } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/massishot-ca/consultation-gratuite";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

function loadCalendly(): Promise<void> {
  return new Promise((resolve) => {
    if (window.Calendly) { resolve(); return; }
    if (!document.querySelector('link[href*="calendly.com"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById("calendly-script")) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
}

export default function CalendlyButton() {
  const open = async () => {
    await loadCalendly();
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
  };

  return (
    <button
      type="button"
      onClick={open}
      className="font-dm"
      style={{
        width: "100%",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        padding: "18px 24px",
        background: "rgba(196,205,214,0.07)",
        border: "1px solid rgba(196,205,214,0.2)",
        borderRadius: 16,
        color: "#fff",
        fontSize: 14, fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
        letterSpacing: "0.03em",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(196,205,214,0.12)";
        e.currentTarget.style.borderColor = "rgba(196,205,214,0.35)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(196,205,214,0.07)";
        e.currentTarget.style.borderColor = "rgba(196,205,214,0.2)";
      }}
    >
      <Calendar size={18} color="#c4cdd6" />
      <div style={{ textAlign: "left" }}>
        <div>Réserver un appel gratuit — disponibilités en temps réel</div>
        <div className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 400, marginTop: 2 }}>
          Consultation 30 min · Sans engagement · Calendly
        </div>
      </div>
    </button>
  );
}
