import { useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, Bars, CtaLink, Head, Hero, Marquee } from "@/components/ui";
import { FORMATIONS_DATA, PAG_FACTS, PARTNERS_DATA, TESTIMONIALS_DATA } from "@/data/pagData";
import { ceremonieGroupeCertificatsImage, ceremonieEscalierImage } from "@/assets/images";
import { WHATSAPP } from "@/data/site";

const STATS = [
  { label: "Diplômés formés", value: "1 500+" },
  { label: "Agences partenaires", value: "18" },
  { label: "Cérémonies de remise", value: "6" },
  { label: "Campus", value: "2" },
];

const WHY = [
  { t: "Une formation 100 % pratique", d: "Des ateliers équipés, des projets réels et un suivi par nos formateurs, du premier jour à la remise du diplôme." },
  { t: "Un diplôme reconnu", d: "Le Certificat PAG et, pour le graphisme, la préparation au Diplôme d'État (CQM) délivré sous la tutelle de l'État béninois." },
  { t: "Un stage garanti", d: "Chaque apprenant est placé en stage au sein d'une de nos agences partenaires ou directement chez PAG." },
  { t: "Un tarif clair", d: "Scolarité et frais affichés avant l'inscription, avec un paiement en tranches pour le graphisme." },
];

export function Home() {
  const [offset, setOffset] = useState(0);
  const people = TESTIMONIALS_DATA;
  const shown = [0, 1, 2].map((i) => people[(offset + i) % people.length]!);
  const partners = PARTNERS_DATA.filter((p) => p.featured).map((p) => p.name);

  return (
    <>
      <Hero
        image={ceremonieGroupeCertificatsImage}
        small={<>Formez-vous<br />au métier de</>}
        word="Créatif"
        text="Pénielle Art Graphic est à la fois une académie et une agence : formations en graphisme, sérigraphie et création de contenu, à Cotonou et Porto-Novo."
        position="center 25%"
      >
        <div className="stats-pill">
          <div><b>12 mois</b><small>Graphisme</small></div>
          <div><b>1 500+</b><small>Diplômés</small></div>
          <div><b>18</b><small>Agences</small></div>
          <div><b>2</b><small>Campus</small></div>
        </div>
        <Link to="/formations" className="play-card">
          <span className="thumb"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg></span>
          <span>{PAG_FACTS.rentree.short}</span>
        </Link>
      </Hero>

      <section className="section">
        <div className="rv"><Head eyebrow="Académie" title={<>Apprenez un métier,<br />lancez votre carrière.</>} text="Trois cursus professionnels, du certificat PAG au Diplôme d'État, pour passer de la passion au métier." /></div>
        <div className="grid">
          {FORMATIONS_DATA.map((f) => (
            <Link key={f.id} to={`/formations/${f.id}`} className="offer rv">
              <div className="pic"><img src={f.imageUrl} alt={`Formation ${f.title}`} loading="lazy" /><span>{f.duration}</span></div>
              <div className="meta"><div><b>{f.title}</b><small>{f.diplomaBadge}</small></div><span className="p">{f.price}</span></div>
              <ul><li>{f.campuses}</li><li>Inscription {f.inscriptionFee}</li></ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="rv"><Head eyebrow="PAG en chiffres" title={<>Une école qui a fait<br />ses preuves.</>} text="Depuis 2012, PAG transmet le savoir-faire graphique et textile au Bénin." /></div>
        <div className="stats">
          {STATS.map((s, i) => (
            <article key={s.label} className="stat">
              <small>{s.label}</small><b>{s.value}</b><Bars seed={i + 1} rising={i === 1} />
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="rv"><Head eyebrow="Pourquoi PAG" title={<>Pourquoi se former<br />chez PAG ?</>} text="Quatre raisons de rejoindre la prochaine promotion." /></div>
        <div className="why">
          {WHY.map((w, i) => (
            <article key={w.t} className="why-card rv"><span className="num">{String(i + 1).padStart(2, "0")}</span><h3>{w.t}</h3><p>{w.d}</p></article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="row-head rv">
          <h2>Ils sont passés par PAG</h2>
          <div className="arrows">
            <button className="arrow" aria-label="Précédent" onClick={() => setOffset((offset + people.length - 1) % people.length)}><Arrow dir="l" /></button>
            <button className="arrow" aria-label="Suivant" onClick={() => setOffset((offset + 1) % people.length)}><Arrow dir="r" /></button>
          </div>
        </div>
        <div className="slider">
          {shown.map((p) => (
            <article key={`${offset}-${p.id}`} className="person swap">
              <div className="avatar">{p.avatarText ?? p.author.slice(0, 2).toUpperCase()}</div>
              <p>« {p.quote} »</p>
              <h5>{p.author}</h5><small>{p.role}</small>
              <span className="pill">{p.highlight}</span>
            </article>
          ))}
        </div>
        <Marquee items={partners} />
      </section>

      <section className="section">
        <div className="about">
          <div className="about-photo rv"><img src={ceremonieEscalierImage} alt="Lauréats de PAG sur l'escalier de la cérémonie" loading="lazy" /><span className="badge">Cérémonie de remise des parchemins</span></div>
          <div className="about-body">
            <p className="lead rv">Une rentrée, trois cursus, deux campus.</p>
            <p className="rv">{PAG_FACTS.rentree.long} · {PAG_FACTS.rentree.status}. Cours du lundi au jeudi, de 08h à 13h pour le graphisme. Les places sont limitées pour garantir un poste de travail équipé à chaque apprenant.</p>
            <ul className="tags rv"><li>Graphisme</li><li>Sérigraphie</li><li>Création de contenu</li><li>Diplôme d'État</li></ul>
            <div className="rv"><CtaLink to={`https://wa.me/${WHATSAPP}`}>S'inscrire sur WhatsApp</CtaLink></div>
          </div>
        </div>
      </section>
    </>
  );
}
