"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Accueil",   href: "/" },
  { label: "Services",  href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Galeries",  href: "/galleries" },
  { label: "À propos",  href: "/about" },
  { label: "Contact",   href: "/contact" },
] as const;

export default function TopBar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    const localePrefix = `/${locale}`;
    const currentPath = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : "/";
    router.replace(currentPath, { locale: next });
  };

  const isActive = (href: string) => {
    const base = `/${locale}`;
    if (href === "/") return pathname === base || pathname === `${base}/`;
    return pathname.startsWith(`${base}${href}`);
  };

  return (
    <>
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 28px",
        pointerEvents: "none",
      }}>
        {/* Logo */}
        <Link
          href="/"
          className="font-bebas"
          onClick={() => setOpen(false)}
          style={{
            fontSize: 20,
            letterSpacing: "0.22em",
            color: "#fff",
            textDecoration: "none",
            pointerEvents: "auto",
            opacity: 0.9,
            position: "relative",
            zIndex: 120,
          }}
        >
          MASSISHOOTS
        </Link>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, pointerEvents: "auto", position: "relative", zIndex: 120 }}>
          <AnimatedThemeToggler />
          <button
            onClick={switchLocale}
            className="font-dm"
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              padding: "5px 10px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(6,8,12,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c4cdd6")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              background: "rgba(6,8,12,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "block", width: 18, height: 1.5, background: "#fff", borderRadius: 2 }}
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: "block", width: 18, height: 1.5, background: "#fff", borderRadius: 2 }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "block", width: 18, height: 1.5, background: "#fff", borderRadius: 2 }}
            />
          </button>
        </div>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 105,
              background: "rgba(6,8,12,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "0 40px 80px",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
              {NAV_ITEMS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-bebas"
                    style={{
                      fontSize: "clamp(48px, 12vw, 80px)",
                      letterSpacing: "0.04em",
                      color: isActive(href) ? "#fff" : "rgba(255,255,255,0.25)",
                      textDecoration: "none",
                      display: "block",
                      lineHeight: 1.1,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = isActive(href) ? "#fff" : "rgba(255,255,255,0.25)")}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              style={{ position: "absolute", bottom: 40, left: 40, right: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
                massishoots.com
              </span>
              <span className="font-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
                @massishoots
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
