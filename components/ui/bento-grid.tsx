"use client";

import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  active?: boolean;
  onClick?: () => void;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className={cn(
            "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
            "border backdrop-blur-sm bento-card",
            "hover:-translate-y-0.5 will-change-transform",
            item.colSpan === 2 ? "col-span-2" : "col-span-1",
            item.active || item.hasPersistentHover
              ? "bento-card-active -translate-y-0.5"
              : "bento-card-idle",
            item.onClick && "cursor-none"
          )}
        >
          {/* Dot grid — visible on hover or when active */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.active || item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          {/* Gradient border */}
          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-white/10 to-transparent transition-opacity duration-300",
              item.active || item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
          />

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  item.active
                    ? "bg-white/15"
                    : "bg-white/8 group-hover:bg-white/12"
                )}
              >
                {item.icon}
              </div>
              {item.status && (
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm transition-colors duration-300",
                    item.active
                      ? "bg-white/15 text-white/90"
                      : "bg-white/8 text-white/50 group-hover:bg-white/12 group-hover:text-white/70"
                  )}
                >
                  {item.status}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3
                className={cn(
                  "font-medium tracking-tight text-[15px] transition-colors duration-300",
                  item.active ? "text-white" : "text-white/70 group-hover:text-white/90"
                )}
              >
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-white/35 font-normal">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm text-white/40 leading-snug group-hover:text-white/55 transition-colors duration-300">
                {item.description}
              </p>
            </div>

            {(item.tags || item.cta) && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-md bg-white/6 text-white/40 backdrop-blur-sm transition-all duration-200 group-hover:bg-white/10 group-hover:text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {item.cta && (
                  <span className="text-xs text-white/35 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.cta}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
