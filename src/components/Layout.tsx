import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { NAV, SITE_NAME, SOCIALS, WHATSAPP } from "@/data/site";
import { CAMPUSES_DATA } from "@/data/pagData";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
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
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">S'inscrire</a>
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
  return (
    <section className="cta-wrap">
      <div className="cta-card rv-static">
        <h2>Prêt à donner vie à votre<br />projet créatif ?</h2>
        <p>Inscrivez-vous à la prochaine rentrée ou demandez un devis à l'agence.</p>
        <Link to="/formations" className="btn btn-dark btn-sm">Voir les formations</Link>
        <Link to="/contact" className="btn btn-line btn-sm">Nous contacter</Link>
      </div>
      <footer className="footer">
        <div className="cols">
          <div className="rv">
            <h4>Liens rapides</h4>
            {NAV.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </div>
          <div className="rv">
            <h4>Campus</h4>
            {CAMPUSES_DATA.map((c) => <p key={c.id}><b>{c.name.split(" (")[0]}</b><br />{c.quarter}</p>)}
          </div>
          <div className="rv">
            <h4>Suivre</h4>
            {SOCIALS.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
          </div>
          <div className="rv">
            <h4>Contact</h4>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">WhatsApp : +229 01 66 04 44 36</a>
          </div>
        </div>
        <div className="watermark" aria-hidden="true">PÉNIELLE</div>
        <p className="copy">©2026 {SITE_NAME}</p>
      </footer>
    </section>
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
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Scroll to top, then reveal elements as they enter the viewport (staggered inside each parent)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
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
    <div className="frame">
      <Outlet />
      <Footer />
    </div>
  );
}
