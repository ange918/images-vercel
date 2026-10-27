import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { RequestsProvider, useRequests } from "@/components/Requests";
import { scrollTopNow, setLenis } from "@/lib/scroll";
import { NAV, SITE_NAME, SOCIALS } from "@/data/site";
import { CAMPUSES_DATA } from "@/data/pagData";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { openRegistration } = useRequests();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <nav className="nav">
      <Link to="/" className="logo">PÉNIELLE<b>ART GRAPHIC</b></Link>
      <ul className="pill-nav">
        {NAV.map((item, i) => (
          <li key={item.to} style={{ "--i": i } as React.CSSProperties}>
            <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="btn btn-dark btn-sm" onClick={() => openRegistration()}>S'inscrire<ArrowUpRight size={14} /></button>
        <button className="burger" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "×" : "☰"}
        </button>
      </div>
      {open ? (
        <div className="mobile-menu">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              <small>{item.n}</small>{item.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </nav>
  );
}

function Footer() {
  const { openRegistration } = useRequests();
  return (
    <>
      <section className="cta-block">
        <div className="cta-card">
          <h2>Prêt à donner vie à votre<br />projet créatif ?</h2>
          <p>Inscrivez-vous à la prochaine rentrée ou contactez l'agence pour un devis.</p>
          <button className="btn btn-dark btn-sm" onClick={() => openRegistration()}>S'inscrire<ArrowUpRight size={14} /></button>
          <Link to="/contact" className="btn btn-line btn-sm">Nous contacter</Link>
        </div>
      </section>
      <footer className="footer">
        <div className="cols">
          <div className="rv">
            <h4>Liens rapides</h4>
            {NAV.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </div>
          <div className="rv">
            <h4>Campus</h4>
            {CAMPUSES_DATA.map((c) => <p key={c.id} className="iconline"><MapPin size={14} /><span><b>{c.name.split(" (")[0]}</b><br />{c.quarter}</span></p>)}
          </div>
          <div className="rv">
            <h4>Suivre</h4>
            {SOCIALS.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
          </div>
          <div className="rv">
            <h4>Contact</h4>
            <a className="iconline" href="tel:+2290166044436"><Phone size={14} />+229 01 66 04 44 36</a>
            <Link className="iconline" to="/contact"><Mail size={14} />Écrire à PAG</Link>
          </div>
        </div>
        <div className="watermark" aria-hidden="true">PÉNIELLE</div>
        <p className="copy">©2026 {SITE_NAME}</p>
      </footer>
    </>
  );
}

export function Layout() {
  const { pathname } = useLocation();

  // Smooth inertial scroll
  useEffect(() => {
    document.documentElement.classList.add("js");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9, smoothWheel: true });
    let frame = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    });
    setLenis(lenis);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Scroll to top, then reveal elements as they enter the viewport (staggered inside each parent)
  useEffect(() => {
    scrollTopNow();
    const items = [...document.querySelectorAll<HTMLElement>(".rv")];
    const seen = new Map<Element, number>();
    items.forEach((el) => {
      const key = el.parentElement!;
      const n = seen.get(key) ?? 0;
      seen.set(key, n + 1);
      el.style.setProperty("--d", `${Math.min(n, 5) * 0.12}s`);
    });
    const watch = [...items, ...document.querySelectorAll<HTMLElement>(".watermark, .stat")];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const t = en.target as HTMLElement;
          t.classList.add("in");
          io.unobserve(t);
          setTimeout(() => t.classList.add("done"), 2000);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    watch.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <RequestsProvider>
      <div className="frame">
        <Outlet />
        <Footer />
      </div>
    </RequestsProvider>
  );
}
