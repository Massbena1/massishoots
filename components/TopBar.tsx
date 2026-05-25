"use client";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function TopBar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    const localePrefix = `/${locale}`;
    const currentPath = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : "/";
    router.replace(currentPath, { locale: next });
  };

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 99,
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
        style={{
          fontSize: 16,
          letterSpacing: "0.22em",
          color: "#fff",
          textDecoration: "none",
          pointerEvents: "auto",
          opacity: 0.9,
        }}
      >
        MASSISHOOTS
      </Link>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, pointerEvents: "auto" }}>
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
      </div>
    </header>
  );
}
