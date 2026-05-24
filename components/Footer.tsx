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

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "28px 24px 44px",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: 20,
      }}>
        <Link href="/" className="font-bebas" style={{
          fontSize: 17, letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.8)", textDecoration: "none",
        }}>
          MASSISHOOTS
        </Link>

        <nav style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", justifyContent: "center" }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="font-dm"
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                padding: "5px 12px",
                borderRadius: 9999,
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="https://instagram.com/massishoots"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm text-accent"
            style={{
              fontSize: 12, letterSpacing: "0.1em",
              textDecoration: "none", transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            @massishoots
          </a>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.1)" }} />
          <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            © 2026 Massishoots · Montréal
          </span>
        </div>
      </div>
    </footer>
  );
}
