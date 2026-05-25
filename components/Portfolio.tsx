"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Camera, Video as VideoIcon } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";

type MediaType = "photo" | "video";
type Sub = "all" | "branding" | "corporate" | "mariage" | "events";

interface Item {
  sub: Exclude<Sub, "all">;
  src: string;
  alt: string;
  wide?: boolean;
}

const PHOTOS: Item[] = [
  { sub: "branding",  src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80", alt: "Personal Branding" },
  { sub: "corporate", src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&q=80", alt: "Corporate" },
  { sub: "mariage",   src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80", alt: "Mariage", wide: true },
  { sub: "branding",  src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=700&q=80", alt: "Personal Branding" },
  { sub: "events",    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80", alt: "Événements", wide: true },
  { sub: "mariage",   src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80", alt: "Mariage" },
  { sub: "corporate", src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80", alt: "Corporate" },
  { sub: "branding",  src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=80", alt: "Personal Branding", wide: true },
  { sub: "events",    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80", alt: "Événements" },
  { sub: "mariage",   src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&q=80", alt: "Mariage" },
  { sub: "corporate", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80", alt: "Corporate", wide: true },
  { sub: "branding",  src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=700&q=80", alt: "Personal Branding" },
];

const VIDEOS: Item[] = [
  { sub: "branding",  src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&q=80", alt: "Brand Film", wide: true },
  { sub: "corporate", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80", alt: "Corporate Video" },
  { sub: "mariage",   src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=700&q=80", alt: "Film de Mariage" },
  { sub: "events",    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=700&q=80", alt: "Événement", wide: true },
  { sub: "branding",  src: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=700&q=80", alt: "Brand Film" },
  { sub: "corporate", src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=80", alt: "Corporate Video", wide: true },
  { sub: "mariage",   src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80", alt: "Film de Mariage" },
  { sub: "events",    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80", alt: "Événement" },
];

const SUB_FILTERS: { value: Sub; label: string }[] = [
  { value: "all",       label: "Tous" },
  { value: "branding",  label: "Branding" },
  { value: "corporate", label: "Corporate" },
  { value: "mariage",   label: "Mariage" },
  { value: "events",    label: "Événements" },
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
  const [mediaType, setMediaType] = useState<MediaType>("photo");
  const [sub, setSub] = useState<Sub>("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = mediaType === "photo" ? PHOTOS : VIDEOS;
  const filtered = sub === "all" ? items : items.filter(i => i.sub === sub);

  const switchMedia = (type: MediaType) => {
    setMediaType(type);
    setSub("all");
  };

  return (
    <section id="portfolio" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 48 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            — Mes réalisations
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>
            PORTFOLIO
          </h2>
        </motion.div>

        {/* Media type tabs — BentoGrid Photo / Vidéo */}
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
                title: "Photo",
                description: "Branding, corporate, mariage & événements",
                icon: <Camera className="w-4 h-4 text-white/70" />,
                meta: `${PHOTOS.length} projets`,
                tags: ["Branding", "Corporate"],
                cta: "Voir →",
                active: mediaType === "photo",
                onClick: () => switchMedia("photo"),
              },
              {
                title: "Vidéo",
                description: "Brand films, reels, couverture d'événements",
                icon: <VideoIcon className="w-4 h-4 text-white/70" />,
                meta: `${VIDEOS.length} projets`,
                tags: ["Reels", "Films"],
                cta: "Voir →",
                active: mediaType === "video",
                onClick: () => switchMedia("video"),
              },
            ]}
          />
        </motion.div>

        {/* Sub-filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 48, display: "flex", gap: 6, flexWrap: "wrap" }}
        >
          {SUB_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setSub(f.value)}
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
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
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
              gap: 12,
            }}
          >
            {filtered.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                style={{
                  gridColumn: item.wide ? "span 2" : "span 1",
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: item.wide ? "16/9" : "3/4",
                  border: "1px solid rgba(255,255,255,0.07)",
                  position: "relative",
                  cursor: "none",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(196,205,214,0.25)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease", filter: "brightness(0.85)" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />

                {/* Play button for videos */}
                {mediaType === "video" && <PlayIcon />}

                {/* Badge */}
                <div style={{
                  position: "absolute", bottom: 10, left: 10,
                  padding: "4px 12px",
                  background: "rgba(7,9,13,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 9999,
                }}>
                  <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {item.alt}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      <style>{`
        @media (max-width: 1024px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .portfolio-grid { grid-template-columns: repeat(1, 1fr) !important; } }
      `}</style>
    </section>
  );
}
