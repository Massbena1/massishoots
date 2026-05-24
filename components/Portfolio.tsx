"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const photos = [
  { key: "branding", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", alt: "Personal Branding" },
  { key: "corporate", src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80", alt: "Corporate" },
  { key: "mariage",   src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", alt: "Mariage" },
  { key: "branding",  src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600&q=80", alt: "Personal Branding" },
  { key: "mariage",   src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", alt: "Mariage" },
  { key: "corporate", src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80", alt: "Corporate" },
  { key: "branding",  src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80", alt: "Personal Branding" },
  { key: "mariage",   src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80", alt: "Mariage" },
  { key: "corporate", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", alt: "Corporate" },
  { key: "branding",  src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80", alt: "Personal Branding" },
  { key: "mariage",   src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", alt: "Mariage" },
  { key: "corporate", src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80", alt: "Corporate" },
];

const filters = [
  { value: "all",      label: "Tous" },
  { value: "branding", label: "Branding" },
  { value: "corporate",label: "Corporate" },
  { value: "mariage",  label: "Mariage" },
];

export default function Portfolio() {
  const [active, setActive] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="portfolio" style={{ padding: "140px 0", background: "transparent" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 56 }}
        >
          <span className="font-dm text-accent" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            — Mes réalisations
          </span>
          <h2 className="font-bebas" style={{ fontSize: "clamp(44px, 7vw, 80px)", letterSpacing: "0.02em", lineHeight: 0.9, marginTop: 16, color: "#fff" }}>
            PORTFOLIO
          </h2>
        </motion.div>

        {/* Filter toggle — glacial pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ marginBottom: 48, display: "flex", justifyContent: "flex-start" }}
        >
          <ToggleGroup
            type="single"
            value={active}
            onValueChange={(v) => { if (v) setActive(v); }}
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 9999,
              padding: "5px",
              gap: 2,
            }}
          >
            {filters.map((f) => (
              <ToggleGroupItem
                key={f.value}
                value={f.value}
                className="font-dm"
                style={{
                  borderRadius: 9999,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  padding: "8px 20px",
                  height: "auto",
                  background: active === f.value ? "#c4cdd6" : "transparent",
                  color: active === f.value ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                  fontWeight: active === f.value ? 700 : 400,
                  border: "none",
                  transition: "all 0.25s",
                }}
              >
                {f.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </motion.div>

        {/* FlipReveal grid */}
        <FlipReveal
          keys={[active]}
          showClass="block"
          hideClass="hidden"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
          className="portfolio-grid"
        >
          {photos.map((photo, i) => (
            <FlipRevealItem key={i} flipKey={photo.key}>
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: i % 5 === 0 ? "3/4" : i % 3 === 0 ? "4/3" : "1/1",
                  border: "1px solid rgba(255,255,255,0.07)",
                  position: "relative",
                  cursor: "pointer",
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
                  src={photo.src}
                  alt={photo.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease", filter: "brightness(0.9)" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Category badge */}
                <div style={{
                  position: "absolute", bottom: 10, left: 10,
                  padding: "4px 12px",
                  background: "rgba(7,9,13,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 9999,
                }}>
                  <span className="font-dm" style={{ fontSize: 10, color: "#c4cdd6", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {photo.alt}
                  </span>
                </div>
              </div>
            </FlipRevealItem>
          ))}
        </FlipReveal>
      </div>

      <style>{`
        @media (max-width: 1024px) { .portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 640px)  { .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
