"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => { newState[parseInt(key)] = false; });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const related = timelineData.find((i) => i.id === id)?.relatedIds ?? [];
        const pulse: Record<number, boolean> = {};
        related.forEach((r) => { pulse[r] = true; });
        setPulseEffect(pulse);
        // center on node
        const idx = timelineData.findIndex((i) => i.id === id);
        setRotationAngle(270 - (idx / timelineData.length) * 360);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate) return;
    const t = setInterval(() => setRotationAngle((p) => Number(((p + 0.3) % 360).toFixed(3))), 50);
    return () => clearInterval(t);
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const getRelatedItems = (id: number) => timelineData.find((i) => i.id === id)?.relatedIds ?? [];
  const isRelatedToActive = (id: number) => !!activeNodeId && getRelatedItems(activeNodeId).includes(id);

  const getStatusStyles = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":   return "text-black bg-[#00e5ff] border-[#00e5ff]";
      case "in-progress": return "text-[#00e5ff] bg-transparent border-[#00e5ff]";
      case "pending":     return "text-white/60 bg-black/40 border-white/30";
    }
  };

  const getStatusLabel = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":   return "TERMINÉ";
      case "in-progress": return "EN COURS";
      case "pending":     return "À VENIR";
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
        >
          {/* Center orb */}
          <div className="absolute w-16 h-16 rounded-full flex items-center justify-center z-10"
            style={{ background: "linear-gradient(135deg, #00e5ff, rgba(0,229,255,0.3))", animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}>
            <div className="absolute w-20 h-20 rounded-full border border-[#00e5ff]/20 animate-ping opacity-70" />
            <div className="absolute w-24 h-24 rounded-full border border-[#00e5ff]/10 animate-ping opacity-50" style={{ animationDelay: "0.5s" }} />
            <div className="w-8 h-8 rounded-full" style={{ background: "rgba(0,229,255,0.9)", backdropFilter: "blur(4px)" }} />
          </div>

          {/* Orbit ring */}
          <div className="absolute w-96 h-96 rounded-full border border-white/10" />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Energy glow */}
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(0,229,255,0.2) 0%, rgba(0,229,255,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Node icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isExpanded
                    ? "bg-[#00e5ff] text-black border-[#00e5ff] scale-150 shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                    : isRelated
                    ? "bg-[#00e5ff]/30 text-[#00e5ff] border-[#00e5ff] animate-pulse"
                    : "bg-black text-white border-white/40 hover:border-[#00e5ff] hover:text-[#00e5ff]"
                }`}>
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 font-bebas ${
                  isExpanded ? "text-[#00e5ff] scale-125" : "text-white/70"
                }`} style={{ left: "50%", transform: `translateX(-50%) ${isExpanded ? "scale(1.25)" : "scale(1)"}` }}>
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 backdrop-blur-lg shadow-xl overflow-visible"
                    style={{ background: "rgba(10,10,10,0.95)", borderColor: "rgba(0,229,255,0.3)", boxShadow: "0 0 30px rgba(0,229,255,0.1)" }}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#00e5ff]/50" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </Badge>
                        <span className="text-xs font-mono text-white/40">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white font-dm">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/70 font-dm">
                      <p>{item.content}</p>
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center gap-1 text-white/50">
                            <Zap size={10} />
                            Impact
                          </span>
                          <span className="font-mono text-[#00e5ff]">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                          <div className="h-full rounded-full" style={{ width: `${item.energy}%`, background: "linear-gradient(to right, #00e5ff, rgba(0,229,255,0.5))" }} />
                        </div>
                      </div>
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/50 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/50">Étapes liées</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relId) => {
                              const rel = timelineData.find((i) => i.id === relId);
                              return (
                                <Button key={relId} variant="outline" size="sm"
                                  className="h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-[#00e5ff]/10 text-white/70 hover:text-[#00e5ff] hover:border-[#00e5ff] transition-all"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relId); }}>
                                  {rel?.title}
                                  <ArrowRight size={8} className="ml-1" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
