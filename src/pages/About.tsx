import { useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import { Award, ChevronLeft, ChevronRight, BadgeCheck, Building2, Clock, GraduationCap, Hammer, MapPin, Medal, Monitor, Plus, UserRound, type LucideIcon } from "lucide-react";
import { Head, Hero, Ico, Marquee } from "@/components/ui";
import { TEAM } from "@/data/team";
import { CAMPUSES_DATA, FAQ_DATA, PARTNERS_DATA, TIMELINE_DATA } from "@/data/pagData";
import { ceremonieEscalierImage } from "@/assets/images";

const TL_ICONS: Record<string, LucideIcon> = { construction: Hammer, desktop_windows: Monitor, school: GraduationCap, verified: BadgeCheck, apartment: Building2, military_tech: Medal };

/** Rotating deck: the active card sits in front, its neighbours stay visible behind it. */
function TeamCarousel() {
  const n = TEAM.length;
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const drag = useRef<number | null>(null);
  const go = useCallback((d: number) => setActive((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => !paused.current && go(1), 4500);
    return () => clearInterval(t);
  }, [go]);

  const rel = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <div
      className="deck rv"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Équipe PAG"
      tabIndex={0}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onKeyDown={(e) => (e.key === "ArrowRight" ? go(1) : e.key === "ArrowLeft" ? go(-1) : null)}
      onPointerDown={(e) => { drag.current = e.clientX; paused.current = true; }}
      onPointerUp={(e) => {
        if (drag.current !== null && Math.abs(e.clientX - drag.current) > 40) go(e.clientX < drag.current ? 1 : -1);
        drag.current = null;
      }}
    >
      <div className="deck-stage">
        {TEAM.map((m, i) => {
          const d = rel(i);
          const far = Math.abs(d) > 2;
          return (
            <article
              key={m.role}
              className={`member${d === 0 ? " on" : ""}`}
              aria-hidden={d !== 0}
              onClick={() => d !== 0 && setActive(i)}
              style={{
                transform: `translateX(${d * 58}%) scale(${1 - Math.abs(d) * 0.14}) rotateY(${d * -14}deg)`,
                zIndex: 10 - Math.abs(d),
                opacity: far ? 0 : 1 - Math.abs(d) * 0.25,
                filter: d === 0 ? "none" : `blur(${Math.abs(d) * 1.2}px)`,
                pointerEvents: far ? "none" : "auto",
              }}
            >
              <div className="avatar-lg">{m.photo ? <img src={m.photo} alt={m.name ?? m.role} loading="lazy" /> : <UserRound size={44} strokeWidth={1.3} />}</div>
              {m.name ? <h3>{m.name}</h3> : null}
              <b className="role">{m.role}</b>
              <p>{m.scope}</p>
            </article>
          );
        })}
      </div>
      <div className="deck-nav">
        <button className="arrow" aria-label="Membre précédent" onClick={() => go(-1)}><ChevronLeft size={18} color="#fff" /></button>
        <div className="dots">
          {TEAM.map((m, i) => <button key={m.role} className={i === active ? "on" : ""} aria-label={m.role} onClick={() => setActive(i)} />)}
        </div>
        <button className="arrow" aria-label="Membre suivant" onClick={() => go(1)}><ChevronRight size={18} color="#fff" /></button>
      </div>
    </div>
  );
}

export function About() {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id ?? null);
  return (
    <>
      <Hero short image={ceremonieEscalierImage} small={<>Depuis 2012<br />au Bénin</>} word="À propos" text="De l'atelier de sérigraphie de Porto-Novo à l'académie reconnue par l'État." position="center 25%" />
      <section className="section">
        <div className="rv"><Head eyebrow="Histoire" title={<>Notre parcours,<br />de 2012 à aujourd'hui</>} /></div>
        <div className="timeline">
          {TIMELINE_DATA.map((e) => (
            <article key={e.year} className="tl rv">
              <div><Ico icon={TL_ICONS[e.icon] ?? Award} className="dark" /><p className="y">{e.year}</p></div>
              <div>{e.badge ? <span className="pill">{e.badge}</span> : null}<h3>{e.title}</h3><h4>{e.subtitle}</h4><p>{e.description}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="rv"><Head eyebrow="Équipe" title={<>L'équipe qui<br />fait vivre PAG</>} text="Direction, pédagogie, agence et campus : des interlocuteurs identifiés à chaque étape." /></div>
        <TeamCarousel />
      </section>
      <section className="section">
        <div className="rv"><Head eyebrow="Campus" title={<>Deux campus<br />pour vous accueillir</>} /></div>
        <div className="grid two">
          {CAMPUSES_DATA.map((c) => (
            <article key={c.id} className="why-card rv"><Ico icon={MapPin} className="dark" /><span className="pill">{c.city}</span><h3>{c.name}</h3><p>{c.quarter}</p><p style={{ marginTop: 6 }}><Clock size={12} style={{ marginRight: 6, verticalAlign: -1 }} />{c.hours}</p><ul>{c.features.map((x) => <li key={x}>{x}</li>)}</ul></article>
          ))}
        </div>
        <Marquee items={PARTNERS_DATA.map((p) => p.name).slice(0, 14)} />
      </section>
      <section className="section">
        <div className="rv"><Head eyebrow="FAQ" title={<>Questions<br />fréquentes</>} /></div>
        <div className="faq">
          {FAQ_DATA.map((f) => {
            const open = openId === f.id;
            return (
              <div key={f.id} className="rv">
                <div className={`faq-item${open ? " open" : ""}`}>
                  <button aria-expanded={open} onClick={() => setOpenId(open ? null : f.id)}>{f.question}<span className="plus"><Plus size={16} /></span></button>
                  {open ? <div className="ans">{f.answer}{f.highlight ? <b>{f.highlight}</b> : null}</div> : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
