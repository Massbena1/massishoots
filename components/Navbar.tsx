"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const links = [
  { label: "Services",  href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "À propos",  href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Floating pill navbar — desktop */}
      <nav className="hidden md:flex" style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
      }}>
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "5px 5px 5px 18px",
            borderRadius: 9999,
            background: "rgba(6,8,12,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.1) inset, 0 1px 0 rgba(255,255,255,0.06) inset"
              : "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
          }}
        >
          {/* Logo */}
          <Link href="/" className="font-bebas" style={{
            fontSize: 15,
            letterSpacing: "0.2em",
            color: "#fff",
            textDecoration: "none",
            marginRight: 6,
            whiteSpace: "nowrap",
          }}>
            MASSISHOOTS
          </Link>

          {/* Divider */}
          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />

          {/* Theme switcher */}
          <AnimatedThemeToggler />

          {/* Divider */}
          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />

          {/* Links */}
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-dm"
              style={{
                fontSize: 12.5,
                color: isActive(l.href) ? "#fff" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                letterSpacing: "0.03em",
                padding: "6px 11px",
                borderRadius: 9999,
                transition: "color 0.2s, background 0.2s",
                whiteSpace: "nowrap",
                background: isActive(l.href) ? "rgba(255,255,255,0.07)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/contact"
            className="font-dm"
            style={{
              padding: "8px 18px",
              background: "#f2f0ec",
              color: "#0a0a0a",
              borderRadius: 9999,
              fontSize: 12.5,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.05em",
              marginLeft: 2,
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            Réserver
          </Link>
        </motion.div>
      </nav>

      {/* Mobile top bar */}
      <nav className="md:hidden" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(6,8,12,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" className="font-bebas" style={{ fontSize: 18, letterSpacing: "0.18em", color: "#fff", textDecoration: "none" }}>
            MASSISHOOTS
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="menu"
            style={{ background: "none", border: "none", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5, background: "#fff",
                transformOrigin: "center",
                transition: "transform 0.3s, opacity 0.3s",
                transform: open
                  ? (i === 0 ? "rotate(45deg) translateY(6.5px)" : i === 2 ? "rotate(-45deg) translateY(-6.5px)" : "none")
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div style={{ padding: "20px 20px 28px", display: "flex", flexDirection: "column", gap: 4 }}>
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-dm"
                    style={{
                      padding: "12px 16px",
                      color: isActive(l.href) ? "#fff" : "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      fontSize: 15,
                      borderRadius: 14,
                      background: isActive(l.href) ? "rgba(255,255,255,0.06)" : "transparent",
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="font-dm"
                  style={{
                    marginTop: 8, padding: "14px 0",
                    background: "#f2f0ec", color: "#0a0a0a",
                    borderRadius: 14, fontSize: 14, fontWeight: 700,
                    textAlign: "center", textDecoration: "none",
                    display: "block",
                  }}
                >
                  Réserver une séance
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
