"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  mediaType?: "video" | "image";
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: React.ReactNode;
}

export default function ScrollExpandMedia({
  mediaSrc,
  mediaType = "image",
  posterSrc,
  bgImageSrc,
  title = "MASSISHOOTS",
  date = "Photographe & Vidéaste",
  scrollToExpand = "Scroll pour découvrir",
  textBlend = true,
  children,
}: ScrollExpandMediaProps) {
  const [progress, setProgress] = useState(0);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const isExpanding = useRef(false);

  const titleWords = title.split(" ");
  const word1 = titleWords[0] ?? "";
  const word2 = titleWords.slice(1).join(" ") ?? "";

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  const handleProgress = useCallback((delta: number) => {
    setProgress((prev) => {
      const next = clamp(prev + delta, 0, 1);
      setIsFullyExpanded(next >= 0.99);
      return next;
    });
  }, []);

  // Wheel handler
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (isFullyExpanded) return;
      e.preventDefault();
      handleProgress(e.deltaY / 600);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isFullyExpanded, handleProgress]);

  // Touch handler
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => { startY.current = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (isFullyExpanded || startY.current === null) return;
      e.preventDefault();
      const dy = startY.current - e.touches[0].clientY;
      startY.current = e.touches[0].clientY;
      handleProgress(dy / 400);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [isFullyExpanded, handleProgress]);

  // Eased values
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const ep = easeOut(progress);

  // Media dimensions: from small centered box to fullscreen
  const mediaWidth = `${20 + ep * 80}vw`;
  const mediaHeight = `${30 + ep * 70}vh`;
  const mediaRadius = `${(1 - ep) * 16}px`;

  // Background fade
  const bgOpacity = 1 - ep * 0.85;

  // Title split
  const word1X = `${-ep * 140}px`;
  const word2X = `${ep * 140}px`;
  const titleOpacity = 1 - ep * 1.2;

  // Children fade in after expansion
  const childrenOpacity = Math.max(0, (ep - 0.85) / 0.15);

  // Scroll indicator
  const hintOpacity = 1 - progress * 3;

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", height: "200vh", background: "#0a0a0a" }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgImageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: bgOpacity,
            filter: "brightness(0.35)",
            transition: "opacity 0.05s linear",
          }}
        />

        {/* Dark overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.7) 100%)",
            opacity: bgOpacity,
          }}
        />

        {/* Title — word 1 (left) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(calc(-50% + ${word1X}), -50%)`,
            opacity: Math.max(0, titleOpacity),
            zIndex: 20,
            pointerEvents: "none",
            mixBlendMode: textBlend ? "overlay" : "normal",
            whiteSpace: "nowrap",
            transition: "transform 0.05s linear, opacity 0.05s linear",
          }}
        >
          <span
            className="font-bebas"
            style={{
              fontSize: "clamp(52px, 10vw, 120px)",
              letterSpacing: "0.05em",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {word1}
          </span>
        </div>

        {/* Title — word 2 (right) */}
        {word2 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${word2X}), -50%)`,
              opacity: Math.max(0, titleOpacity),
              zIndex: 20,
              pointerEvents: "none",
              mixBlendMode: textBlend ? "overlay" : "normal",
              whiteSpace: "nowrap",
              transition: "transform 0.05s linear, opacity 0.05s linear",
            }}
          >
            <span
              className="font-bebas"
              style={{
                fontSize: "clamp(52px, 10vw, 120px)",
                letterSpacing: "0.05em",
                color: "#00e5ff",
                lineHeight: 1,
              }}
            >
              {word2}
            </span>
          </div>
        )}

        {/* Date / subtitle */}
        <div
          style={{
            position: "absolute",
            top: "calc(50% + clamp(36px, 7vw, 70px))",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: Math.max(0, titleOpacity * 0.7),
            zIndex: 20,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <span
            className="font-dm"
            style={{ fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}
          >
            {date}
          </span>
        </div>

        {/* Expanding media */}
        <div
          style={{
            position: "relative",
            width: mediaWidth,
            height: mediaHeight,
            borderRadius: mediaRadius,
            overflow: "hidden",
            zIndex: 10,
            boxShadow: `0 0 ${60 + ep * 80}px rgba(0,229,255,${0.08 + ep * 0.12})`,
            transition: "width 0.05s linear, height 0.05s linear, border-radius 0.05s linear",
          }}
        >
          {mediaType === "video" ? (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaSrc}
              alt="Massishoots"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}

          {/* Media overlay gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.5) 100%)",
              opacity: ep,
            }}
          />
        </div>

        {/* Children — appear when fully expanded */}
        {children && (
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: childrenOpacity,
              zIndex: 30,
              pointerEvents: ep > 0.85 ? "auto" : "none",
              textAlign: "center",
              transition: "opacity 0.1s linear",
            }}
          >
            {children}
          </div>
        )}

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: Math.max(0, hintOpacity),
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            pointerEvents: "none",
          }}
        >
          <span
            className="font-dm"
            style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}
          >
            {scrollToExpand}
          </span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(0,229,255,0.6), transparent)", animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  );
}
