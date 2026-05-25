"use client";
import { PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

export default function ShaderHero() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "transparent" }}>
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02  0 1 0 0 0.02  0 0 1 0 0.05  0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#c4cdd6" />
            <stop offset="100%" stopColor="#8892a0" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Main content — bottom left */}
      <main className="absolute bottom-8 left-8 z-20 max-w-2xl">
        <div className="text-left">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 relative border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            <span className="font-dm text-white/80 text-sm font-medium relative z-10 tracking-wide">
              ✦ Montréal · Sony A7 III · DJI Mini 5 Pro
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-bebas text-white mb-6 leading-none"
            style={{ fontSize: "clamp(52px, 9vw, 110px)", letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="block font-light mb-1"
              style={{
                fontSize: "clamp(18px, 3vw, 36px)",
                letterSpacing: "0.35em",
                background: "linear-gradient(135deg, #ffffff 0%, #c4cdd6 45%, #8892a0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-dm-sans), sans-serif",
                textTransform: "uppercase",
              }}
            >
              Photographe & Vidéaste
            </motion.span>
            <span className="block" style={{ color: "#ffffff" }}>MASSI</span>
            <span className="block italic" style={{ color: "#c4cdd6", fontStyle: "italic" }}>SHOOTS</span>
          </motion.h1>

          {/* Emotional tagline */}
          <motion.p
            className="font-dm font-light mb-3 leading-snug max-w-lg"
            style={{ fontSize: "clamp(18px, 2.2vw, 24px)", color: "#c4cdd6", letterSpacing: "-0.01em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            On ne crée pas juste du contenu.{" "}
            <em style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>On construit des marques.</em>
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="font-dm font-light text-white/45 mb-8 leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(13px, 1.3vw, 15px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Du personal branding au mariage — chaque plan est une décision créative. 50+ clients à Montréal.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.a
              href="/portfolio"
              className="font-dm px-10 py-4 rounded-full bg-transparent border border-white/20 text-white/80 font-medium text-sm transition-all duration-300 backdrop-blur-sm"
              style={{ letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir le portfolio
            </motion.a>
            <motion.a
              href="/contact"
              className="font-dm px-10 py-4 rounded-full font-semibold text-sm"
              style={{
                background: "#f2f0ec",
                color: "#0a0a0a",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réserver une séance
            </motion.a>
          </motion.div>
        </div>
      </main>

      {/* Cinematic image reel — right side */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 z-10 hero-reel"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "42%", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr 1fr", gap: 4, padding: "4px 0 4px 4px" }}
      >
        {[
          { src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80", row: "span 2", bright: 0.7 },
          { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", row: "span 1", bright: 0.6 },
          { src: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600&q=80", row: "span 1", bright: 0.65 },
          { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", row: "span 1", bright: 0.55 },
          { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", row: "span 2", bright: 0.6 },
        ].map((img, i) => (
          <div key={i} style={{ gridRow: img.row, overflow: "hidden", borderRadius: 4, position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: `brightness(${img.bright}) saturate(0.7)`, transition: "transform 8s ease", display: "block" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(7,9,13,0.5))" }} />
          </div>
        ))}
        {/* Right fade gradient */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 80, background: "linear-gradient(to left, transparent, rgba(7,9,13,0))", pointerEvents: "none" }} />
        {/* Left fade gradient */}
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 120, background: "linear-gradient(to right, var(--bg, #0a0a0a), transparent)", pointerEvents: "none" }} />
      </motion.div>

      {/* Pulsing border + rotating text — bottom right */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <PulsingBorder
            colors={["#c4cdd6", "#8892a0", "#f2f0ec", "#4a5058"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={0.8}
            spots={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={0.4}
            scale={0.65}
            rotation={0}
            frame={9161408.251009725}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transform: "scale(1.6)" }}
          >
            <defs>
              <path id="circle-ms" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-sm fill-white/60 font-medium">
              <textPath href="#circle-ms" startOffset="0%">
                MASSISHOOTS • MONTRÉAL • PHOTO & VIDEO • MASSISHOOTS •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>

    </div>
  );
}
