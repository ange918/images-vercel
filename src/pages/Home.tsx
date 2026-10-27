import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, Bars, CtaLink, Head, Marquee } from "@/components/ui";
import { SiteNav } from "@/components/Layout";
import { FORMATIONS_DATA, PAG_FACTS, PARTNERS_DATA, TESTIMONIALS_DATA } from "@/data/pagData";
import {
  ceremonieCiergesEstradeImage,
  ceremonieEscalierImage,
  ceremonieGroupeCertificatsImage,
  ceremonieLancerToquesImage,
  ceremonieLaureatsAssisImage,
  salleInformatiqueImage,
} from "@/assets/images";
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

const SLIDES = [
  { image: salleInformatiqueImage, position: "center 40%" },
  { image: ceremonieGroupeCertificatsImage, position: "center 25%" },
  { image: ceremonieLancerToquesImage, position: "center 30%" },
  { image: ceremonieCiergesEstradeImage, position: "center 40%" },
  { image: ceremonieLaureatsAssisImage, position: "center 40%" },
];

function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => ref.current?.classList.add("loaded")));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setSlide((v) => (v + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const step = (i: number) => ({ "--i": i }) as React.CSSProperties;
  return (
    <section ref={ref} className="hero tall">
      <SiteNav />
      <div className="hero-stage">
        {SLIDES.map((s, i) => (
          <div key={s.image} className={`backdrop slide${i === slide ? " on" : ""}`} style={{ backgroundImage: `url(${s.image})`, backgroundPosition: s.position }} />
        ))}
        <div className="hero-copy">
          <p className="eyebrow" style={step(0)}>Académie &amp; Agence Digitale • Agréée au Bénin</p>
          <p className="live" style={step(1)}><i />{PAG_FACTS.rentree.status} • {PAG_FACTS.rentree.long}</p>
          <h1 style={step(2)}>Formations Métiers d'Excellence &amp; Production Graphique</h1>
          <p className="sub" style={step(3)}>
            Cursus professionnels intensifs de <b>12 mois</b> sanctionnés par un <b>Diplôme d'État</b> officiel avec stage en entreprise garanti. Pôle d'innovation en design graphique, sérigraphie industrielle et audiovisuel.
          </p>
          <div className="actions" style={step(4)}>
            <Link to="/formations" className="btn btn-light">Découvrir nos formations (12 mois)</Link>
            <a className="btn btn-line" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Bonjour PAG, je souhaite candidater à la formation Graphisme & Design Visuel.")}`} target="_blank" rel="noreferrer">Candidater en ligne</a>
          </div>
          <div className="marks" style={step(5)}>
            <div><b>12 Mois</b><small>Avec stage garanti</small></div>
            <div><b>Diplôme d'État</b><small>Reconnu au Bénin</small></div>
            <div><b>{PAG_FACTS.campusCount} Campus</b><small>{PAG_FACTS.citiesLabel}</small></div>
          </div>
        </div>
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={i === slide ? "on" : ""} aria-label={`Image ${i + 1}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Formations() {
  return (
    <section className="stack">
      <div className="stack-intro rv">
        <span className="eyebrow">Académie</span>
        <h2>Nos formations</h2>
        <p>Trois cursus professionnels, 100 % pratiques, pour passer de la passion au métier : du certificat PAG au Diplôme d'État (CQM), avec stage garanti. {PAG_FACTS.rentree.long}.</p>
        <ol>
          {FORMATIONS_DATA.map((f, i) => (
            <li key={f.id}><small>{String(i + 1).padStart(2, "0")}</small>{f.title}</li>
          ))}
        </ol>
        <div style={{ marginTop: 26 }}><CtaLink to="/formations">Toutes les formations</CtaLink></div>
      </div>
      <div className="stack-cards">
        {FORMATIONS_DATA.map((f, i) => (
          <article key={f.id} className="stack-card" style={{ zIndex: i + 1 }}>
            <img src={f.imageUrl} alt={`Formation ${f.title}`} loading="lazy" />
            <div className="shade" />
            <div className="tag"><span>{f.duration}</span><span>{f.diplomaBadge}</span></div>
            <div className="info">
              <p className="num">{String(i + 1).padStart(2, "0")} / {String(FORMATIONS_DATA.length).padStart(2, "0")}</p>
              <h3>{f.title}</h3>
              <p>{f.tagline}. {f.campuses}.</p>
              <div className="foot">
                <b>{f.price}</b>
                <CtaLink to={`/formations/${f.id}`} className="btn btn-light btn-sm">Voir la formation →</CtaLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Home() {
  const [offset, setOffset] = useState(0);
  const people = TESTIMONIALS_DATA;
  const shown = [0, 1, 2].map((i) => people[(offset + i) % people.length]!);
  const partners = PARTNERS_DATA.filter((p) => p.featured).map((p) => p.name);

  return (
    <>
      <HomeHero />

      <Formations />

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
