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
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "10px 8px 20px",
        background: "rgba(6,8,12,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {ITEMS.map(({ label, icon: Icon, href, from, to }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            style={{ textDecoration: "none" }}
            onClick={(e) => handleClick(e, href)}
          >
            <motion.div
              whileTap={{ scale: 0.88 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "8px 12px",
                borderRadius: 16,
                background: active ? `linear-gradient(135deg, ${from}33, ${to}33)` : "transparent",
                border: active ? `1px solid ${from}44` : "1px solid transparent",
                transition: "background 0.25s, border 0.25s",
                minWidth: 56,
              }}
            >
              <Icon
                size={20}
                color={active ? "#fff" : "rgba(255,255,255,0.4)"}
                style={{ transition: "color 0.25s" }}
              />
              <span
                className="font-dm"
                style={{
                  fontSize: 10,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#fff" : "rgba(255,255,255,0.4)",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                  transition: "color 0.25s",
                }}
              >
                {label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
