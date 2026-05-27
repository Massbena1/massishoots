"use client";

import { useState, useEffect } from "react";

export interface AccordionService {
  id: number;
  title: string;
  shortLabel: string;
  desc: string;
  price: string;
  tags: string[];
  imageUrl: string;
  imagePosition?: string;
  star?: boolean;
}

interface ImageAccordionProps {
  items: AccordionService[];
  defaultActive?: number;
}

function AccordionItem({
  item,
  isActive,
  onActivate,
  isMobile,
}: {
  item: AccordionService;
  isActive: boolean;
  onActivate: () => void;
  isMobile: boolean;
}) {
  const handlers = isMobile
    ? { onClick: onActivate }
    : { onMouseEnter: onActivate };

  if (isMobile) {
    return (
      <div
        {...handlers}
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          cursor: "pointer",
          border: isActive
            ? "1px solid rgba(196,205,214,0.25)"
            : "1px solid rgba(255,255,255,0.07)",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          height: isActive ? 320 : 56,
        }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: item.imagePosition ?? "center center",
            filter: isActive
              ? "brightness(0.35) saturate(0.5)"
              : "brightness(0.18) saturate(0.2)",
            transition: "filter 0.4s ease",
          }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: isActive
            ? "linear-gradient(180deg, rgba(7,9,13,0.7) 0%, rgba(7,9,13,0.4) 100%)"
            : "rgba(7,9,13,0.6)",
          transition: "background 0.4s ease",
        }} />

        {/* Collapsed: horizontal label */}
        {!isActive && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}>
            <span className="font-bebas" style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>
              {item.shortLabel}
            </span>
            <span className="font-dm" style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.08em",
            }}>
              {item.price}
            </span>
          </div>
        )}

        {/* Expanded: full content */}
        {isActive && (
          <div style={{
            position: "absolute",
            inset: 0,
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            zIndex: 2,
          }}>
            {item.star && (
              <div style={{ marginBottom: 8 }}>
                <span className="font-dm" style={{
                  fontSize: 9,
                  color: "#0a0a0a",
                  fontWeight: 700,
                  padding: "3px 10px",
                  background: "#c4cdd6",
                  borderRadius: 9999,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  ⭐ Populaire
                </span>
              </div>
            )}
            <span className="font-dm" style={{
              fontSize: 10,
              color: "#c4cdd6",
              fontWeight: 600,
              padding: "3px 10px",
              background: "rgba(196,205,214,0.1)",
              border: "1px solid rgba(196,205,214,0.2)",
              borderRadius: 9999,
              letterSpacing: "0.08em",
              display: "inline-block",
              marginBottom: 10,
              alignSelf: "flex-start",
            }}>
              {item.price}
            </span>
            <h3 className="font-bebas" style={{
              fontSize: 32,
              color: "#fff",
              letterSpacing: "0.03em",
              lineHeight: 0.95,
              marginBottom: 8,
            }}>
              {item.title}
            </h3>
            <p className="font-dm" style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              marginBottom: 12,
            }}>
              {item.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {item.tags.map((t) => (
                <span key={t} className="font-dm" style={{
                  padding: "3px 10px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 9999,
                  fontSize: 9,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.06em",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop version (unchanged)
  return (
    <div
      {...handlers}
      style={{
        position: "relative",
        height: 520,
        borderRadius: 20,
        overflow: "hidden",
        cursor: "none",
        flex: isActive ? "1 1 0" : "0 0 64px",
        minWidth: isActive ? 0 : 64,
        transition: "flex 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        border: isActive
          ? "1px solid rgba(196,205,214,0.25)"
          : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.imageUrl}
        alt={item.title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: item.imagePosition ?? "center center",
          filter: isActive
            ? "brightness(0.35) saturate(0.5)"
            : "brightness(0.22) saturate(0.3)",
          transition: "filter 0.6s ease",
        }}
      />
      <div style={{
        position: "absolute",
        inset: 0,
        background: isActive
          ? "linear-gradient(135deg, rgba(7,9,13,0.88) 0%, rgba(7,9,13,0.4) 60%, transparent 100%)"
          : "rgba(7,9,13,0.5)",
        transition: "background 0.6s ease",
      }} />

      {isActive && item.star && (
        <div style={{ position: "absolute", top: 20, right: 20, padding: "4px 12px", background: "#c4cdd6", borderRadius: 9999, zIndex: 2 }}>
          <span className="font-dm" style={{ fontSize: 10, color: "#0a0a0a", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ⭐ Populaire
          </span>
        </div>
      )}

      {!isActive && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="font-bebas" style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            transform: "rotate(90deg)",
            transition: "color 0.3s",
          }}>
            {item.shortLabel}
          </span>
        </div>
      )}

      <div style={{
        position: "absolute",
        inset: 0,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.4s ease",
        zIndex: 2,
        pointerEvents: isActive ? "auto" : "none",
      }}>
        <span className="font-bebas" style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", letterSpacing: "0.25em" }}>
          {String(item.id).padStart(2, "0")}
        </span>
        <div>
          <span className="font-dm" style={{
            fontSize: 11, color: "#c4cdd6", fontWeight: 600,
            padding: "4px 12px", background: "rgba(196,205,214,0.1)",
            border: "1px solid rgba(196,205,214,0.2)", borderRadius: 9999,
            letterSpacing: "0.08em", display: "inline-block", marginBottom: 14,
            backdropFilter: "blur(8px)",
          }}>
            {item.price}
          </span>
          <h3 className="font-bebas" style={{ fontSize: "clamp(32px, 4vw, 44px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 0.95, marginBottom: 12 }}>
            {item.title}
          </h3>
          <p className="font-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 18, maxWidth: 360 }}>
            {item.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.tags.map((t) => (
              <span key={t} className="font-dm" style={{
                padding: "4px 12px", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999,
                fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em",
                backdropFilter: "blur(8px)",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageAccordion({ items, defaultActive = 0 }: ImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? 8 : 8,
      alignItems: "stretch",
      width: "100%",
    }}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onActivate={() => setActiveIndex(index)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
