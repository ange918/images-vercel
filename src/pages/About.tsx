import { useState } from "react";
import { Award, BadgeCheck, Building2, Clock, GraduationCap, Hammer, MapPin, Medal, Monitor, Plus, UserRound, type LucideIcon } from "lucide-react";
import { Head, Hero, Ico, Marquee } from "@/components/ui";
import { TEAM } from "@/data/team";
import { CAMPUSES_DATA, FAQ_DATA, PARTNERS_DATA, TIMELINE_DATA } from "@/data/pagData";
import { ceremonieEscalierImage } from "@/assets/images";

const TL_ICONS: Record<string, LucideIcon> = { construction: Hammer, desktop_windows: Monitor, school: GraduationCap, verified: BadgeCheck, apartment: Building2, military_tech: Medal };

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
        <div className="grid">
          {TEAM.map((m) => (
            <article key={m.role} className="member rv">
              <div className="avatar-lg">{m.photo ? <img src={m.photo} alt={m.name ?? m.role} loading="lazy" /> : <UserRound size={34} strokeWidth={1.4} />}</div>
              {m.name ? <h3>{m.name}</h3> : null}
              <b className="role">{m.role}</b>
              <p>{m.scope}</p>
            </article>
          ))}
        </div>
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
