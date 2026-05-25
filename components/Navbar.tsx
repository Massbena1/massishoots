"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const NAV_LINKS = [
  { key: "services",  href: "/services",  sectionId: "services",  homeScroll: true  },
  { key: "portfolio", href: "/portfolio", sectionId: "portfolio", homeScroll: true  },
  { key: "about",     href: "/about",     sectionId: null,        homeScroll: false },
] as const;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScroll(target: number, duration = 800) {
  const start = window.scrollY;
  const distance = target - start;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Detect if we're on the home page (with locale prefix)
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!isHome) { setActiveSection(null); return; }
    const ids = NAV_LINKS.map(l => l.sectionId).filter(Boolean) as string[];
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isHome]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: typeof NAV_LINKS[number]
  ) => {
    if (isHome && link.homeScroll && link.sectionId) {
      e.preventDefault();
      const el = document.getElementById(link.sectionId);
      if (!el) return;
      const navOffset = 96;
      const target = el.getBoundingClientRect().top + window.scrollY - navOffset;
      smoothScroll(target, 900);
    }
  };

  const isActive = (link: typeof NAV_LINKS[number]) => {
    if (isHome && link.sectionId && activeSection) return activeSection === link.sectionId;
    return pathname.includes(link.href);
  };

  const switchLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    // Get current path without locale prefix
    const localePrefix = `/${locale}`;
    const currentPath = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : "/";
    router.replace(currentPath, { locale: next });
  };

  return (
    <>
      {/* Desktop floating pill — mobile handled by GradientMenu + TopBar */}
      <nav className="hidden md:flex" style={{
        position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100,
      }}>
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex", alignItems: "center", gap: 2,
            padding: "5px 5px 5px 18px", borderRadius: 9999,
            background: "rgba(6,8,12,0.92)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.1) inset, 0 1px 0 rgba(255,255,255,0.06) inset"
              : "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
          }}
        >
          {/* Logo */}
          <Link href="/" className="font-bebas" style={{
            fontSize: 15, letterSpacing: "0.2em", color: "#fff",
            textDecoration: "none", marginRight: 6, whiteSpace: "nowrap",
          }}>
            MASSISHOOTS
          </Link>

          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />
          <AnimatedThemeToggler />
          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />

          {/* Nav links */}
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l)}
              className="font-dm"
              style={{
                fontSize: 12.5,
                color: isActive(l) ? "#fff" : "rgba(255,255,255,0.5)",
                textDecoration: "none", letterSpacing: "0.03em",
                padding: "6px 14px", borderRadius: 9999,
                transition: "color 0.2s, background 0.2s", whiteSpace: "nowrap",
                fontWeight: isActive(l) ? 600 : 400,
                background: isActive(l) ? "rgba(255,255,255,0.13)" : "transparent",
              }}
            >
              {t(l.key)}
            </Link>
          ))}

          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 2px 0 4px" }} />

          {/* Locale switcher */}
          <button
            onClick={switchLocale}
            className="font-dm"
            style={{
              fontSize: 11, letterSpacing: "0.12em", fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              padding: "6px 10px", borderRadius: 9999, border: "none",
              background: "transparent", cursor: "pointer",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c4cdd6")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="font-dm"
            style={{
              padding: "8px 18px", background: "#f2f0ec", color: "#0a0a0a",
              borderRadius: 9999, fontSize: 12.5, fontWeight: 700,
              textDecoration: "none", letterSpacing: "0.05em",
              marginLeft: 2, whiteSpace: "nowrap", display: "inline-block",
            }}
          >
            {t("book")}
          </Link>
        </motion.div>
      </nav>

    </>
  );
}
