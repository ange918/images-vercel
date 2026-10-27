import { Link, useParams } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BadgeCheck, CalendarDays, Clock, GraduationCap, ListChecks, MapPin, Monitor, Wallet, FileText, Backpack, CreditCard, Receipt } from "lucide-react";
import { Head, Hero, Ico } from "@/components/ui";
import { useRequests } from "@/components/Requests";
import { FORMATIONS_DATA, GRAPHISME_MODULES } from "@/data/pagData";
import { NotFound } from "@/pages/NotFound";

function ListCard({ title, items, icon }: { title: string; items?: readonly string[]; icon: LucideIcon }) {
  if (!items?.length) return null;
  return (
    <article className="why-card rv"><Ico icon={icon} className="dark" /><h3>{title}</h3><ul>{items.map((i) => <li key={i}>{i}</li>)}</ul></article>
  );
}

function Rows({ title, rows, icon }: { title: string; rows?: readonly { label: string; value: string }[]; icon: LucideIcon }) {
  if (!rows?.length) return null;
  return (
    <article className="why-card rv"><Ico icon={icon} className="dark" /><h3>{title}</h3>{rows.map((r) => <div key={r.label} className="row"><span>{r.label}</span><b>{r.value}</b></div>)}</article>
  );
}

export function FormationDetail() {
  const { id } = useParams();
  const { openRegistration } = useRequests();
  const f = FORMATIONS_DATA.find((x) => x.id === id);
  if (!f) return <NotFound />;
  const modules = f.id === "formation-graphisme" ? GRAPHISME_MODULES : [];
  const facts = [[Clock, "Durée", f.duration], [Wallet, "Scolarité", f.price], [Receipt, "Inscription", f.inscriptionFee], [CalendarDays, "Rentrée", f.startDate]] as const;

  return (
    <>
      <Hero short image={f.imageUrl} small={<>{f.category}</>} word={f.title.length > 14 ? "Formation" : f.title} text={f.tagline ?? f.description} position="center 40%" />
      <section className="section">
        <div className="rv"><Head eyebrow={f.diplomaBadge} title={f.title} text={f.objectives} /></div>
        <div className="stats">
          {facts.map(([I, l, v]) => <article key={l} className="stat rv"><Ico icon={I} /><small>{l}</small><b style={{ fontSize: 18 }}>{v}</b></article>)}
        </div>
        <div className="rv" style={{ marginTop: 26 }}><button className="btn btn-dark" onClick={() => openRegistration(f.id)}><GraduationCap size={16} />S'inscrire à cette formation<ArrowRight size={16} /></button></div>
      </section>
      <section className="section">
        <div className="why">
          <ListCard icon={ListChecks} title="Compétences acquises" items={f.skillsAcquired} />
          <ListCard icon={Monitor} title="Logiciels et outils" items={f.software} />
          {f.schedule ? <article className="why-card rv"><Ico icon={MapPin} className="dark" /><h3>Horaires et campus</h3><p>{f.schedule}</p><p style={{ marginTop: 8 }}>{f.campuses}</p></article> : null}
          {f.prerequisites ? <article className="why-card rv"><Ico icon={BadgeCheck} className="dark" /><h3>Prérequis</h3><p>{f.prerequisites}</p></article> : null}
          <ListCard icon={BadgeCheck} title="Inclus" items={f.inclus} />
          <ListCard icon={FileText} title="Pièces à fournir" items={f.piecesAFournir} />
          <ListCard icon={Backpack} title="Matériel requis" items={f.materielsRequis} />
          <Rows icon={CreditCard} title="Paiement en tranches" rows={f.tranches?.map((t) => ({ label: `${t.label} · ${t.deadline}`, value: t.amount }))} />
          <Rows icon={Receipt} title="Frais divers" rows={f.fraisDivers?.map((t) => ({ label: t.item, value: t.amount }))} />
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
              <span className="btn btn-dark btn-sm more">En savoir plus<ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
