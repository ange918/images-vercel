import { Link } from "react-router-dom";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { DotLink, Meta, Rise } from "@/components/bits";
import { FORMATIONS_DATA, PAG_FACTS, WORKSHOPS_DATA } from "@/data/pagData";
import { salleInformatiqueImage } from "@/assets/images";

export function Formations() {
  return (
    <PageHero
      src={salleInformatiqueImage}
      alt="Salle informatique de l'académie PAG"
      kicker={`${PAG_FACTS.rentree.long} · ${PAG_FACTS.rentree.status}`}
      title="Formations"
      lead="Des cursus professionnels de 3 à 12 mois, 100 % pratiques, sur les campus de Cotonou et de Porto-Novo."
      position="object-[center_40%]"
    >
      <Meta label="Cursus" index="02" />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 md:grid-cols-2 md:px-10">
        {FORMATIONS_DATA.map((f, i) => (
          <Rise key={f.id} delay={(i % 2) * 80}>
            <article className="shot">
              <Link to={`/formations/${f.id}`} className="relative block overflow-hidden rounded-3xl bg-mist" aria-label={`Voir la formation ${f.title}`}>
                <img src={f.imageUrl} alt={`Formation ${f.title}`} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
                <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">{f.duration}</span>
              </Link>
              <div className="pt-4">
                <p className="text-xs text-muted">{f.category} · {f.diplomaBadge}</p>
                <h3 className="mt-1 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{f.description}</p>
                <p className="mt-3 text-sm font-medium">Scolarité : {f.price} · Inscription : {f.inscriptionFee}</p>
                <div className="mt-4">
                  <DotLink href={`/formations/${f.id}`} as="link">Voir le programme</DotLink>
                </div>
              </div>
            </article>
          </Rise>
        ))}
      </div>

      <Meta label="Ateliers" index="03" />
      <SectionTitle title="Ateliers courts®" text="Pour se perfectionner sur un outil précis, en quelques jours." />
      <div className="mx-auto mt-12 grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-2 md:px-10">
        {WORKSHOPS_DATA.map((w, i) => (
          <Rise key={w.id} delay={(i % 2) * 70}>
            <div className="h-full rounded-3xl bg-mist p-6 md:p-8">
              <p className="text-xs text-muted">{w.duration} · {w.level}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{w.description}</p>
              <p className="mt-3 text-xs text-muted">{w.audience}</p>
              <p className="mt-4 text-sm font-medium">{w.price}</p>
            </div>
          </Rise>
        ))}
      </div>
    </PageHero>
  );
}
