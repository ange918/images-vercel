import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Clock, MapPin, Users } from "lucide-react";
import { Head, Hero, Ico } from "@/components/ui";
import { FORMATIONS_DATA, PAG_FACTS, WORKSHOPS_DATA } from "@/data/pagData";
import { salleInformatiqueImage } from "@/assets/images";

export function Formations() {
  return (
    <>
      <Hero short image={salleInformatiqueImage} small={<>Nos cursus<br />professionnels</>} word="Formations" text={`${PAG_FACTS.rentree.long}. ${PAG_FACTS.rentree.status} à ${PAG_FACTS.citiesSentence}.`} position="center 40%" />
      <section className="section">
        <div className="rv"><Head eyebrow="Cursus" title={<>De 3 à 12 mois,<br />100 % pratique</>} text="Chaque formation conduit à un certificat PAG ; le graphisme prépare aussi au Diplôme d'État (CQM)." /></div>
        <div className="grid">
          {FORMATIONS_DATA.map((f) => (
            <Link key={f.id} to={`/formations/${f.id}`} className="offer rv">
              <div className="pic"><img src={f.imageUrl} alt={`Formation ${f.title}`} loading="lazy" /><span>{f.duration}</span></div>
              <div className="meta"><div><b>{f.title}</b><small>{f.category}</small></div><span className="p">{f.price}</span></div>
              <p className="d">{f.description}</p>
              <ul><li><BadgeCheck size={12} />{f.diplomaBadge}</li><li><MapPin size={12} />{f.campuses}</li></ul>
              <span className="btn btn-dark btn-sm more">En savoir plus<ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="rv"><Head eyebrow="Ateliers" title={<>Ateliers courts<br />pour se perfectionner</>} text="Quelques jours pour maîtriser un outil précis." /></div>
        <div className="why">
          {WORKSHOPS_DATA.map((w) => (
            <article key={w.id} className="why-card rv">
              <Ico icon={Clock} className="dark" /><span className="pill">{w.duration} · {w.level}</span>
              <h3>{w.title}</h3><p>{w.description}</p>
              <ul>{w.topics.slice(0, 3).map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="row" style={{ marginTop: 14 }}><span><Users size={12} style={{ marginRight: 6, verticalAlign: -1 }} />{w.audience}</span><b>{w.price}</b></div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
