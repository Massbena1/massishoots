"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function easeOutQuad(t: number) {
  return t * (2 - t);
}

function Counter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          observer.disconnect();
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setDisplay(Math.round(easeOutQuad(progress) * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span
      ref={ref}
      className="font-bebas stat-counter"
      style={{ fontSize: "clamp(44px, 5vw, 68px)", color: "#c4cdd6", lineHeight: 1, display: "block", transition: "color 0.3s ease" }}
    >
      {prefix}{display}{suffix}
    </span>
  );
}

const stats = [
  { num: 4,   suffix: " ans", prefix: "",   label: "De création de contenu premium",  sub: "Depuis 2021" },
  { num: 50,  suffix: "+",    prefix: "",   label: "Clients accompagnés à Montréal",  sub: "Marques & entrepreneurs" },
  { num: 2,   suffix: "M+",   prefix: "",   label: "Vues générées pour nos clients",  sub: "Sur toutes les plateformes" },
  { num: 100, suffix: "%",    prefix: "",   label: "Projets livrés clés en main",     sub: "Sans exception" },
];

export default function AboutStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ padding: "0 24px 120px" }}>

      {/* Label */}
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-dm"
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 28,
          }}
        >
          — En chiffres
        </motion.span>
      </div>

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="about-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 24, right: 24, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }} />
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(196,205,214,0.04)";
                const counter = e.currentTarget.querySelector(".stat-counter") as HTMLElement;
                if (counter) counter.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                const counter = e.currentTarget.querySelector(".stat-counter") as HTMLElement;
                if (counter) counter.style.color = "#c4cdd6";
              }}
              style={{
                textAlign: "center",
                padding: "40px 20px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                transition: "background 0.3s ease",
              }}
            >
              <Counter value={s.num} suffix={s.suffix} prefix={s.prefix} />
              <p className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 8, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
                {s.label}
              </p>
              <p className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", marginTop: 4, letterSpacing: "0.06em", fontStyle: "italic" }}>
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .about-stats-grid > *:nth-child(2) { border-right: none !important; }
          .about-stats-grid > * { padding: 32px 16px !important; }
        }
      `}</style>
    </section>
  );
}
