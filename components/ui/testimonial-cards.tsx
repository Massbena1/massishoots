"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  testimonial: string;
  author: string;
  avatar: string;
}

export function ShuffleCards({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = React.useState(0);
  const [dir, setDir] = React.useState(1);

  const go = React.useCallback((next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  const next = React.useCallback(() => {
    go((index + 1) % testimonials.length);
  }, [index, go, testimonials.length]);

  React.useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[index];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 28 }}>
      {/* Single card */}
      <div style={{ position: "relative", height: 420, width: 320 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={t.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 24,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(196,205,214,0.06) inset",
              display: "grid",
              placeContent: "center",
              gap: 20,
              padding: 32,
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 24, right: 24, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
            }} />

            <img
              src={t.avatar}
              alt={t.author}
              style={{
                width: 96, height: 96, borderRadius: "50%",
                objectFit: "cover", objectPosition: "center top",
                margin: "0 auto", display: "block",
                border: "2px solid rgba(196,205,214,0.2)",
                boxShadow: "0 0 24px rgba(196,205,214,0.08)",
              }}
            />

            <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: "#C9A84C", fontSize: 14 }}>★</span>
              ))}
            </div>

            <p className="font-dm" style={{
              textAlign: "center", fontSize: 13,
              fontStyle: "italic", color: "rgba(255,255,255,0.65)", lineHeight: 1.8,
            }}>
              &ldquo;{t.testimonial}&rdquo;
            </p>

            <p className="font-dm" style={{
              textAlign: "center", fontSize: 11, fontWeight: 600,
              color: "#c4cdd6", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              {t.author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, paddingLeft: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === index ? 20 : 6, height: 6,
                borderRadius: 9999,
                background: i === index ? "#C9A84C" : "rgba(255,255,255,0.18)",
                border: "none", padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="font-dm"
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.6)", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", backdropFilter: "blur(8px)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(201,168,76,0.12)";
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
            e.currentTarget.style.color = "#C9A84C";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          →
        </button>

        <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Cliquer pour naviguer
        </p>
      </div>
    </div>
  );
}
