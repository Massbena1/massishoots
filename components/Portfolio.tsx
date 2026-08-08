"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Camera, Video as VideoIcon } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { useTranslations } from "next-intl";

type MediaType = "photo" | "video";
type Sub = "all" | "branding" | "corporate" | "mariage" | "events" | "lifestyle" | "professionel" | "immobilier";

interface Item {
  sub: Exclude<Sub, "all">;
  src: string;
  altKey: string;
  wide?: boolean;
  videoSrc?: string;
  isStream?: boolean;
  pos?: string;
}

const PHOTOS: Item[] = [
  // ── Début imposé ─────────────────────────────────────────────────────────
  { sub: "events",       src: "/portfolio/eventt/1.jpg",                    altKey: "altEvents" },
  { sub: "corporate",    src: "/portfolio/corpo/1.1.jpg",                   altKey: "altCorporate" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/2.JPG",                 altKey: "altLifestyle" },
  { sub: "corporate",    src: "/portfolio/corpo/1.jpg",                     altKey: "altCorporate" },
  { sub: "branding",     src: "/portfolio/brand/1.jpg",                     altKey: "altBranding" },
  { sub: "professionel", src: "/portfolio/professionel/2.jpg",              altKey: "altProfessionel" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/4.JPG",                 altKey: "altLifestyle" },
  // ── Suite mixée ──────────────────────────────────────────────────────────
  { sub: "branding",     src: "/portfolio/brand/1.jpg",                     altKey: "altBranding",     wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/1.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/2.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "professionel", src: "/portfolio/professionel/1.JPG",              altKey: "altProfessionel" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/1.jpg",                 altKey: "altLifestyle" },
  { sub: "branding",     src: "/portfolio/brand/2.JPG",                     altKey: "altBranding" },
  { sub: "corporate",    src: "/portfolio/corpo/2.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/3.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "professionel", src: "/portfolio/professionel/2.jpg",              altKey: "altProfessionel", pos: "center top" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/3.jpg",                 altKey: "altLifestyle" },
  { sub: "branding",     src: "/portfolio/brand/4.jpg",                     altKey: "altBranding",     wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/3.jpg",                     altKey: "altCorporate",    wide: true },
  { sub: "events",       src: "/portfolio/eventt/4.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "professionel", src: "/portfolio/professionel/3.jpg",              altKey: "altProfessionel" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/4.JPG",                 altKey: "altLifestyle" },
  { sub: "branding",     src: "/portfolio/brand/6.jpg",                     altKey: "altBranding" },
  { sub: "corporate",    src: "/portfolio/corpo/4.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/5.jpg",                    altKey: "altEvents" },
  { sub: "professionel", src: "/portfolio/professionel/4.jpg",              altKey: "altProfessionel" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/5.jpg",                 altKey: "altLifestyle" },
  { sub: "branding",     src: "/portfolio/brand/7.JPG",                     altKey: "altBranding" },
  { sub: "corporate",    src: "/portfolio/corpo/5.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/6.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "professionel", src: "/portfolio/professionel/5.JPG",              altKey: "altProfessionel" },
  { sub: "branding",     src: "/portfolio/brand/8.jpg",                     altKey: "altBranding",     wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/6.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/7.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "branding",     src: "/portfolio/brand/9.jpg",                     altKey: "altBranding",     wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/7.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/8.jpg",                    altKey: "altEvents" },
  { sub: "corporate",    src: "/portfolio/corpo/8.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/9.jpg",                    altKey: "altEvents" },
  { sub: "corporate",    src: "/portfolio/corpo/9.jpg",                     altKey: "altCorporate",    wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/10.jpg",                    altKey: "altCorporate" },
  { sub: "corporate",    src: "/portfolio/corpo/11.jpg",                    altKey: "altCorporate" },
  { sub: "corporate",    src: "/portfolio/corpo/12.jpg",                    altKey: "altCorporate" },
  { sub: "corporate",    src: "/portfolio/corpo/13.jpg",                    altKey: "altCorporate" },
  { sub: "corporate",    src: "/portfolio/corpo/14.jpg",                    altKey: "altCorporate",    wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/15.jpg",                    altKey: "altCorporate" },
  { sub: "branding",     src: "/portfolio/brand/9.JPG",                     altKey: "altBranding" },
  { sub: "branding",     src: "/portfolio/brand/DSC03852-Enhanced-NR.jpg",  altKey: "altBranding" },
  { sub: "branding",     src: "/portfolio/brand/IMG_6529.JPG",              altKey: "altBranding" },
];

const CF = "https://videodelivery.net";
const cfUrl  = (uid: string) => `${CF}/${uid}/iframe`;
const cfThumb = (uid: string) => `${CF}/${uid}/thumbnails/thumbnail.jpg?time=1s&height=400`;

const VIDEOS: Item[] = [
  { sub: "events",       src: cfThumb("33d605a96ed11dd86c65cd224311b9c5"), videoSrc: cfUrl("33d605a96ed11dd86c65cd224311b9c5"), altKey: "altEvent",       isStream: true },
  { sub: "events",       src: cfThumb("423422c9fc06fd4ab1512c2cfe7363ff"), videoSrc: cfUrl("423422c9fc06fd4ab1512c2cfe7363ff"), altKey: "altEvent",       isStream: true },
  { sub: "events",       src: cfThumb("c3763e9534f9dda9c21623e5405e3f76"), videoSrc: cfUrl("c3763e9534f9dda9c21623e5405e3f76"), altKey: "altEvent",       isStream: true },
  { sub: "corporate",    src: cfThumb("0e03e8088bc55d14185e37a239bb708b"), videoSrc: cfUrl("0e03e8088bc55d14185e37a239bb708b"), altKey: "altCorpVideo",   isStream: true },
  { sub: "corporate",    src: cfThumb("ccfa7b3c618bc1e453b56b84ccabddf2"), videoSrc: cfUrl("ccfa7b3c618bc1e453b56b84ccabddf2"), altKey: "altCorpVideo",   isStream: true },
  { sub: "branding",     src: cfThumb("02a9f535b9271e28d437b6fb66bdee5b"), videoSrc: cfUrl("02a9f535b9271e28d437b6fb66bdee5b"), altKey: "altBrandFilm",   isStream: true },
  { sub: "branding",     src: cfThumb("c0c16bda3a89ddf03e0a2a3d76310cad"), videoSrc: cfUrl("c0c16bda3a89ddf03e0a2a3d76310cad"), altKey: "altBrandFilm",   isStream: true },
  { sub: "branding",     src: cfThumb("0e853f3e0c60d620766dc71153d0ab65"), videoSrc: cfUrl("0e853f3e0c60d620766dc71153d0ab65"), altKey: "altBrandFilm",   isStream: true },
  { sub: "professionel", src: cfThumb("1a703ddc9bc010e47c50d76973ae186d"), videoSrc: cfUrl("1a703ddc9bc010e47c50d76973ae186d"), altKey: "altProfessionel", isStream: true },
  { sub: "professionel", src: cfThumb("0b9170bfb757c4236c15a31e514bf7f4"), videoSrc: cfUrl("0b9170bfb757c4236c15a31e514bf7f4"), altKey: "altProfessionel", isStream: true },
  { sub: "professionel", src: cfThumb("0d7c513506d89cdfbd7b205883ea204f"), videoSrc: cfUrl("0d7c513506d89cdfbd7b205883ea204f"), altKey: "altProfessionel", isStream: true },
  { sub: "professionel", src: cfThumb("0f6fb704c5de599e5d9b030adbb57352"), videoSrc: cfUrl("0f6fb704c5de599e5d9b030adbb57352"), altKey: "altProfessionel", isStream: true },
  { sub: "professionel", src: cfThumb("6b98229299ebed639830da2c7af71213"), videoSrc: cfUrl("6b98229299ebed639830da2c7af71213"), altKey: "altProfessionel", isStream: true },
  { sub: "professionel", src: cfThumb("4f6eeb2539fce6617be55227f4786c2d"), videoSrc: cfUrl("4f6eeb2539fce6617be55227f4786c2d"), altKey: "altProfessionel", isStream: true },
];

const PHOTO_FILTERS: { value: Sub; labelKey: string }[] = [
  { value: "all",          labelKey: "filterAll" },
  { value: "professionel", labelKey: "filterProfessionel" },
  { value: "events",       labelKey: "filterEvents" },
  { value: "branding",     labelKey: "filterBranding" },
  { value: "corporate",    labelKey: "filterCorporate" },
  { value: "mariage",      labelKey: "filterMariage" },
  { value: "lifestyle",    labelKey: "filterLifestyle" },
];

const VIDEO_FILTERS: { value: Sub; labelKey: string }[] = [
  { value: "all",          labelKey: "filterAll" },
  { value: "immobilier",   labelKey: "filterImmobilier" },
  { value: "events",       labelKey: "filterEvents" },
  { value: "branding",     labelKey: "filterBranding" },
  { value: "corporate",    labelKey: "filterCorporate" },
  { value: "professionel", labelKey: "filterProfessionel" },
];

function PlayIcon() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.25)",
      transition: "background 0.3s",
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const [mediaType, setMediaType] = useState<MediaType>("photo");
  const [sub, setSub] = useState<Sub>("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeVideo, setActiveVideo] = useState<{ src: string; isStream: boolean } | null>(null);
  const [activePhoto, setActivePhoto] = useState<{ src: string; index: number } | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = mediaType === "photo" ? PHOTOS : VIDEOS;
  const filters = mediaType === "photo" ? PHOTO_FILTERS : VIDEO_FILTERS;
  const filtered = sub === "all" ? items : items.filter(i => i.sub === sub);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    if (!activePhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowLeft" && activePhoto.index > 0) {
        const prev = activePhoto.index - 1;
        if (!visible[prev]?.videoSrc) setActivePhoto({ src: visible[prev].src, index: prev });
      }
      if (e.key === "ArrowRight" && activePhoto.index < visible.length - 1) {
        const next = activePhoto.index + 1;
        if (!visible[next]?.videoSrc) setActivePhoto({ src: visible[next].src, index: next });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePhoto, visible]);

  const switchMedia = (type: MediaType) => {
    setMediaType(type);
    setSub("all");
    setVisibleCount(12);
  };

  const handleSetSub = (value: Sub) => {
    setSub(value);
    setVisibleCount(12);
  };

  return (
    <section data-sr id="portfolio" style={{ padding: "140px 0", background: "#0a0a0a" }}>
      <div className="container" style={{ maxWidth: 1280, margin: "0 auto" }}>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 48 }}
        >
          <span className="font-dm text-accent section-label" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            {t("label")}
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>
            {t("heading")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: 24 }}
        >
          <BentoGrid
            className="grid-cols-2 max-w-sm"
            items={[
              {
                title: t("photoTitle"),
                description: t("photoDesc"),
                icon: <Camera className="w-4 h-4 text-white/70" />,
                meta: `${PHOTOS.length} ${t("projects")}`,
                tags: [t("filterBranding"), t("filterCorporate")],
                cta: "→",
                active: mediaType === "photo",
                onClick: () => switchMedia("photo"),
              },
              {
                title: t("videoTitle"),
                description: t("videoDesc"),
                icon: <VideoIcon className="w-4 h-4 text-white/70" />,
                meta: `${VIDEOS.length} ${t("projects")}`,
                tags: ["Reels", "Films"],
                cta: "→",
                active: mediaType === "video",
                onClick: () => switchMedia("video"),
              },
            ]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 48, display: "flex", gap: 6, flexWrap: "wrap" }}
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleSetSub(f.value)}
              className="font-dm"
              style={{
                padding: "7px 18px",
                borderRadius: 9999,
                fontSize: 12,
                letterSpacing: "0.08em",
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.25s",
                background: sub === f.value ? "rgba(196,205,214,0.12)" : "transparent",
                color: sub === f.value ? "#c4cdd6" : "rgba(255,255,255,0.35)",
                borderColor: sub === f.value ? "rgba(196,205,214,0.4)" : "rgba(255,255,255,0.08)",
              }}
            >
              {t(f.labelKey as Parameters<typeof t>[0])}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${mediaType}-${sub}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="portfolio-grid grid-mobile-1 grid-tablet-2 grid-tablet-3"
            style={{
              display: "grid",
              gridAutoFlow: "dense",
              gap: "clamp(8px, 1.2vw, 20px)",
            }}
          >
            {visible.map((item, i) => {
              const altText = t(item.altKey as Parameters<typeof t>[0]);
              return (
                <div
                  key={`${item.src}-${i}`}
                  className={`portfolio-item${item.wide ? " portfolio-item-wide" : ""}`}
                  style={{
                    gridColumn: item.wide ? "span 2" : "span 1",
                    borderRadius: 20,
                    overflow: "hidden",
                    aspectRatio: item.videoSrc ? "9/16" : item.wide ? "4/3" : "4/5",
                    border: "1px solid rgba(255,255,255,0.07)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s",
                  }}
                  onClick={() => {
                    if (item.videoSrc) setActiveVideo({ src: item.videoSrc, isStream: !!item.isStream });
                    else setActivePhoto({ src: item.src, index: i });
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(196,205,214,0.3)";
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(196,205,214,0.08)";
                    const overlay = e.currentTarget.querySelector(".hover-overlay") as HTMLElement;
                    const img = e.currentTarget.querySelector("img") as HTMLElement;
                    if (overlay) overlay.style.opacity = "1";
                    if (img) img.style.transform = "scale(1.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                    const overlay = e.currentTarget.querySelector(".hover-overlay") as HTMLElement;
                    const img = e.currentTarget.querySelector("img") as HTMLElement;
                    if (overlay) overlay.style.opacity = "0";
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  {item.videoSrc ? (
                    <video
                      src={item.videoSrc}
                      poster={item.src}
                      loop
                      muted
                      playsInline
                      preload="none"
                      onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                      onMouseLeave={e => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s ease", filter: "brightness(0.82)" }}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.src}
                      alt={altText}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: item.pos ?? "center", display: "block", transition: "transform 0.7s ease", filter: "brightness(0.82)" }}
                    />
                  )}

                  {item.videoSrc && <PlayIcon />}

                  <div className="hover-overlay" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(7,9,13,0.85) 0%, rgba(7,9,13,0.3) 50%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: 20,
                  }}>
                    <span className="font-dm portfolio-category" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
                      {item.sub} · {altText}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className="font-bebas portfolio-title" style={{ fontSize: 22, color: "#fff", letterSpacing: "0.05em" }}>
                        {altText}
                      </span>
                      <span className="font-dm" style={{ fontSize: 11, color: "#c4cdd6", letterSpacing: "0.1em" }}>
                        →
                      </span>
                    </div>
                  </div>

                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    padding: "3px 10px",
                    background: "rgba(7,9,13,0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 9999,
                  }}>
                    <span className="font-dm" style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      {item.sub}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Voir plus */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: 40, display: "flex", justifyContent: "center" }}
          >
            <button
              onClick={() => setVisibleCount(c => c + 8)}
              className="font-dm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "13px 28px",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 9999,
                color: "#fff",
                fontSize: 13,
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "border-color 0.3s, background 0.3s, transform 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(196,205,214,0.35)";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {t("showMore")}
              <span style={{ fontSize: 11, color: "rgba(196,205,214,0.5)" }}>
                +{Math.min(8, filtered.length - visibleCount)}
              </span>
            </button>
          </motion.div>
        )}


      </div>

      {/* ── Modal photo ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActivePhoto(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.95)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto.src}
                alt="Photo portfolio — Massishoots Montréal"
                style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 12, display: "block" }}
              />
              {/* Prev */}
              {activePhoto.index > 0 && (
                <button
                  onClick={() => {
                    const prev = activePhoto.index - 1;
                    setActivePhoto({ src: visible[prev].src, index: prev });
                  }}
                  style={{
                    position: "absolute", left: -60, top: "50%", transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 9999, color: "#fff", fontSize: 20, width: 44, height: 44,
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >‹</button>
              )}
              {/* Next */}
              {activePhoto.index < visible.length - 1 && !visible[activePhoto.index + 1]?.videoSrc && (
                <button
                  onClick={() => {
                    const next = activePhoto.index + 1;
                    setActivePhoto({ src: visible[next].src, index: next });
                  }}
                  style={{
                    position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 9999, color: "#fff", fontSize: 20, width: 44, height: 44,
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >›</button>
              )}
              {/* Close */}
              <button
                onClick={() => setActivePhoto(null)}
                style={{
                  position: "absolute", top: -44, right: 0,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 9999, color: "#fff", fontSize: 13, letterSpacing: "0.08em",
                  padding: "6px 16px", cursor: "pointer",
                }}
              >✕ Fermer</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal vidéo ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveVideo(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", width: "100%" }}
            >
              {activeVideo.isStream
                ? <iframe src={activeVideo.src} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen style={{ width: "min(56vw, 400px)", height: "min(90vh, 700px)", borderRadius: 16, border: "none", display: "block" }} />
                : <video src={activeVideo.src} autoPlay controls playsInline style={{ width: "100%", maxHeight: "90vh", borderRadius: 16, display: "block", outline: "none" }} />
              }
              <button
                onClick={() => setActiveVideo(null)}
                style={{
                  position: "absolute", top: -44, right: 0,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 9999,
                  color: "#fff", fontSize: 13, letterSpacing: "0.08em",
                  padding: "6px 16px", cursor: "pointer",
                }}
              >
                ✕ Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Desktop - 4 colonnes par défaut */
        .portfolio-grid {
          grid-template-columns: repeat(4, 1fr);
          overflow-x: hidden;
          width: 100%;
        }

        /* Desktop large 1024px+ - 3 colonnes */
        @media (min-width: 1024px) {
          .portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }

        /* Tablette 768px+ - 2 colonnes */
        @media (max-width: 1023px) and (min-width: 769px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Mobile max-width: 768px - 1 colonne */
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding: 0 16px !important;
            overflow-x: hidden !important;
          }
          .portfolio-item {
            border-radius: 12px !important;
            aspect-ratio: 3/4 !important;
            min-height: 280px !important;
          }
          .portfolio-item-wide {
            grid-column: span 1 !important;
            aspect-ratio: 4/3 !important;
          }

          /* Texte overlay sur mobile */
          .hover-overlay {
            opacity: 1 !important;
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.92) 0%,
              rgba(0,0,0,0.5) 50%,
              rgba(0,0,0,0.1) 100%
            ) !important;
          }

          /* Titres responsive sur mobile */
          .portfolio-title {
            font-size: clamp(14px, 4vw, 20px) !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            line-height: 1.3 !important;
          }

          /* Catégorie sur mobile */
          .portfolio-category {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            max-width: 100% !important;
          }
        }

        @media (hover: none) { .hover-overlay { opacity: 1 !important; } }

        /* Prévention scroll horizontal global */
        body, html { overflow-x: hidden !important; max-width: 100vw !important; }
      `}</style>
    </section>
  );
}
