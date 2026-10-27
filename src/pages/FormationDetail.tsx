import { Link, useParams } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { DotLink, Meta, Rise } from "@/components/bits";
import { FORMATIONS_DATA, GRAPHISME_MODULES } from "@/data/pagData";
import { NotFound } from "@/pages/NotFound";
import { WHATSAPP } from "@/data/site";

function List({ title, items }: { title: string; items?: readonly string[] }) {
  if (!items?.length) return null;
  return (
    <Rise>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <i className="mt-2 size-1.5 shrink-0 rounded-sm bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </Rise>
  );
}

export function FormationDetail() {
  const { id } = useParams();
  const f = FORMATIONS_DATA.find((item) => item.id === id);
  if (!f) return <NotFound />;
  const others = FORMATIONS_DATA.filter((item) => item.id !== f.id);
  const modules = f.id === "formation-graphisme" ? GRAPHISME_MODULES : [];
  const message = encodeURIComponent(`Bonjour PAG, je souhaite m'inscrire à la formation « ${f.title} ».`);

  return (
    <PageHero src={f.imageUrl} alt={`Formation ${f.title}`} kicker={`${f.category} · ${f.diplomaBadge}`} title={f.title} lead={f.tagline}>
      <Meta label="Programme" index="02" />
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Rise>
          <p className="text-title font-medium">{f.objectives}</p>
        </Rise>
        <div className="mt-8 flex justify-center">
          <DotLink href={`https://wa.me/${WHATSAPP}?text=${message}`}>S'inscrire sur WhatsApp</DotLink>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-4 px-5 sm:grid-cols-2 md:grid-cols-4 md:px-10">
        {[
          ["Durée", f.duration],
          ["Scolarité", f.price],
          ["Inscription", f.inscriptionFee],
          ["Rentrée", f.startDate],
        ].map(([label, value], i) => (
          <Rise key={label} delay={i * 60}>
            <div className="h-full rounded-3xl bg-mist p-6">
              <p className="text-xs text-muted">{label}</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">{value}</p>
            </div>
          </Rise>
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-10 px-5 md:grid-cols-2 md:px-10">
        <List title="Compétences acquises" items={f.skillsAcquired} />
        <List title="Logiciels et outils" items={f.software} />
        {f.schedule ? (
          <Rise>
            <h3 className="text-sm font-semibold">Horaires</h3>
            <p className="mt-3 text-sm text-muted">{f.schedule}</p>
            <p className="mt-2 text-sm text-muted">Campus : {f.campuses}</p>
          </Rise>
        ) : null}
        {f.prerequisites ? (
          <Rise>
            <h3 className="text-sm font-semibold">Prérequis</h3>
            <p className="mt-3 text-sm text-muted">{f.prerequisites}</p>
          </Rise>
        ) : null}
        <List title="Inclus" items={f.inclus} />
        <List title="Pièces à fournir" items={f.piecesAFournir} />
        <List title="Matériel requis" items={f.materielsRequis} />
        {f.tranches ? (
          <Rise>
            <h3 className="text-sm font-semibold">Paiement en tranches</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {f.tranches.map((t) => (
                <li key={t.label} className="flex justify-between gap-4 border-b border-line pb-2">
                  <span>{t.label} · {t.deadline}</span>
                  <span className="font-medium text-ink">{t.amount}</span>
                </li>
              ))}
            </ul>
          </Rise>
        ) : null}
        {f.fraisDivers ? (
          <Rise>
            <h3 className="text-sm font-semibold">Frais divers</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {f.fraisDivers.map((t) => (
                <li key={t.item} className="flex justify-between gap-4 border-b border-line pb-2">
                  <span>{t.item}</span>
                  <span className="font-medium text-ink">{t.amount}</span>
                </li>
              ))}
            </ul>
          </Rise>
        ) : null}
      </div>

      {modules.length > 0 ? (
        <>
          <div className="mt-20">
            <Meta label="Modules" index="03" />
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 px-5 md:px-10">
            {modules.map((m) => (
              <Rise key={m.id}>
                <div className="grid gap-3 rounded-3xl bg-mist p-6 md:grid-cols-[4rem_1fr_auto] md:p-8">
                  <span className="text-2xl font-semibold text-muted">{m.num}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{m.description}</p>
                  </div>
                  <p className="text-xs text-muted">{m.duration}</p>
                </div>
              </Rise>
            ))}
          </div>
        </>
      ) : null}

      <div className="mt-20">
        <Meta label="Autres formations" index="04" />
      </div>
      <div className="mx-auto grid max-w-5xl gap-4 px-5 pb-16 md:grid-cols-2 md:px-10">
        {others.map((o) => (
          <Link key={o.id} to={`/formations/${o.id}`} className="shot press block rounded-3xl bg-mist p-6">
            <p className="text-xs text-muted">{o.duration}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">{o.title}</p>
            <p className="mt-2 text-sm text-muted">{o.tagline}</p>
          </Link>
        ))}
      </div>
    </PageHero>
  );
}
