import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BadgeCheck, Briefcase, Building2, Clock, GraduationCap, MapPin, Quote, Users, Wallet, Wrench } from "lucide-react";
import { CtaLink, Head, Ico, Marquee } from "@/components/ui";
import { BarChart, ChartCard, CountUp, Donut, HBars } from "@/components/charts";
import { useRequests } from "@/components/Requests";
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

const KPIS = [
  { label: "Diplômés certifiés depuis 2018", to: 1500, prefix: "", suffix: "+", icon: Users },
  { label: "Agences partenaires", to: 18, prefix: "", suffix: "", icon: Building2 },
  { label: "Cérémonies de remise des parchemins", to: 6, prefix: "", suffix: "", icon: Award },
  { label: "Campus : Cotonou et Porto-Novo", to: 2, prefix: "", suffix: "", icon: MapPin },
];

const WHY = [
  { icon: Wrench, t: "Une formation 100 % pratique", d: "Des ateliers équipés, des projets réels et un suivi par nos formateurs, du premier jour à la remise du diplôme." },
  { icon: BadgeCheck, t: "Un diplôme reconnu", d: "Le Certificat PAG et, pour le graphisme, la préparation au Diplôme d'État (CQM) délivré sous la tutelle de l'État béninois." },
  { icon: Briefcase, t: "Un stage garanti", d: "Chaque apprenant est placé en stage au sein d'une de nos agences partenaires ou directement chez PAG." },
  { icon: Wallet, t: "Un tarif clair", d: "Scolarité et frais affichés avant l'inscription, avec un paiement en tranches pour le graphisme." },
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
  const { openRegistration } = useRequests();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => ref.current?.classList.add("loaded")));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
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
          <p className="eyebrow from-top" style={step(0)}>Académie &amp; Agence Digitale • Agréée au Bénin</p>
          <h1 className="from-top" style={step(1)}>Formations Métiers d'Excellence &amp; Production Graphique</h1>
          <p className="sub from-top" style={step(2)}>
            Cursus professionnels intensifs de <b>12 mois</b> sanctionnés par un <b>Diplôme d'État</b> officiel avec stage en entreprise garanti. Pôle d'innovation en design graphique, sérigraphie industrielle et audiovisuel.
          </p>
          <div className="actions from-left" style={step(3)}>
            <Link to="/formations" className="btn btn-light"><GraduationCap size={16} />Découvrir nos formations (12 mois)</Link>
            <button className="btn btn-line" onClick={() => openRegistration()}>Candidater en ligne<ArrowRight size={16} /></button>
          </div>
          <div className="marks from-left" style={step(4)}>
            <div><Ico icon={Clock} size={16} /><span><b>12 Mois</b><small>Avec stage garanti</small></span></div>
            <div><Ico icon={GraduationCap} size={16} /><span><b>Diplôme d'État</b><small>Reconnu au Bénin</small></span></div>
            <div><Ico icon={MapPin} size={16} /><span><b>{PAG_FACTS.campusCount} Campus</b><small>{PAG_FACTS.citiesLabel}</small></span></div>
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

type Testimonial = (typeof TESTIMONIALS_DATA)[number];

