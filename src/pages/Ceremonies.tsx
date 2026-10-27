import { useState } from "react";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { CountUp, DotLink, Meta, Rise } from "@/components/bits";
import { CategoryGallery, type Category } from "@/components/showcase";
import { CEREMONIES_DATA } from "@/data/pagData";
import { APPRENANTS_ATTESTATIONS_PHOTOS } from "@/data/ceremonyPhotosData";
import { ceremoniesHallImage, ceremonieLancerToquesImage, diplomeImage } from "@/assets/images";

const GALLERY: Category = {
  id: "attestations",
  title: "Remise des attestations",
  tags: ["Lauréats", "Cérémonie"],
  body: "Les apprenants reçoivent leur attestation officielle.",
  cover: APPRENANTS_ATTESTATIONS_PHOTOS[0]?.url ?? "",
  coverAlt: APPRENANTS_ATTESTATIONS_PHOTOS[0]?.title ?? "",
  photos: APPRENANTS_ATTESTATIONS_PHOTOS.map((p) => ({ src: p.url, alt: `${p.title} — ${p.caption}` })),
};

export function Ceremonies() {
  const [open, setOpen] = useState(false);
  const preview = APPRENANTS_ATTESTATIONS_PHOTOS.slice(0, 8);
  return (
    <>
      <PageHero
        src={ceremonieLancerToquesImage}
        alt="Lancer de toques par les lauréats"
        kicker="Remise officielle des parchemins"
        title="Cérémonies"
        lead="Chaque année, les lauréats de l'académie reçoivent leur diplôme et leur certificat devant leurs proches."
        position="object-[center_30%]"
      >
        {CEREMONIES_DATA.map((c) => (
          <section key={c.id} className="pb-8">
            <Meta label={`Édition ${c.editionNumber} · ${c.year}`} index="02" />
            <div className="mx-auto max-w-3xl px-5 text-center">
              <Rise>
                <h2 className="text-title font-medium">{c.title}</h2>
              </Rise>
              <p className="mt-4 text-sm italic text-muted">{c.theme}</p>
              <p className="mt-2 text-sm text-muted">{c.location}</p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-10 px-5 md:grid-cols-[0.6fr_1.4fr] md:px-10">
              <Rise>
                <p className="text-stat font-semibold">
                  <CountUp to={c.graduatesCount} />
                </p>
                <p className="mt-3 text-sm text-muted">lauréats</p>
                <p className="mt-6 text-xs text-muted">Invités d'honneur : {c.guestOfHonor}</p>
              </Rise>
              <Rise delay={80}>
                <ul className="space-y-3 text-sm leading-relaxed text-muted">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <i className="mt-2 size-1.5 shrink-0 rounded-sm bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Rise>
            </div>
          </section>
        ))}

        <div className="mx-auto mt-8 grid max-w-6xl gap-3 px-5 md:grid-cols-2 md:gap-4 md:px-10">
          {[
            { src: diplomeImage, alt: "Major de promotion en toge" },
            { src: ceremoniesHallImage, alt: "Appel des récipiendaires au Palais des Congrès" },
          ].map((img, i) => (
            <Rise key={img.src} delay={i * 80}>
              <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" />
            </Rise>
          ))}
        </div>

        <div className="mt-16">
          <Meta label="Galerie" index="03" />
        </div>
        <SectionTitle title="Les lauréats®" text={`${APPRENANTS_ATTESTATIONS_PHOTOS.length} photos de la remise des attestations.`} />
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-5 md:grid-cols-4 md:gap-4 md:px-10">
          {preview.map((p, i) => (
            <Rise key={p.id} delay={(i % 4) * 60}>
              <button type="button" onClick={() => setOpen(true)} aria-label="Ouvrir la galerie" className="shot block w-full overflow-hidden rounded-2xl bg-mist">
                <img src={p.url} alt={p.title} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
              </button>
            </Rise>
          ))}
        </div>
        <div className="flex justify-center px-5 py-12">
          <DotLink onClick={() => setOpen(true)}>Voir toutes les photos</DotLink>
        </div>
      </PageHero>
      {open ? <CategoryGallery category={GALLERY} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
