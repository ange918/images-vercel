import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { onScroll } from "@/lib/smooth-scroll";

const STEPS = [0.36, 0.78, 0.5, 1, 0.64, 0.3, 0.9, 0.55, 0.82, 0.42, 0.7, 0.26, 0.94, 0.6];

function motionOff() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
    };
    tick();
    return onScroll(tick);
  }, []);
  return <div ref={ref} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent will-change-transform" />;
}

export function DotLink({
  href,
  onClick,
  children,
  tone = "accent",
  as,
}: {
  as?: "link";
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  tone?: "accent" | "paper" | "night";
}) {
  const className = "press group inline-flex items-center gap-3 text-sm font-medium";
  const disc = (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:scale-105",
        tone === "accent" && "bg-accent text-paper",
        tone === "paper" && "bg-paper text-ink",
        tone === "night" && "bg-night text-paper",
      )}
    >
      <ArrowUpRight className="size-4" />
    </span>
  );
  if (href && as === "link") {
    return (
      <Link to={href} onClick={onClick} className={className}>
        {disc}
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {disc}
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {disc}
      {children}
    </button>
  );
}

export function Meta({ label, index }: { label: string; index: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-8 text-xs text-muted md:px-10">
      <span className="inline-flex items-center gap-2 font-medium text-ink">
        <i className="size-1.5 rounded-sm bg-accent" />
        {label}
      </span>
      <span className="hidden font-medium tracking-wide sm:block">(PAG — {index})</span>
      <span>©2026</span>
    </div>
  );
}

export function Rise({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (motionOff()) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cn("rise", on && "rise-on", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function StepEdge() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (motionOff()) {
      el.style.setProperty("--p", "1");
      return;
    }
    // Measured from the section's own top edge, so nothing moves until that section scrolls into view.
    const section = el.parentElement ?? el;
    const tick = () => {
      const top = section.getBoundingClientRect().top;
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.72)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    tick();
    return onScroll(tick);
  }, []);
  return (
    <div ref={ref} aria-hidden className="step-edge pointer-events-none absolute inset-x-0 -top-56 flex items-end">
      {STEPS.map((h, i) => (
        <span key={i} className="step-bar bg-paper" style={{ "--h": h } as CSSProperties} />
      ))}
    </div>
  );
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (motionOff()) {
      el.textContent = `${to}${suffix}`;
      return;
    }
    let shown = -1;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, (vh * 1.02 - rect.top) / (vh * 0.62)));
      const value = Math.round(to * (1 - (1 - p) ** 2));
      if (value === shown) return;
      shown = value;
      el.textContent = `${value}${suffix}`;
    };
    tick();
    return onScroll(tick);
  }, [to, suffix]);
  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line">
      <div className="marquee flex w-max items-center gap-14 py-6 md:gap-20">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className={cn(
              "px-2 text-lg font-semibold tracking-tight md:text-2xl",
              i % 3 === 1 && "font-medium italic",
              i % 5 === 2 && "text-base font-medium uppercase tracking-widest",
            )}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StoryRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pause = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || motionOff()) return;
    let frame = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      if (pause.current) {
        pos = el.scrollLeft;
      } else {
        pos += dt * 0.033;
        const half = el.scrollWidth / 2;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div
      ref={ref}
      className="hide-bar flex gap-4 overflow-x-auto px-5 pb-2 md:px-10"
      onMouseEnter={() => {
        pause.current = true;
      }}
      onMouseLeave={() => {
        pause.current = false;
      }}
      onPointerDown={() => {
        pause.current = true;
      }}
      onPointerUp={() => {
        pause.current = false;
      }}
    >
      {children}
    </div>
  );
}

export function Bleed({
  src,
  alt,
  className,
  position = "object-center",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const img = el?.querySelector("img");
    if (!el || !img || motionOff()) return;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.bottom < -vh * 0.2 || rect.top > vh * 1.2) return;
      const p = (vh - rect.top) / (vh + rect.height);
      const y = (p - 0.5) * 36;
      img.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(1.08)`;
    };
    tick();
    return onScroll(tick);
  }, []);
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-night", className)}>
      <img
        src={src}
        alt={alt}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("absolute inset-0 h-full w-full object-cover will-change-transform", position)}
      />
    </div>
  );
}

export function PinnedBleed({
  src,
  alt,
  position,
  priority = false,
  children,
}: {
  src: string;
  alt: string;
  position?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="sticky top-0 z-0 h-[100svh] min-h-[520px] overflow-hidden bg-night">
      <Bleed src={src} alt={alt} position={position} priority={priority} className="h-full" />
      {children}
    </div>
  );
}
