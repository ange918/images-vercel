import type { ReactNode } from "react";
import { PinnedBleed, StepEdge } from "@/components/bits";

/** Pinned photo with a big title, then a white sheet that slides over it (same pattern as the home page). */
export function PageHero({
  src,
  alt,
  kicker,
  title,
  lead,
  position,
  children,
}: {
  src: string;
  alt: string;
  kicker: string;
  title: string;
  lead?: string;
  position?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <PinnedBleed priority src={src} alt={alt} position={position}>
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-night/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 pb-[15svh] md:p-10 md:pb-[13svh]">
          <p className="max-w-sm text-xs leading-relaxed text-paper md:text-sm">{kicker}</p>
          <h1 className="mt-3 font-semibold leading-[0.85] tracking-tighter text-paper" style={{ fontSize: "clamp(2.6rem, 10vw, 9rem)" }}>
            {title}
            <span className="text-[#93c5fd]">*</span>
          </h1>
          {lead ? <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper/85">{lead}</p> : null}
        </div>
      </PinnedBleed>
      <div className="relative z-10 bg-paper">
        <StepEdge />
        {children}
      </div>
    </div>
  );
}

export function SectionTitle({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-5 text-center">
      <h2 className="text-display font-semibold">{title}</h2>
      {text ? <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">{text}</p> : null}
    </div>
  );
}
