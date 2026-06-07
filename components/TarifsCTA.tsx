"use client";

import { motion } from "framer-motion";

export default function TarifsCTA() {
  return (
    <section style={{ position: "relative", background: "#000", padding: "100px 24px 80px" }}>
      {/* Gold top line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, #C9A84C 50%, transparent 100%)",
      }} />

      {/* Subtle glow */}
      <div style={{
        position: "absolute",
        top: 0, left: "50%", transform: "translateX(-50%)",
        width: 500, height: 300,
        background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>

        {/* Title */}
        <motion.h2
          className="font-bebas"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            letterSpacing: "0.02em",
            color: "#fff",
            lineHeight: 0.95,
            marginBottom: 28,
          }}
        >
          Prêt à élever votre image ?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="font-dm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.85,
            marginBottom: 48,
          }}
        >
          Les disponibilités sont limitées.<br />
          Chaque mois, nous acceptons un nombre restreint de nouveaux clients<br />
          pour garantir une qualité irréprochable sur chaque projet.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://calendly.com/massishot-ca/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 40px",
              background: "#C9A84C",
              color: "#0a0a0a",
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.35)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Réserver mon appel gratuit →
          </a>

          <p className="font-dm" style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop: 16,
          }}>
            Appel de 30 min · Sans engagement · Réponse sous 24h
          </p>
        </motion.div>

        {/* Divider */}
        <div style={{
          width: 1, height: 48,
          background: "linear-gradient(to bottom, rgba(201,168,76,0.3), transparent)",
          margin: "48px auto",
        }} />

        {/* Contact icons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}
        >
          {[
            { icon: "📱", label: "438-464-0607", href: "tel:4384640607" },
            { icon: "📧", label: "massishoots.ca@gmail.com", href: "mailto:massishoots.ca@gmail.com" },
            { icon: "📸", label: "@massishoots", href: "https://instagram.com/massishoots" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-dm"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#C9A84C")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
