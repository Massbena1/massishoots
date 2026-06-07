"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  id: number;
  author: string;
  avatar: string;
}

export function TestimonialCard({ handleShuffle, testimonial, position, author, avatar }: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: isFront
          ? "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(196,205,214,0.06) inset"
          : "0 12px 40px rgba(0,0,0,0.3)",
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? 0 : position === "middle" ? 30 : 60,
        scale: position === "front" ? 1 : position === "middle" ? 0.97 : 0.94,
      }}
      drag={true}
      dragElastic={0.2}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => {
        dragRef.current = (e as PointerEvent).clientX;
      }}
      onDragEnd={(e) => {
        if (dragRef.current - (e as PointerEvent).clientX > 80) handleShuffle();
        dragRef.current = 0;
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={isFront ? handleShuffle : undefined}
      className={`absolute left-0 top-0 grid h-[420px] w-[320px] select-none place-content-center space-y-5 rounded-3xl p-8 ${
        isFront ? "cursor-pointer" : ""
      }`}
    >
      {/* Top highlight */}
      <div style={{
        position: "absolute", top: 0, left: 24, right: 24, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
        borderRadius: 9999,
      }} />

      <img
        src={avatar}
        alt={author}
        className="pointer-events-none mx-auto h-24 w-24 rounded-full object-cover"
        style={{ border: "2px solid rgba(196,205,214,0.2)", boxShadow: "0 0 24px rgba(196,205,214,0.08)" }}
      />

      <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: "#c4cdd6", fontSize: 12 }}>★</span>
        ))}
      </div>

      <p className="font-dm" style={{
        textAlign: "center", fontSize: 13,
        fontStyle: "italic", color: "rgba(255,255,255,0.55)", lineHeight: 1.8,
      }}>
        &ldquo;{testimonial}&rdquo;
      </p>

      <p className="font-dm" style={{
        textAlign: "center", fontSize: 11, fontWeight: 600,
        color: "#c4cdd6", letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {author}
      </p>
    </motion.div>
  );
}

interface Testimonial {
  id: number;
  testimonial: string;
  author: string;
  avatar: string;
}

export function ShuffleCards({ testimonials }: { testimonials: Testimonial[] }) {
  const [positions, setPositions] = React.useState<string[]>(
    testimonials.map((_, i) => (i === 0 ? "front" : i === 1 ? "middle" : "back"))
  );
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleShuffle = React.useCallback(() => {
    setPositions((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance every 5s
  React.useEffect(() => {
    const id = setInterval(handleShuffle, 5000);
    return () => clearInterval(id);
  }, [handleShuffle]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 28 }}>
      {/* Card stack */}
      <div style={{ position: "relative", height: 420, width: 320 }}>
        {testimonials.map((t, index) => (
          <TestimonialCard
            key={t.id}
            {...t}
            handleShuffle={handleShuffle}
            position={positions[index]}
          />
        ))}
      </div>

      {/* Controls row */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, paddingLeft: 8 }}>
        {/* Dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const stepsNeeded = (i - activeIndex + testimonials.length) % testimonials.length;
                for (let s = 0; s < stepsNeeded; s++) {
                  setTimeout(() => handleShuffle(), s * 50);
                }
              }}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 9999,
                background: i === activeIndex ? "#c4cdd6" : "rgba(255,255,255,0.18)",
                border: "none",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={handleShuffle}
          className="font-dm"
          style={{
            width: 36, height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(196,205,214,0.12)";
            e.currentTarget.style.borderColor = "rgba(196,205,214,0.3)";
            e.currentTarget.style.color = "#c4cdd6";
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
          Glisser ou cliquer
        </p>
      </div>
    </div>
  );
}
