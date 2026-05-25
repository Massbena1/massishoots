"use client";

import { useId } from "react";
import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

interface SparklesProps {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  options?: Partial<ISourceOptions>;
}

async function initEngine(engine: Engine) {
  await loadSlim(engine);
}

function SparklesContent({
  id,
  particleOptions,
  className,
}: {
  id: string;
  particleOptions: ISourceOptions;
  className?: string;
}) {
  const { loaded } = useParticlesProvider();
  if (!loaded) return null;
  return <Particles id={id} options={particleOptions} className={className} />;
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
}: SparklesProps) {
  const id = useId();

  const defaultOptions: ISourceOptions = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 120,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        direction: "none",
        speed: { min: minSpeed ?? speed / 10, max: speed },
        straight: false,
      },
      number: { value: density },
      opacity: {
        value: { min: minOpacity ?? opacity / 10, max: opacity },
        animation: { enable: true, sync: false, speed: opacitySpeed },
      },
      size: { value: { min: minSize ?? size / 2.5, max: size } },
    },
    detectRetina: true,
    ...options,
  };

  return (
    <ParticlesProvider init={initEngine}>
      <SparklesContent id={id} particleOptions={defaultOptions} className={className} />
    </ParticlesProvider>
  );
}
