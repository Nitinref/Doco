"use client";

import { ArrowRight, Boxes, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense, lazy, useState } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering,
  })),
);

type CTASectionProps = {
  badge?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

export function CTASection({
  badge = "Doco deployment engine",
  title = "Your containers,",
  titleAccent = "delivered perfectly.",
  description = "Launch Docker images, watch live inventory, and route every workload through a frontend that feels precise, fast, and unmistakably yours.",
  primaryCtaHref = "/deploy",
  primaryCtaLabel = "Start deploying",
  secondaryCtaHref = "#inventory",
  secondaryCtaLabel = "See live containers",
}: CTASectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#111111]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Suspense
        fallback={<div className="absolute inset-0 bg-[rgba(29,99,237,0.08)]" />}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-55 mix-blend-screen">
          <Dithering
            colorBack="#00000000"
            colorFront="#1D63ED"
            shape="warp"
            type="4x4"
            speed={isHovered ? 0.6 : 0.2}
            className="size-full"
            minPixelRatio={1}
          />
        </div>
      </Suspense>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(29,99,237,0.08),transparent_34%),linear-gradient(180deg,rgba(13,10,9,0.18),rgba(13,10,9,0.58))]" />

      <div className="absolute left-4 top-4 z-10 hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur md:left-8 md:top-8 md:inline-flex">
        <Boxes className="h-4 w-4 text-blue-400" />
        Multi-container control room
      </div>

      <div className="absolute right-4 top-4 z-10 hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur md:right-8 md:top-8 md:inline-flex">
        <Sparkles className="h-4 w-4 text-blue-400" />
        Reverse-proxy aware
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center md:px-10">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
          </span>
          {badge}
        </div>

        <h1 className="font-serif text-5xl font-medium leading-[1.02] tracking-tight text-white md:text-7xl lg:text-[7.5rem]">
          {title}
          <br />
          <span className="text-white/80">{titleAccent}</span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
          {description}
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1D63ED] px-10 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:ring-4 hover:ring-blue-500/20 active:scale-95"
            href={primaryCtaHref}
          >
            <span className="relative z-10">{primaryCtaLabel}</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href={secondaryCtaHref}
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-base font-medium text-white/85 transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95"
          >
            {secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}