/** One band of testimonial cards that scrolls forever. `reverse` runs it left to right. */
function TestimonialRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="tm-band">
      <div className={`tm-track${reverse ? " reverse" : ""}`} style={{ "--n": items.length } as React.CSSProperties}>
        {loop.map((p, i) => (
          <article key={`${p.id}-${i}`} className="person" aria-hidden={i >= items.length ? true : undefined}>
            <div className="avatar">{p.avatarText ?? p.author.slice(0, 2).toUpperCase()}<Quote size={12} className="q" /></div>
            <p>« {p.quote} »</p>
            <h5>{p.author}</h5><small>{p.role}</small>
            <span className="pill">{p.highlight}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

/** Pinned section: scrolling down slides the cards sideways, one leaving while the next comes in. */
function Formations() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      if (t) setDist(Math.max(0, t.scrollWidth - (t.parentElement?.clientWidth ?? window.innerWidth)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = outer.current;
      const t = track.current;
      if (!el || !t) return;
      const travel = el.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / travel)) : 0;
      t.style.transform = `translate3d(${(-p * dist).toFixed(1)}px, 0, 0)`;
      setCurrent(Math.min(FORMATIONS_DATA.length - 1, Math.round(p * (FORMATIONS_DATA.length - 1))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [dist]);

  return (
    <section ref={outer} className="hscroll" style={{ height: `calc(100svh + ${dist}px)` }} aria-label="Nos formations">
      <div className="hscroll-pin">
        <div className="hscroll-head">
          <h2>Nos formations</h2>
          <p>{String(current + 1).padStart(2, "0")} / {String(FORMATIONS_DATA.length).padStart(2, "0")}</p>
        </div>
        <div ref={track} className="hscroll-track">
          {FORMATIONS_DATA.map((f, i) => (
            <article key={f.id} className="h-card">
              <img src={f.imageUrl} alt={`Formation ${f.title}`} loading="lazy" draggable={false} />
              <div className="shade" />
              <div className="tag"><span><Clock size={12} />{f.duration}</span><span><BadgeCheck size={12} />{f.diplomaBadge}</span></div>
              <div className="info">
                <p className="num">{String(i + 1).padStart(2, "0")} / {String(FORMATIONS_DATA.length).padStart(2, "0")}</p>
                <h3>{f.title}</h3>
                <p>{f.tagline}. {f.campuses}.</p>
                <div className="foot">
                  <b>{f.price}</b>
                  <CtaLink to={`/formations/${f.id}`} className="btn btn-light btn-sm">En savoir plus</CtaLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const { openRegistration } = useRequests();
  const rowA = TESTIMONIALS_DATA.filter((_, i) => i % 2 === 0);
  const rowB = TESTIMONIALS_DATA.filter((_, i) => i % 2 === 1);
  const partners = PARTNERS_DATA.filter((p) => p.featured).map((p) => p.name);

  return (
    <>
      <HomeHero />

      <Formations />

      <section className="section">
        <div className="rv"><Head eyebrow="PAG en chiffres" title={<>Une école qui a fait<br />ses preuves.</>} text="Depuis 2012, PAG transmet le savoir-faire graphique et textile au Bénin." /></div>
        <div className="kpis">
          {KPIS.map((k) => (
            <article key={k.label} className="kpi rv">
              <Ico icon={k.icon} />
              <b><CountUp to={k.to} prefix={k.prefix} suffix={k.suffix} /></b>
              <small>{k.label}</small>
            </article>
          ))}
        </div>
        <div className="charts">
          <ChartCard title="Insertion professionnelle" text="Part des diplômés en emploi ou entrepreneurs.">
            <Donut value={94} label="Taux d'insertion" sub="Emploi & entrepreneuriat" />
          </ChartCard>
          <ChartCard title="Une formation pratique" text="Répartition du temps de formation en atelier.">
            <Donut value={80} label="De pratique" sub="Conditions réelles d'agence et d'imprimerie" color="#f59e0b" />
          </ChartCard>
          <ChartCard title="Lauréats par cérémonie" text="Nombre de lauréats à la première et à la dernière remise.">
            <BarChart max={300} data={[{ label: "Édition 1", sub: "2018", value: 68 }, { label: "Édition 6", sub: "2024", value: 284 }]} />
          </ChartCard>
          <ChartCard title={`Places pour la rentrée du ${PAG_FACTS.rentree.date.replace(" 2026", "")}`} text="Inscriptions déjà enregistrées sur la capacité de chaque formation." className="wide">
            <HBars data={FORMATIONS_DATA.map((f) => ({ label: f.title, taken: (f.totalSpots ?? 0) - (f.remainingSpots ?? 0), total: f.totalSpots ?? 0 }))} />
          </ChartCard>
        </div>
      </section>

      <section className="section">
        <div className="rv"><Head eyebrow="Pourquoi PAG" title={<>Pourquoi se former<br />chez PAG ?</>} text="Quatre raisons de rejoindre la prochaine promotion." /></div>
        <div className="why">
          {WHY.map((w, i) => (
            <article key={w.t} className="why-card rv"><Ico icon={w.icon} className="dark" /><h3>{w.t}</h3><p>{w.d}</p></article>
          ))}
        </div>
      </section>

      <section className="tm">
        <div className="tm-head rv"><Head eyebrow="Témoignages" title={<>Ils sont passés<br />par PAG</>} text="Anciens apprenants et partenaires racontent leur expérience." /></div>
        <div className="tm-rows">
          <TestimonialRow items={rowA} />
          <TestimonialRow items={rowB} reverse />
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
            <div className="rv"><button className="btn btn-dark btn-sm" onClick={() => openRegistration()}>S'inscrire à la rentrée<ArrowRight size={14} /></button></div>
          </div>
        </div>
      </section>
    </>
  );
}
