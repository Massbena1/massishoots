"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Sparkles } from "@/components/ui/sparkles";
import { useTranslations } from "next-intl";

const TechGuys = () => (
  <svg viewBox="0 0 220 52" fill="currentColor" className="w-full">
    <text x="8" y="32" fontFamily="Arial, sans-serif" fontSize="20" letterSpacing="4" fontWeight="700">TECHGUYS</text>
    <text x="8" y="48" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="5" fontWeight="300">CONSULTING</text>
  </svg>
);

const EstaEvent = () => (
  <svg viewBox="0 0 200 52" fill="currentColor" className="w-full">
    <text x="8" y="32" fontFamily="Georgia, serif" fontSize="24" letterSpacing="4" fontWeight="400">ESTA</text>
    <text x="8" y="48" fontFamily="Georgia, serif" fontSize="13" letterSpacing="6" fontWeight="300">EVENT</text>
  </svg>
);

type LogoItem =
  | { id: string; type: "svg"; component: () => JSX.Element; className: string }
  | { id: string; type: "img"; src: string; alt: string; className: string };

const logos: LogoItem[] = [
  { id: "techguys",     type: "svg", component: TechGuys,              className: "w-40" },
  { id: "omnigo",       type: "img", src: "/clients/omnigo.png",       alt: "Omnigo",            className: "w-28" },
  { id: "blackswan",    type: "img", src: "/clients/blackswan.svg",    alt: "Manoir Black Swan", className: "w-44" },
  { id: "tagekarting",  type: "img", src: "/clients/tage.png",         alt: "Tage Karting",      className: "w-28" },
  { id: "estaevent",    type: "svg", component: EstaEvent,              className: "w-32" },
  // duplicate pour le slider infini
  { id: "techguys2",    type: "svg", component: TechGuys,              className: "w-40" },
  { id: "omnigo2",      type: "img", src: "/clients/omnigo.png",       alt: "Omnigo",            className: "w-28" },
  { id: "blackswan2",   type: "img", src: "/clients/blackswan.svg",    alt: "Manoir Black Swan", className: "w-44" },
  { id: "tagekarting2", type: "img", src: "/clients/tage.png",         alt: "Tage Karting",      className: "w-28" },
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

        {/* Slider row */}
        <div style={{ position: "relative", marginTop: 36, height: 100 }}>
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={30}
            gap={48}
          >
            {logos.map((logo) => (
              <div key={logo.id} className={logo.className} style={{ opacity: 0.55, color: "#fff", display: "flex", alignItems: "center" }}>
                {logo.type === "svg" ? (
                  <logo.component />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo.src} alt={logo.alt} style={{ width: "100%", height: "auto", filter: "brightness(0) invert(1)" }} />
                )}
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
