import { Link, useParams } from "react-router-dom";
import { CtaLink, Head, Hero } from "@/components/ui";
import { FORMATIONS_DATA, GRAPHISME_MODULES } from "@/data/pagData";
import { NotFound } from "@/pages/NotFound";
import { WHATSAPP } from "@/data/site";

function ListCard({ title, items }: { title: string; items?: readonly string[] }) {
  if (!items?.length) return null;
  return (
    <article className="why-card rv"><h3>{title}</h3><ul>{items.map((i) => <li key={i}>{i}</li>)}</ul></article>
  );
}

function Rows({ title, rows }: { title: string; rows?: readonly { label: string; value: string }[] }) {
  if (!rows?.length) return null;
  return (
    <article className="why-card rv"><h3>{title}</h3>{rows.map((r) => <div key={r.label} className="row"><span>{r.label}</span><b>{r.value}</b></div>)}</article>
  );
}

export function FormationDetail() {
  const { id } = useParams();
  const f = FORMATIONS_DATA.find((x) => x.id === id);
  if (!f) return <NotFound />;
  const message = encodeURIComponent(`Bonjour PAG, je souhaite m'inscrire à la formation « ${f.title} ».`);
  const modules = f.id === "formation-graphisme" ? GRAPHISME_MODULES : [];
  const facts = [["Durée", f.duration], ["Scolarité", f.price], ["Inscription", f.inscriptionFee], ["Rentrée", f.startDate]];

  return (
    <>
      <Hero short image={f.imageUrl} small={<>{f.category}</>} word={f.title.length > 14 ? "Formation" : f.title} text={f.tagline ?? f.description} position="center 40%" />
      <section className="section">
        <div className="rv"><Head eyebrow={f.diplomaBadge} title={f.title} text={f.objectives} /></div>
        <div className="stats">
          {facts.map(([l, v]) => <article key={l} className="stat rv"><small>{l}</small><b style={{ fontSize: 18 }}>{v}</b></article>)}
        </div>
        <div className="rv" style={{ marginTop: 26 }}><CtaLink to={`https://wa.me/${WHATSAPP}?text=${message}`}>S'inscrire sur WhatsApp</CtaLink></div>
      </section>
      <section className="section">
        <div className="why">
          <ListCard title="Compétences acquises" items={f.skillsAcquired} />
          <ListCard title="Logiciels et outils" items={f.software} />
          {f.schedule ? <article className="why-card rv"><h3>Horaires et campus</h3><p>{f.schedule}</p><p style={{ marginTop: 8 }}>{f.campuses}</p></article> : null}
          {f.prerequisites ? <article className="why-card rv"><h3>Prérequis</h3><p>{f.prerequisites}</p></article> : null}
          <ListCard title="Inclus" items={f.inclus} />
          <ListCard title="Pièces à fournir" items={f.piecesAFournir} />
          <ListCard title="Matériel requis" items={f.materielsRequis} />
          <Rows title="Paiement en tranches" rows={f.tranches?.map((t) => ({ label: `${t.label} · ${t.deadline}`, value: t.amount }))} />
          <Rows title="Frais divers" rows={f.fraisDivers?.map((t) => ({ label: t.item, value: t.amount }))} />
        </div>
      </section>
      {modules.length > 0 ? (
        <section className="section">
          <div className="rv"><Head eyebrow="Programme" title={<>Les modules<br />du cursus</>} text="Du design fondamental à la mise en pratique professionnelle." /></div>
          <div className="timeline">
            {modules.map((m) => (
              <article key={m.id} className="tl rv"><p className="y">{m.num}</p><div><h3>{m.title}</h3><h4>{m.duration}</h4><p>{m.description}</p></div></article>
            ))}
          </div>
        </section>
      ) : null}
      <section className="section">
        <div className="rv"><Head eyebrow="À découvrir" title="Autres formations" /></div>
        <div className="grid two">
          {FORMATIONS_DATA.filter((o) => o.id !== f.id).map((o) => (
            <Link key={o.id} to={`/formations/${o.id}`} className="offer rv">
              <div className="pic"><img src={o.imageUrl} alt={o.title} loading="lazy" /><span>{o.duration}</span></div>
              <div className="meta"><div><b>{o.title}</b><small>{o.tagline}</small></div><span className="p">{o.price}</span></div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
