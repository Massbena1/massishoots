"use client";
import { motion } from "framer-motion";
import { Home, Camera, Images, User, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const HOME_SECTIONS: Record<string, string> = {
  "/services":  "services",
  "/portfolio": "portfolio",
};

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScroll(targetY: number, duration = 900) {
  const start = window.scrollY;
  const distance = targetY - start;
  const startTime = performance.now();
  function step(now: number) {
    const p = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const ITEMS = [
  { label: "Accueil",   icon: Home,   href: "/",          from: "#a955ff", to: "#ea51ff" },
  { label: "Services",  icon: Camera, href: "/services",  from: "#56CCF2", to: "#2F80ED" },
  { label: "Portfolio", icon: Images, href: "/portfolio", from: "#FF9966", to: "#FF5E62" },
  { label: "À propos",  icon: User,   href: "/about",     from: "#80FF72", to: "#7EE8FA" },
  { label: "Contact",   icon: Mail,   href: "/contact",   from: "#ffa9c6", to: "#f434e2" },
] as const;

export default function GradientMenu() {
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const base = `/${locale}`;
    if (href === "/") return pathname === base || pathname === `${base}/`;
    return pathname.startsWith(`${base}${href}`);
  };

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const handleClick = (e: React.MouseEvent, href: string) => {
    const sectionId = HOME_SECTIONS[href];
    if (sectionId && isHome) {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) smoothScroll(el.getBoundingClientRect().top + window.scrollY - 80);
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {ITEMS.map(({ label, icon: Icon, href, from, to }) => {
        const active = isActive(href);
        return (
          <motion.div
            key={href}
            className="relative"
            initial={false}
            whileHover="hovered"
            animate={active ? "hovered" : "idle"}
          >
            {/* Item pill */}
            <Link href={href} aria-label={label} style={{ textDecoration: "none" }} onClick={(e) => handleClick(e, href)}>
              <motion.div
                variants={{
                  idle:    { width: 60, borderRadius: 9999 },
                  hovered: { width: 160, borderRadius: 30 },
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                style={{
                  position: "relative",
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Glass base */}
                <span style={{
                  position: "absolute", inset: 0,
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }} />

                {/* Gradient fill */}
                <motion.span
                  variants={{ idle: { opacity: 0 }, hovered: { opacity: 1 } }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg, ${from}, ${to})`,
                  }}
                />

                {/* Icon */}
                <motion.span
                  variants={{ idle: { scale: 1, opacity: 1 }, hovered: { scale: 0, opacity: 0 } }}
                  transition={{ duration: 0.15 }}
                  style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}
                >
                  <Icon size={22} color="#fff" />
                </motion.span>

                {/* Label */}
                <motion.span
                  variants={{ idle: { scale: 0, opacity: 0 }, hovered: { scale: 1, opacity: 1 } }}
                  transition={{ duration: 0.2, delay: 0.12 }}
                  className="font-dm"
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </motion.span>
              </motion.div>
            </Link>

            {/* Glow */}
            <motion.span
              variants={{ idle: { opacity: 0 }, hovered: { opacity: 0.55 } }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 36,
                height: 10,
                borderRadius: 9999,
                filter: "blur(8px)",
                background: `linear-gradient(90deg, ${from}, ${to})`,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        );
      })}
    </nav>
  );
}
