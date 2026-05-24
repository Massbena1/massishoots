"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full z-0",
        className
      )}
      style={{ background: "#0a0a0a" }}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: "conic-gradient(from 70deg at center top, #c4cdd6, transparent, transparent)",
            position: "absolute",
            inset: "auto",
            right: "50%",
            height: "14rem",
            overflow: "visible",
          }}
          className="w-[30rem]"
        >
          <div className="absolute w-full left-0 h-40 bottom-0 z-20"
            style={{ background: "#0a0a0a", maskImage: "linear-gradient(to top, white, transparent)", WebkitMaskImage: "linear-gradient(to top, white, transparent)" }} />
          <div className="absolute w-40 h-full left-0 bottom-0 z-20"
            style={{ background: "#0a0a0a", maskImage: "linear-gradient(to right, white, transparent)", WebkitMaskImage: "linear-gradient(to right, white, transparent)" }} />
        </motion.div>

        {/* Right conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, #c4cdd6)",
            position: "absolute",
            inset: "auto",
            left: "50%",
            height: "14rem",
          }}
          className="w-[30rem]"
        >
          <div className="absolute w-40 h-full right-0 bottom-0 z-20"
            style={{ background: "#0a0a0a", maskImage: "linear-gradient(to left, white, transparent)", WebkitMaskImage: "linear-gradient(to left, white, transparent)" }} />
          <div className="absolute w-full right-0 h-40 bottom-0 z-20"
            style={{ background: "#0a0a0a", maskImage: "linear-gradient(to top, white, transparent)", WebkitMaskImage: "linear-gradient(to top, white, transparent)" }} />
        </motion.div>

        {/* Blur layers */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" style={{ background: "#0a0a0a" }} />
        <div className="absolute top-1/2 z-50 h-48 w-full opacity-10 backdrop-blur-md" style={{ background: "transparent" }} />

        {/* Glow orb */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(196,205,214,0.2)" }} />

        {/* Inner bright spot */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 -translate-y-24 rounded-full blur-2xl"
          style={{ background: "rgba(196,205,214,0.35)" }}
        />

        {/* Horizontal line */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-28"
          style={{ background: "#c4cdd6" }}
        />

        {/* Cover bar */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]" style={{ background: "#0a0a0a" }} />
      </div>

      {/* Content slot */}
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
