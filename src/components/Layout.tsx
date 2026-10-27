import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/cn";
import { onScroll, startSmoothScroll } from "@/lib/smooth-scroll";
import { ScrollProgress } from "@/components/bits";
import { NAV, SITE_NAME, SOCIALS } from "@/data/site";
import { PAG_FACTS, CAMPUSES_DATA } from "@/data/pagData";

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <i className={cn("absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
      <i className={cn("absolute top-1.5 left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200", open && "scale-x-0 opacity-0")} />
      <i className={cn("absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
    </span>
  );
}

function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-x-0 top-[4.75rem] bottom-0 z-30">
      <button type="button" aria-label="Fermer le menu" className="absolute inset-0 bg-night/30" onClick={onClose} />
      <nav id="site-menu" aria-label="Navigation principale" className="menu-drop absolute inset-x-3 top-0 rounded-3xl bg-paper p-5 text-ink shadow-2xl md:inset-x-auto md:right-10 md:w-96">
        <ul>
          {NAV.map((item, i) => (
            <li key={item.to} className="menu-in border-b border-line last:border-b-0" style={{ animationDelay: `${60 + i * 45}ms` }}>
              <NavLink to={item.to} end={item.to === "/"} onClick={onClose} className="group flex items-baseline gap-4 py-3">
                {({ isActive }) => (
                  <>
                    <span className="text-xs text-muted">{item.n}</span>
                    <span className={cn("text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1.5", isActive && "underline decoration-2 underline-offset-4")}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted">{PAG_FACTS.citiesLabel} · {PAG_FACTS.rentree.short}</p>
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-paper px-5 pt-8 pb-6 md:px-10">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <ul className="space-y-3 text-sm">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="inline-flex gap-3 hover:underline">
                <span className="text-muted">{item.n}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-3 text-sm">
          {CAMPUSES_DATA.map((campus) => (
            <p key={campus.id} className="max-w-xs text-muted">
              <span className="font-medium text-ink">{campus.name.split(" (")[0]}</span>
              <br />
              {campus.quarter}
            </p>
          ))}
        </div>
        <ul className="space-y-3 text-sm">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted">©2026 {SITE_NAME}</p>
      </div>
      <div className="mt-12 border-t border-line pt-6">
        <p className="font-extrabold whitespace-nowrap" style={{ fontSize: "clamp(2.2rem, 10.5vw, 9rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}>
          PÉNIELLE ART GRAPHIC
        </p>
      </div>
    </footer>
  );
}

export function Layout() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    const tick = () => setSolid(window.scrollY > window.innerHeight * 0.62);
    tick();
    return onScroll(tick);
  }, [pathname]);

  return (
    <div className="bg-paper text-ink">
      <ScrollProgress />
      <header className={cn("fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 transition-colors duration-300 md:px-10", solid ? "bg-paper/85 text-ink backdrop-blur" : "text-paper")}>
        <Link to="/" className="text-sm font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          className={cn("press grid size-11 place-items-center rounded-full transition-colors duration-300", solid || open ? "bg-night text-paper" : "bg-paper/15 text-paper backdrop-blur")}
          onClick={() => setOpen((v) => !v)}
        >
          <Burger open={open} />
        </button>
      </header>
      <Menu open={open} onClose={close} />
      <main key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
