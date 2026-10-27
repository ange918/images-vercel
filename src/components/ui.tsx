import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, X, type LucideIcon } from "lucide-react";
import { SiteNav } from "@/components/Layout";
import { useHeroLoaded } from "@/lib/useHeroLoaded";

/** Giant background word, split in letters so they rise one after the other. */
export function GiantWord({ word }: { word: string }) {
  return (
    <div className="hero-giant" aria-hidden="true">
      {[...word].map((c, i) => (
        <span key={i} style={{ "--i": i } as CSSProperties}>
          {c === " " ? " " : c}
        </span>
      ))}
    </div>
  );
}

export function Hero({
  image,
  small,
  word,
  text,
  short = false,
  position = "center 30%",
  children,
}: {
  image: string;
  small: ReactNode;
  word: string;
  text: string;
  short?: boolean;
  position?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useHeroLoaded(ref);

  useEffect(() => {
    const onScroll = () => stage.current?.style.setProperty("--p", String(Math.min(window.scrollY, 900)));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className={`hero${short ? " short" : ""}`}>
      <SiteNav />
      <div ref={stage} className="hero-stage">
        <div className="backdrop" style={{ backgroundImage: `url(${image})`, backgroundPosition: position }} />
        <h1 className="hero-small">{small}</h1>
        <GiantWord word={word} />
        <p className="hero-text">{text}</p>
        {children ? <div className="hero-bottom">{children}</div> : null}
      </div>
    </section>
  );
}

export function Head({ title, text, eyebrow }: { title: ReactNode; text?: string; eyebrow?: string }) {
  return (
    <div className="head">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
      </div>
      {text ? <p className="small">{text}</p> : null}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {row.map((name, i) => (
          <span key={`${name}-${i}`}>{name}</span>
        ))}
      </div>
    </div>
  );
}

export function Bars({ seed, rising = false }: { seed: number; rising?: boolean }) {
  const heights = useMemo(() => {
    let s = seed * 97;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 10 }, (_, i) => (rising ? 25 + i * 7 + rnd() * 8 : 30 + rnd() * 70));
  }, [seed, rising]);
  return (
    <div className="bars">
      {heights.map((h, i) => (
        <i key={i} style={{ height: `${h}%`, "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}

export function Arrow({ dir }: { dir: "l" | "r" }) {
  return dir === "l" ? <ChevronLeft size={18} color="#fff" /> : <ChevronRight size={18} color="#fff" />;
}

/** Round icon badge that pops in when its card is revealed. */
export function Ico({ icon: Icon, size = 18, className = "" }: { icon: LucideIcon; size?: number; className?: string }) {
  return (
    <span className={`ico ${className}`} aria-hidden="true">
      <Icon size={size} strokeWidth={1.8} />
    </span>
  );
}

export function CtaLink({ to, children, className = "btn btn-dark btn-sm" }: { to: string; children: ReactNode; className?: string }) {
  return /^https?:/.test(to) ? (
    <a href={to} target="_blank" rel="noreferrer" className={className}>
      {children}
      <ArrowRight size={14} />
    </a>
  ) : (
    <Link to={to} className={className}>
      {children}
      <ArrowRight size={14} />
    </Link>
  );
}

/** Photo gallery in a modal, with a lightbox. */
export function GalleryModal({ title, photos, onClose }: { title: string; photos: { src: string; alt: string }[]; onClose: () => void }) {
  const [active, setActive] = useState<number | null>(null);
  const count = photos.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (active !== null) setActive(null);
        else onClose();
      } else if (active !== null && e.key === "ArrowRight") setActive((active + 1) % count);
      else if (active !== null && e.key === "ArrowLeft") setActive((active - 1 + count) % count);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, count, onClose]);

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-label={title} data-lenis-prevent>
        <button className="close" onClick={onClose} aria-label="Fermer la galerie"><X size={22} /></button>
        <h3>{title} · {count} photos</h3>
        <div className="masonry">
          {photos.map((p, i) => (
            <img key={p.src} src={p.src} alt={p.alt} loading="lazy" referrerPolicy="no-referrer" onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
      {active !== null ? (
        <div className="lightbox" onClick={() => setActive(null)}>
          <img src={photos[active]!.src} alt={photos[active]!.alt} referrerPolicy="no-referrer" onClick={(e) => e.stopPropagation()} />
          <button style={{ top: 16, right: 16 }} aria-label="Fermer l'image" onClick={() => setActive(null)}>×</button>
          <button style={{ left: 16, top: "50%" }} aria-label="Photo précédente" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + count) % count); }}>‹</button>
          <button style={{ right: 16, top: "50%" }} aria-label="Photo suivante" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % count); }}>›</button>
        </div>
      ) : null}
    </div>
  );
}
