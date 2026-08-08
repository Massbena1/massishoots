"use client";

import React from "react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { useTranslations } from "next-intl";

const TechGuys = () => (
  <span style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 500, color: "#fff", whiteSpace: "nowrap", fontFamily: "inherit" }}>
    TECHGAYS
  </span>
);

const EstaEvent = () => (
  <span style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 500, color: "#fff", whiteSpace: "nowrap", fontFamily: "inherit" }}>
    ESTA EVENT
  </span>
);

type LogoItem =
  | { id: string; type: "svg"; component: () => React.ReactElement; className: string }
  | { id: string; type: "img"; src: string; alt: string; className: string };

const logos: LogoItem[] = [
  { id: "techguys",     type: "svg", component: TechGuys,              className: "w-40" },
  { id: "omnigo",       type: "img", src: "/clients/omnigo.png",       alt: "Omnigo — Client Massishoots Montréal",            className: "w-28" },
  { id: "blackswan",    type: "img", src: "/clients/blackswan.svg",    alt: "Manoir Black Swan — Client Massishoots Montréal", className: "w-44" },
  { id: "tagekarting",  type: "img", src: "/clients/tage.png",         alt: "Tage Karting — Client Massishoots Montréal",      className: "w-28" },
  { id: "estaevent",    type: "svg", component: EstaEvent,              className: "w-32" },
  // duplicate pour le slider infini
  { id: "techguys2",    type: "svg", component: TechGuys,              className: "w-40" },
  { id: "omnigo2",      type: "img", src: "/clients/omnigo.png",       alt: "Omnigo — Client Massishoots Montréal",            className: "w-28" },
  { id: "blackswan2",   type: "img", src: "/clients/blackswan.svg",    alt: "Manoir Black Swan — Client Massishoots Montréal", className: "w-44" },
  { id: "tagekarting2", type: "img", src: "/clients/tage.png",         alt: "Tage Karting — Client Massishoots Montréal",      className: "w-28" },
  { id: "estaevent2",   type: "svg", component: EstaEvent,              className: "w-32" },
];

export default function Clients() {
  const t = useTranslations("clients");
  return (
    <div className="w-full overflow-hidden">

      {/* ── Header + slider ──────────────────────────────────────────────── */}
      <div style={{ margin: "0 auto", maxWidth: 700, textAlign: "center", padding: "80px 24px 36px" }}>
        <div className="font-bebas" style={{ fontSize: "clamp(22px, 3.5vw, 36px)", lineHeight: 1.2, letterSpacing: "0.02em" }}>
          <span style={{ color: "rgba(196,205,214,0.7)" }}>{t("heading1")}</span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.85)" }}>{t("heading2")}</span>
        </div>

        {/* Slider row — CSS marquee, zero JS */}
        <div style={{ position: "relative", marginTop: 36, height: 100, overflow: "hidden" }}>
          <div style={{ display: "flex", width: "max-content", animation: "marquee 30s linear infinite" }}>
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                style={{ opacity: 0.5, display: "flex", alignItems: "center", paddingInline: 24, height: 100, transition: "opacity 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
              >
                {logo.type === "svg" ? (
                  <logo.component />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo.src} alt={logo.alt} className="client-logo" style={{ filter: "brightness(0) invert(1)" }} />
                )}
              </div>
            ))}
          </div>
          <ProgressiveBlur className="pointer-events-none absolute top-0 left-0 h-full w-[180px]" direction="left" blurIntensity={1} />
          <ProgressiveBlur className="pointer-events-none absolute top-0 right-0 h-full w-[180px]" direction="right" blurIntensity={1} />
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      {/* ── Arc décoratif CSS pur ────────────────────────────────────────── */}
      <div style={{ position: "relative", marginTop: -80, height: 200, width: "100%", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at bottom center, rgba(196,205,214,0.08), transparent 70%)" }} />
        <div style={{ position: "absolute", left: "-50%", top: "60%", zIndex: 10, width: "200%", aspectRatio: "1 / 0.7", borderRadius: "100%", borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(7,9,13,0.85)" }} />
      </div>

    </div>
  );
}
