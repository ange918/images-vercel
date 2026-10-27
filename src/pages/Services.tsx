import { PageHero, SectionTitle } from "@/components/PageHero";
import { DotLink, Meta, Rise } from "@/components/bits";
import { SERVICES_DATA } from "@/data/pagData";
import { servicesBannerImage, serigraphieImage } from "@/assets/images";
import { WHATSAPP } from "@/data/site";

export function Services() {
  return (
    <PageHero
      src={servicesBannerImage}
      alt="Atelier de l'agence PAG"
      kicker="Agence créative PAG · Cotonou et Porto-Novo"
      title="Services"
      lead="Identité visuelle, impression, sérigraphie et contenu audiovisuel pour les marques béninoises."
    >
      <Meta label="Agence" index="02" />
      <SectionTitle title="Ce que nous réalisons®" text="Chaque projet est mené par l'équipe PAG, avec les apprenants en atelier." />
      <div className="mx-auto mt-12 grid max-w-6xl gap-5 px-5 pb-16 md:grid-cols-2 md:px-10">
        {SERVICES_DATA.map((s, i) => {
          const message = encodeURIComponent(`Bonjour PAG, je souhaite un devis pour : ${s.title}.`);
          return (
            <Rise key={s.id} delay={(i % 2) * 80}>
              <article className="flex h-full flex-col rounded-3xl bg-mist p-6 md:p-8">
                <p className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm font-medium">{s.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3">
                      <i className="mt-2 size-1.5 shrink-0 rounded-sm bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                  {s.basePrice ? <p className="text-sm font-semibold">{s.basePrice}</p> : <span />}
                  <DotLink href={`https://wa.me/${WHATSAPP}?text=${message}`}>Demander un devis</DotLink>
                </div>
              </article>
            </Rise>
          );
        })}
      </div>
      <div className="mx-auto max-w-5xl px-5 pb-16 md:px-10">
        <Rise>
          <img src={serigraphieImage} alt="Objets personnalisés en sérigraphie" loading="lazy" className="aspect-[16/9] w-full rounded-3xl object-cover" />
        </Rise>
      </div>
    </PageHero>
  );
}
