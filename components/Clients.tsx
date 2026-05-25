"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Sparkles } from "@/components/ui/sparkles";
import { useTranslations } from "next-intl";

// ─── Client wordmarks as SVG text (style proche du modèle) ──────────────────

const Palma = () => (
  <svg viewBox="0 0 160 48" fill="currentColor" className="w-full">
    <text x="8" y="34" fontFamily="Georgia, serif" fontSize="26" letterSpacing="4" fontWeight="400">PALMA</text>
  </svg>
);

const StudioNoir = () => (
  <svg viewBox="0 0 200 48" fill="currentColor" className="w-full">
    <text x="8" y="34" fontFamily="Georgia, serif" fontSize="20" letterSpacing="6" fontWeight="300">STUDIO NOIR</text>
  </svg>
);

const ModeFlux = () => (
  <svg viewBox="0 0 200 48" fill="currentColor" className="w-full">
    <text x="8" y="34" fontFamily="Arial, sans-serif" fontSize="22" letterSpacing="5" fontWeight="700">MODEFLUX</text>
  </svg>
);

const LuxeVie = () => (
  <svg viewBox="0 0 160 48" fill="currentColor" className="w-full">
    <text x="8" y="36" fontFamily="Georgia, serif" fontSize="28" letterSpacing="3" fontStyle="italic">LuxeVie</text>
  </svg>
);

const Atelier = () => (
  <svg viewBox="0 0 220 48" fill="currentColor" className="w-full">
    <text x="8" y="34" fontFamily="Georgia, serif" fontSize="19" letterSpacing="5" fontWeight="300">ATELIER LUMIÈRE</text>
  </svg>
);

const Apex = () => (
  <svg viewBox="0 0 130 48" fill="currentColor" className="w-full">
    <text x="8" y="36" fontFamily="Arial, sans-serif" fontSize="30" letterSpacing="4" fontWeight="900">APEX</text>
  </svg>
);

const Nomad = () => (
  <svg viewBox="0 0 200 48" fill="currentColor" className="w-full">
    <text x="8" y="34" fontFamily="Arial, sans-serif" fontSize="20" letterSpacing="6" fontWeight="400">NOMAD CO.</text>
  </svg>
);

const Revlr = () => (
  <svg viewBox="0 0 140 48" fill="currentColor" className="w-full">
    <text x="8" y="36" fontFamily="Arial, sans-serif" fontSize="28" letterSpacing="3" fontWeight="800">RÉVLR</text>
  </svg>
);

const logos = [
  { id: "palma",    component: Palma,     className: "w-28" },
  { id: "studio",   component: StudioNoir, className: "w-36" },
  { id: "modeflux", component: ModeFlux,  className: "w-36" },
  { id: "luxevie",  component: LuxeVie,   className: "w-28" },
  { id: "atelier",  component: Atelier,   className: "w-44" },
  { id: "apex",     component: Apex,      className: "w-24" },
  { id: "nomad",    component: Nomad,     className: "w-36" },
  { id: "revlr",    component: Revlr,     className: "w-28" },
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

        {/* Slider row */}
        <div style={{ position: "relative", marginTop: 36, height: 100 }}>
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={30}
            gap={48}
          >
            {logos.map(({ id, component: Logo, className }) => (
              <div key={id} className={className} style={{ opacity: 0.55, color: "#fff" }}>
                <Logo />
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[180px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[180px]"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </div>

      {/* ── Sparkles arc (fidèle au modèle) ─────────────────────────────── */}
      <div
        style={{
          position: "relative",
          marginTop: -80,
          height: 380,
          width: "100%",
          overflow: "hidden",
          WebkitMaskImage: "radial-gradient(50% 50%, white, transparent)",
          maskImage: "radial-gradient(50% 50%, white, transparent)",
        }}
      >
        {/* Radial gradient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at bottom center, rgba(196,205,214,0.12), transparent 70%)",
            opacity: 0.6,
          }} />
        </div>

        {/* Curved "stage" border — exactly like the demo */}
        <div
          style={{
            position: "absolute",
            left: "-50%",
            top: "50%",
            zIndex: 10,
            width: "200%",
            aspectRatio: "1 / 0.7",
            borderRadius: "100%",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(7,9,13,0.85)",
          }}
        />

        {/* Sparkles */}
        <div
          className="absolute inset-x-0 bottom-0 h-full w-full"
          style={{
            WebkitMaskImage: "radial-gradient(50% 50%, white, transparent 85%)",
            maskImage: "radial-gradient(50% 50%, white, transparent 85%)",
          }}
        >
          <Sparkles
            density={1200}
            size={0.9}
            speed={0.8}
            opacity={0.6}
            color="#c4cdd6"
            className="h-full w-full"
          />
        </div>
      </div>

    </div>
  );
}
