import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { lockScroll, onScroll } from "@/lib/smooth-scroll";

export type StackItem = { title: string; meta: string; src: string; alt: string; position?: string };
export type GalleryPhoto = { src: string; alt: string; w?: number; h?: number };
export type Category = {
  id: string;
  title: string;
  tags: string[];
  body: string;
  cover: string;
  coverAlt: string;
  photos: GalleryPhoto[];
};

const smooth = (x: number) => x * x * (3 - 2 * x);

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Slide({ item, index, total }: { item: StackItem; index: number; total: number }) {
  return (
    <>
      <img
        src={item.src}
        alt={item.alt}
        decoding="async"
        loading="lazy"
        className={cn("absolute inset-0 h-full w-full object-cover", item.position ?? "object-[center_30%]")}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 via-night/40 to-transparent p-5 pt-24 text-paper md:p-8 md:pt-32">
        <p className="text-xs font-medium tracking-wide text-paper/70">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{item.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/80">{item.meta}</p>
      </div>
    </>
  );
}

/**
 * Left: intro and call to action. Right: one big card at a time. While the page scrolls, the
 * current card leaves upward and the next one rises in. After the last card the page carries on.
 */
export function PinnedCards({ items, intro }: { items: StackItem[]; intro: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const labels = useRef<(HTMLLIElement | null)[]>([]);
  const [flat, setFlat] = useState(false);
  const total = items.length;

  useEffect(() => {
    if (reducedMotion()) setFlat(true);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el || flat) return;
    const tick = () => {
      const vh = window.innerHeight || 1;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), (total - 1) * vh);
      const raw = scrolled / vh;
      const base = Math.floor(raw);
      const q = base + smooth(raw - base);
      cards.current.forEach((card, i) => {
        if (!card) return;
        const t = q - i;
        if (t <= -1 || t >= 1) {
          card.style.visibility = "hidden";
          return;
        }
        card.style.visibility = "visible";
        const leaving = t > 0 ? t : 0;
        card.style.transform = `translate3d(0, ${(-t * 100).toFixed(2)}%, 0) scale(${(1 - leaving * 0.06).toFixed(4)})`;
        card.style.opacity = String(t > 0 ? 1 - leaving * 0.7 : i === 0 ? 1 : 0.6 + (1 + t) * 0.4);
        card.style.zIndex = String(t < 0 ? 2 : 1);
      });
      labels.current.forEach((label, i) => {
        if (label) label.style.opacity = String(Math.abs(q - i) < 0.5 ? 1 : 0.35);
      });
    };
    tick();
    return onScroll(tick);
  }, [flat, total]);

  if (flat) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-16 md:px-10">
        <div className="max-w-md">{intro}</div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item, i) => (
            <article key={item.title} className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-night">
              <Slide item={item} index={i} total={total} />
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrap} className="relative" style={{ height: `${(total + 0.35) * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="mx-auto grid h-full max-w-6xl grid-rows-[auto_minmax(0,1fr)] gap-5 px-5 pt-24 pb-5 md:grid-cols-[0.8fr_1.2fr] md:grid-rows-1 md:gap-10 md:px-10 md:py-24">
          <div className="flex flex-col justify-center">
            {intro}
            <ol className="mt-10 hidden space-y-2 text-sm font-medium md:block">
              {items.map((item, i) => (
                <li
                  key={item.title}
                  ref={(node) => {
                    labels.current[i] = node;
                  }}
                  className="flex items-center gap-3 transition-opacity duration-300"
                >
                  <span className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {item.title}
                </li>
              ))}
            </ol>
          </div>
          <div className="relative min-h-0 overflow-hidden rounded-3xl">
            {items.map((item, i) => (
              <article
                key={item.title}
                ref={(node) => {
                  cards.current[i] = node;
                }}
                className="absolute inset-0 overflow-hidden rounded-3xl bg-night will-change-transform"
                style={{ visibility: i === 0 ? "visible" : "hidden" }}
              >
                <Slide item={item} index={i} total={total} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Full-screen gallery for one category, with a simple lightbox. */
export function CategoryGallery({ category, onClose }: { category: Category; onClose: () => void }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = category.photos.length;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    lockScroll(true);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      lockScroll(false);
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (active !== null) setActive(null);
        else onClose();
      } else if (active !== null && event.key === "ArrowRight") setActive((active + 1) % count);
      else if (active !== null && event.key === "ArrowLeft") setActive((active - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, count, onClose]);

  const photo = active !== null ? category.photos[active] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={category.title}
      data-lenis-prevent
      className="menu-drop fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-paper"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-paper/90 px-5 py-4 backdrop-blur md:px-10">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">{category.title}</p>
          <p className="text-xs text-muted">{count} photos</p>
        </div>
        <button
          ref={closeRef}
          type="button"
          aria-label="Fermer la galerie"
          onClick={onClose}
          className="press grid size-11 shrink-0 place-items-center rounded-full bg-night text-paper"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="mx-auto max-w-6xl columns-2 gap-3 px-5 pt-4 pb-16 md:columns-3 md:gap-4 md:px-10">
        {category.photos.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Agrandir la photo ${i + 1} sur ${count}`}
            className="shot mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-mist md:mb-4"
          >
            <img
              src={shot.src}
              alt={shot.alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </button>
        ))}
      </div>

      {photo ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-night/95 p-4" onClick={() => setActive(null)}>
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[90svh] max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Fermer l'image"
            onClick={() => setActive(null)}
            className="press absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={(event) => {
              event.stopPropagation();
              setActive(((active ?? 0) - 1 + count) % count);
            }}
            className="press absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={(event) => {
              event.stopPropagation();
              setActive(((active ?? 0) + 1) % count);
            }}
            className="press absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
