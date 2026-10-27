import { useState } from "react";
import { Head, Hero } from "@/components/ui";
import { ARTICLES_DATA } from "@/data/pagData";
import { classroomImage } from "@/assets/images";

const LABELS: Record<string, string> = { "vie-du-centre": "Vie du centre", "astuces-design": "Astuces design", evenements: "Événements", metiers: "Métiers" };

export function News() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <>
      <Hero short image={classroomImage} small={<>Vie du centre,<br />astuces, événements</>} word="Actualités" text="Les dernières nouvelles de l'académie et de l'agence PAG." position="center 40%" />
      <section className="section">
        <div className="rv"><Head eyebrow="Articles" title={<>À lire<br />chez PAG</>} /></div>
        <div className="timeline">
          {ARTICLES_DATA.map((a) => {
            const open = openId === a.id;
            return (
              <article key={a.id} className="tl rv" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <span className="pill">{LABELS[a.category] ?? a.category} · {a.date} · {a.readTime}</span>
                  <h3 style={{ fontSize: 20 }}>{a.title}</h3>
                  <p>{a.summary}</p>
                  {open ? <p className="swap" style={{ color: "var(--ink)" }}>{a.content}<br /><small style={{ color: "var(--faint)" }}>Par {a.author}</small></p> : null}
                  <button className="btn btn-dark btn-sm" style={{ marginTop: 16 }} onClick={() => setOpenId(open ? null : a.id)}>{open ? "Réduire" : "Lire l'article"}</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
