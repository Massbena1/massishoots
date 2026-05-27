"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Camera, Video as VideoIcon } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { useTranslations } from "next-intl";

type MediaType = "photo" | "video";
type Sub = "all" | "branding" | "corporate" | "mariage" | "events" | "lifestyle" | "professionel";

interface Item {
  sub: Exclude<Sub, "all">;
  src: string;
  altKey: string;
  wide?: boolean;
  videoSrc?: string;
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
  // ── Suite mixée, jamais deux fois la même catégorie consécutive ──────────
  { sub: "mariage",      src: "/portfolio/mariage/1.jpg",                   altKey: "altMariage",      wide: true },
  { sub: "branding",     src: "/portfolio/brand/2.JPG",                     altKey: "altBranding" },
  { sub: "corporate",    src: "/portfolio/corpo/2.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/2.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "professionel", src: "/portfolio/professionel/1.JPG",              altKey: "altProfessionel" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/1.jpg",                 altKey: "altLifestyle" },
  { sub: "mariage",      src: "/portfolio/mariage/2.jpg",                   altKey: "altMariage" },
  { sub: "branding",     src: "/portfolio/brand/3.jpg",                     altKey: "altBranding" },
  { sub: "corporate",    src: "/portfolio/corpo/3.jpg",                     altKey: "altCorporate",    wide: true },
  { sub: "events",       src: "/portfolio/eventt/3.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "professionel", src: "/portfolio/professionel/3.jpg",              altKey: "altProfessionel", pos: "center top" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/3.jpg",                 altKey: "altLifestyle" },
  { sub: "mariage",      src: "/portfolio/mariage/3.jpg",                   altKey: "altMariage" },
  { sub: "branding",     src: "/portfolio/brand/4.jpg",                     altKey: "altBranding",     wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/4.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/4.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "professionel", src: "/portfolio/professionel/4.jpg",              altKey: "altProfessionel" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/5.jpg",                 altKey: "altLifestyle" },
  { sub: "mariage",      src: "/portfolio/mariage/4.jpg",                   altKey: "altMariage" },
  { sub: "branding",     src: "/portfolio/brand/5.jpg",                     altKey: "altBranding",     wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/5.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/5.jpg",                    altKey: "altEvents" },
  { sub: "professionel", src: "/portfolio/professionel/5.JPG",              altKey: "altProfessionel" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/6.JPG",                 altKey: "altLifestyle" },
  { sub: "mariage",      src: "/portfolio/mariage/5.jpg",                   altKey: "altMariage",      wide: true, pos: "center top" },
  { sub: "branding",     src: "/portfolio/brand/6.jpg",                     altKey: "altBranding" },
  { sub: "corporate",    src: "/portfolio/corpo/6.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/6.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/7.jpg",                 altKey: "altLifestyle",    wide: true },
  { sub: "mariage",      src: "/portfolio/mariage/6.jpg",                   altKey: "altMariage" },
  { sub: "branding",     src: "/portfolio/brand/7.JPG",                     altKey: "altBranding" },
  { sub: "corporate",    src: "/portfolio/corpo/7.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/7.jpg",                    altKey: "altEvents",       wide: true },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/8.jpg",                 altKey: "altLifestyle" },
  { sub: "mariage",      src: "/portfolio/mariage/7.jpg",                   altKey: "altMariage" },
  { sub: "branding",     src: "/portfolio/brand/8.jpg",                     altKey: "altBranding",     wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/8.jpg",                     altKey: "altCorporate" },
  { sub: "events",       src: "/portfolio/eventt/8.jpg",                    altKey: "altEvents" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/9.JPG",                 altKey: "altLifestyle" },
  { sub: "mariage",      src: "/portfolio/mariage/8.jpg",                   altKey: "altMariage" },
  { sub: "branding",     src: "/portfolio/brand/9.jpg",                     altKey: "altBranding",     wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/9.jpg",                     altKey: "altCorporate",    wide: true },
  { sub: "events",       src: "/portfolio/eventt/9.jpg",                    altKey: "altEvents" },
  { sub: "lifestyle",    src: "/portfolio/lyfestyle/10.jpg",                altKey: "altLifestyle" },
  // ── brand / events / lifestyle / professionel épuisés ────────────────────
  { sub: "mariage",      src: "/portfolio/mariage/9.JPG",                   altKey: "altMariage" },
  { sub: "corporate",    src: "/portfolio/corpo/10.jpg",                    altKey: "altCorporate" },
  { sub: "mariage",      src: "/portfolio/mariage/10.jpg",                  altKey: "altMariage" },
  { sub: "corporate",    src: "/portfolio/corpo/11.jpg",                    altKey: "altCorporate" },
  { sub: "mariage",      src: "/portfolio/mariage/11.jpg",                  altKey: "altMariage",      wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/12.jpg",                    altKey: "altCorporate" },
  { sub: "mariage",      src: "/portfolio/mariage/12.jpg",                  altKey: "altMariage",      wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/13.jpg",                    altKey: "altCorporate" },
  { sub: "mariage",      src: "/portfolio/mariage/13.jpg",                  altKey: "altMariage" },
  { sub: "corporate",    src: "/portfolio/corpo/14.jpg",                    altKey: "altCorporate",    wide: true },
  { sub: "mariage",      src: "/portfolio/mariage/14.jpg",                  altKey: "altMariage",      wide: true },
  { sub: "corporate",    src: "/portfolio/corpo/15.jpg",                    altKey: "altCorporate" },
  { sub: "mariage",      src: "/portfolio/mariage/15.jpg",                  altKey: "altMariage" },
  { sub: "mariage",      src: "/portfolio/mariage/16.jpg",                  altKey: "altMariage",      wide: true },
  { sub: "mariage",      src: "/portfolio/mariage/DSC03852-Enhanced-NR.jpg",altKey: "altMariage" },
  { sub: "mariage",      src: "/portfolio/mariage/DSC09165.jpg",            altKey: "altMariage" },
  { sub: "mariage",      src: "/portfolio/mariage/IMG_6529.JPG",            altKey: "altMariage" },
];

const VIDEOS: Item[] = [
  // Events en premier
  { sub: "events",       src: "/portfolio/videos/event-1.jpg",    videoSrc: "/portfolio/videos/event-1.mp4",    altKey: "altEvent" },
  { sub: "corporate",   src: "/portfolio/videos/corpo-1.jpg",    videoSrc: "/portfolio/videos/corpo-1.mp4",    altKey: "altCorpVideo" },
  { sub: "branding",    src: "/portfolio/videos/brand-1.jpg",    videoSrc: "/portfolio/videos/brand-1.mp4",    altKey: "altBrandFilm" },
  { sub: "professionel",src: "/portfolio/videos/facecam-1.jpg",  videoSrc: "/portfolio/videos/facecam-1.mp4",  altKey: "altProfessionel" },
  { sub: "events",      src: "/portfolio/videos/event-2.jpg",    videoSrc: "/portfolio/videos/event-2.mp4",    altKey: "altEvent" },
  { sub: "professionel",src: "/portfolio/videos/facecam-2.jpg",  videoSrc: "/portfolio/videos/facecam-2.mp4",  altKey: "altProfessionel" },
  { sub: "branding",    src: "/portfolio/videos/brand-2.jpg",    videoSrc: "/portfolio/videos/brand-2.mp4",    altKey: "altBrandFilm" },
  { sub: "professionel",src: "/portfolio/videos/facecam-3.jpg",  videoSrc: "/portfolio/videos/facecam-3.mp4",  altKey: "altProfessionel" },
  { sub: "corporate",   src: "/portfolio/videos/corpo-2.jpg",    videoSrc: "/portfolio/videos/corpo-2.mp4",    altKey: "altCorpVideo" },
  { sub: "professionel",src: "/portfolio/videos/facecam-4.jpg",  videoSrc: "/portfolio/videos/facecam-4.mp4",  altKey: "altProfessionel" },
  { sub: "branding",    src: "/portfolio/videos/brand-3.jpg",    videoSrc: "/portfolio/videos/brand-3.mp4",    altKey: "altBrandFilm" },
  { sub: "professionel",src: "/portfolio/videos/facecam-5.jpg",  videoSrc: "/portfolio/videos/facecam-5.mp4",  altKey: "altProfessionel" },
  { sub: "professionel",src: "/portfolio/videos/facecam-6.jpg",  videoSrc: "/portfolio/videos/facecam-6.mp4",  altKey: "altProfessionel" },
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
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = mediaType === "photo" ? PHOTOS : VIDEOS;
  const filters = mediaType === "photo" ? PHOTO_FILTERS : VIDEO_FILTERS;
  const filtered = sub === "all" ? items : items.filter(i => i.sub === sub);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const switchMedia = (type: MediaType) => {
    setMediaType(type);
    setSub("all");
    setVisibleCount(8);
  };

  const handleSetSub = (value: Sub) => {
    setSub(value);
    setVisibleCount(8);
  };

  return (
    <section id="portfolio" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 48 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
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
                cursor: "none",
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
            className="portfolio-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
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
                    aspectRatio: item.wide ? "16/9" : item.videoSrc ? "9/16" : "3/4",
                    border: "1px solid rgba(255,255,255,0.07)",
                    position: "relative",
                    cursor: "none",
                    transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s",
                  }}
                  onClick={() => item.videoSrc && setActiveVideo(item.videoSrc)}
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
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: item.pos ?? "center center", display: "block", transition: "transform 0.7s ease", filter: "brightness(0.82)" }}
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
                    <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
                      {item.sub} · {altText}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className="font-bebas" style={{ fontSize: 22, color: "#fff", letterSpacing: "0.05em" }}>
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
                cursor: "none",
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

        {/* External portfolio CTA */}
        {mediaType === "photo" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginTop: 56, display: "flex", justifyContent: "center" }}
          >
            <a
              href="https://massishot.myportfolio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-dm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 28px",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 9999,
                textDecoration: "none",
                transition: "border-color 0.3s, background 0.3s, transform 0.3s",
                cursor: "none",
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
              {/* Icon */}
              <span style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(196,205,214,0.1)",
                border: "1px solid rgba(196,205,214,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(196,205,214,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </span>

              {/* Text */}
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.02em", lineHeight: 1 }}>
                  {t("moreCta")}
                </span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
                  massishot.myportfolio.com
                </span>
              </span>

              {/* Arrow */}
              <span style={{
                fontSize: 18,
                color: "rgba(196,205,214,0.5)",
                transition: "transform 0.3s, color 0.3s",
                lineHeight: 1,
              }}
                className="group-hover-arrow"
              >
                ↗
              </span>
            </a>
          </motion.div>
        )}

      </div>

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
              cursor: "none",
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
              <video
                src={activeVideo}
                autoPlay
                controls
                playsInline
                style={{ width: "100%", maxHeight: "90vh", borderRadius: 16, display: "block", outline: "none" }}
              />
              <button
                onClick={() => setActiveVideo(null)}
                style={{
                  position: "absolute", top: -44, right: 0,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 9999,
                  color: "#fff", fontSize: 13, letterSpacing: "0.08em",
                  padding: "6px 16px", cursor: "none",
                }}
              >
                ✕ Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 6px !important; }
          .portfolio-item { border-radius: 12px !important; aspect-ratio: 1/1 !important; }
          .portfolio-item-wide { grid-column: span 2 !important; aspect-ratio: 16/9 !important; }
        }
        @media (hover: none) { .hover-overlay { opacity: 1 !important; } }
      `}</style>
    </section>
  );
}
