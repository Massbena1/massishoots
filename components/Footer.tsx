"use client";
import Link from "next/link";

const links = [
  { label: "Services",  href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "À propos",  href: "/about" },
  { label: "Contact",   href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(255,255,255,0.015)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      overflow: "hidden",
    }}>
      {/* Top highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        pointerEvents: "none",
      }} />

      {/* Large editorial watermark */}
      <div style={{ padding: "48px 24px 0", textAlign: "center", overflow: "hidden" }}>
        <p className="font-bebas" style={{
          fontSize: "clamp(64px, 14vw, 180px)",
          letterSpacing: "-0.01em",
          lineHeight: 0.85,
          color: "rgba(255,255,255,0.03)",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}>
          MASSISHOOTS
        </p>
      </div>

      {/* Bottom area — 3 columns */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "32px 24px 48px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "start",
        gap: 32,
      }} className="footer-grid">

        {/* Left — brand + contact */}
        <div>
          <Link href="/" className="font-bebas" style={{ fontSize: 17, letterSpacing: "0.15em", color: "rgba(255,255,255,0.8)", textDecoration: "none", display: "block", marginBottom: 14 }}>
            MASSISHOOTS
          </Link>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <a href="mailto:massi@massishoots.com" className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#c4cdd6")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
              massi@massishoots.com
            </a>
            <span className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
              Montréal, Québec
            </span>
            <span className="font-dm" style={{ fontSize: 11, color: "#c4cdd6", letterSpacing: "0.08em", opacity: 0.7 }}>
              ✈ Disponible pour voyages internationaux
            </span>
          </div>
        </div>

        {/* Center — nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className="font-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.06em", padding: "4px 12px", borderRadius: 9999, transition: "color 0.2s, background 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right — social + copyright */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <a href="https://instagram.com/massishoots" target="_blank" rel="noopener noreferrer" className="font-dm text-accent" style={{ fontSize: 12, letterSpacing: "0.1em", textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            @massishoots
          </a>
          <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", textAlign: "right" }}>
            © 2026 Massishoots · Tous droits réservés
          </span>
          <span className="font-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.12)", letterSpacing: "0.08em" }}>
            MONTRÉAL · CANADA · INTERNATIONAL
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-grid > div:last-child { align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
