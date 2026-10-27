import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteNav } from "@/components/Layout";

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("loaded")));
    return () => cancelAnimationFrame(id);
  }, []);

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
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
      <path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

export function CtaLink({ to, children, className = "btn btn-dark btn-sm" }: { to: string; children: ReactNode; className?: string }) {
  return /^https?:/.test(to) ? (
    <a href={to} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className}>
      {children}
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
        <button className="close" onClick={onClose} aria-label="Fermer la galerie">×</button>
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

/** Builds a WhatsApp message from the form and opens the chat with PAG. */
export function ContactForm({ whatsapp, topics }: { whatsapp: string; topics: string[] }) {
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    if (!v("name") || !v("message")) {
      setError("Indiquez votre nom et votre message.");
      return;
    }
    setError("");
    const lines = ["Bonjour Pénielle Art Graphic,", "", `Nom : ${v("name")}`, v("phone") ? `Téléphone : ${v("phone")}` : "", v("topic") ? `Sujet : ${v("topic")}` : "", "", v("message")].filter(
      (l, i, all) => l !== "" || (i > 0 && all[i - 1] !== ""),
    );
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="form-card">
      <h3>Écrivez-nous sur WhatsApp</h3>
      <form onSubmit={submit} noValidate>
        <label>Nom<input name="name" autoComplete="name" required placeholder="Votre nom" /></label>
        <div className="two">
          <label>Téléphone<input name="phone" type="tel" autoComplete="tel" placeholder="+229 …" /></label>
          <label>Sujet
            <select name="topic" defaultValue="">
              <option value="">À préciser</option>
              {topics.map((t) => <option key={t} value={t}>{t}</option>)}
              <option value="Autre demande">Autre demande</option>
            </select>
          </label>
        </div>
        <label>Message<textarea name="message" rows={4} required placeholder="Décrivez votre demande" /></label>
        {error ? <p role="alert" className="err">{error}</p> : null}
        <button type="submit" className="btn btn-dark">Envoyer sur WhatsApp</button>
      </form>
      <p className="hint">Votre message s'ouvre dans WhatsApp, prêt à être envoyé.</p>
    </div>
  );
}
