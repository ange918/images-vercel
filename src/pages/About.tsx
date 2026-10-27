import { useState } from "react";
import { Head, Hero, Marquee } from "@/components/ui";
import { CAMPUSES_DATA, FAQ_DATA, PARTNERS_DATA, TIMELINE_DATA } from "@/data/pagData";
import { ceremonieEscalierImage } from "@/assets/images";

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
              <p className="y">{e.year}</p>
              <div>{e.badge ? <span className="pill">{e.badge}</span> : null}<h3>{e.title}</h3><h4>{e.subtitle}</h4><p>{e.description}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="rv"><Head eyebrow="Campus" title={<>Deux campus<br />pour vous accueillir</>} /></div>
        <div className="grid two">
          {CAMPUSES_DATA.map((c) => (
            <article key={c.id} className="why-card rv"><span className="pill">{c.city}</span><h3>{c.name}</h3><p>{c.quarter}</p><ul>{c.features.map((x) => <li key={x}>{x}</li>)}</ul></article>
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
              <div key={f.id} className={`faq-item rv${open ? " open" : ""}`}>
                <button aria-expanded={open} onClick={() => setOpenId(open ? null : f.id)}>{f.question}<span className="plus">+</span></button>
                {open ? <div className="ans">{f.answer}{f.highlight ? <b>{f.highlight}</b> : null}</div> : null}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
