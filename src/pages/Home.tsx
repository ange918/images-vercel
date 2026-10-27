import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { DotLink, CountUp, Marquee, Meta, PinnedBleed, Rise, StepEdge } from "@/components/bits";
import { PinnedCards, type StackItem } from "@/components/showcase";
import {
  FORMATIONS_DATA,
  PAG_FACTS,
  PARTNERS_DATA,
  TESTIMONIALS_DATA,
} from "@/data/pagData";
import {
  ceremonieCiergesEstradeImage,
  ceremonieEscalierImage,
  ceremonieGroupeCertificatsImage,
  ceremonieLancerToquesImage,
  ceremonieLaureatsAssisImage,
  classroomImage,
  coachingImage,
  diplomeImage,
  salleInformatiqueImage,
  serigraphieImage,
} from "@/assets/images";

const MARQUEE = ["Graphisme Design", "Sérigraphie", "Création de contenu", "Identité visuelle", "Impression textile", "Montage vidéo", "Diplôme d'État", "Cotonou", "Porto-Novo"];

const STATS = [
  { to: 1500, suffix: "+", label: "diplômés formés" },
  { to: 18, suffix: "", label: "agences partenaires" },
  { to: 6, suffix: "", label: "cérémonies de remise des parchemins" },
  { to: 2, suffix: "", label: "campus : Cotonou et Porto-Novo" },
];

const FAN = [
  { src: ceremonieGroupeCertificatsImage, alt: "Groupe de lauréats avec leurs certificats" },
  { src: ceremonieEscalierImage, alt: "Lauréats sur l'escalier de la cérémonie" },
  { src: ceremonieLancerToquesImage, alt: "Lancer de toques à la fin de la cérémonie" },
  { src: diplomeImage, alt: "Lauréat en toge avec son diplôme" },
  { src: ceremonieLaureatsAssisImage, alt: "Lauréats assis pendant la cérémonie" },
  { src: ceremonieCiergesEstradeImage, alt: "Estrade de la cérémonie éclairée par des cierges" },
];

const FORMATION_IMAGES: Record<string, { src: string; position: string }> = {
  "formation-graphisme": { src: salleInformatiqueImage, position: "object-[center_40%]" },
  "formation-serigraphie": { src: serigraphieImage, position: "object-center" },
  "creation-contenu-multimedia": { src: coachingImage, position: "object-[center_30%]" },
};

const STACK: StackItem[] = FORMATIONS_DATA.map((f) => ({
  title: f.title,
  meta: `${f.duration} · ${f.diplomaBadge}. ${f.tagline ?? ""}`,
  src: FORMATION_IMAGES[f.id]?.src ?? classroomImage,
  alt: `Formation ${f.title}`,
  position: FORMATION_IMAGES[f.id]?.position,
}));

function Fan() {
  const [shift, setShift] = useState(0);
  const mid = (FAN.length - 1) / 2;
  return (
    <>
      <div
        className="relative mx-auto hidden h-[440px] max-w-5xl items-center justify-center md:flex"
        style={{ perspective: "1400px" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setShift((e.clientX - rect.left) / rect.width - 0.5);
        }}
        onMouseLeave={() => setShift(0)}
      >
        {FAN.map((shot, i) => {
          const d = i - mid + shift * 1.5;
          return (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              className="absolute h-80 w-48 rounded-2xl object-cover shadow-2xl transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${d * 96}px) translateZ(${-Math.abs(d) * 70}px) rotateY(${d * -14}deg)`,
                zIndex: 20 - Math.round(Math.abs(d) * 2),
              }}
            />
          );
        })}
      </div>
      <div className="hide-bar flex snap-x gap-3 overflow-x-auto px-5 md:hidden">
        {FAN.map((shot) => (
          <img key={shot.src} src={shot.src} alt={shot.alt} loading="lazy" decoding="async" className="h-64 w-44 shrink-0 snap-center rounded-2xl object-cover" />
        ))}
      </div>
    </>
  );
}

export function Home() {
  const testimonials = TESTIMONIALS_DATA.slice(0, 3);
  const partners = PARTNERS_DATA.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <div className="relative">
        <PinnedBleed priority src={ceremonieGroupeCertificatsImage} alt="Lauréats de Pénielle Art Graphic avec leurs certificats" position="object-[center_35%]">
          <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-night/30" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 pb-[15svh] md:p-10 md:pb-[13svh]">
            <p className="max-w-xs text-xs leading-relaxed text-paper md:text-sm">
              Académie et agence créative au Bénin : graphisme, sérigraphie, création de contenu.
            </p>
            <p className="hero-word mt-3 font-semibold leading-[0.8] tracking-tighter text-paper">
              PAG<span className="text-[#93c5fd]">*</span>
            </p>
            <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3 md:mt-8">
              <Link to="/formations" className="press inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-ink">
                Voir les formations
                <ArrowUpRight className="size-4" />
              </Link>
              <Link to="/contact" className="press inline-flex items-center gap-2 rounded-full border border-paper/60 bg-paper/10 px-6 py-3.5 text-sm font-medium text-paper backdrop-blur">
                S'inscrire
              </Link>
            </div>
          </div>
        </PinnedBleed>

        <section className="relative z-10 bg-paper pb-8">
          <StepEdge />
          <div className="mx-auto max-w-3xl px-5 pt-16 text-center md:pt-24">
            <Rise>
              <p className="text-title font-medium">
                Pénielle Art Graphic forme les créatifs de demain et accompagne les marques d'aujourd'hui, à {PAG_FACTS.citiesSentence}.®
              </p>
            </Rise>
            <div className="mt-8 flex justify-center">
              <DotLink href="/a-propos" as="link">Découvrir PAG</DotLink>
            </div>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-10 px-5 md:grid-cols-2 md:px-10">
            <Rise>
              <h2 className="text-sm font-semibold">{PAG_FACTS.rentree.long}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {PAG_FACTS.rentree.status}. Scolarité à partir de 250 000 FCFA, payable en tranches pour le graphisme.
              </p>
            </Rise>
            <Rise delay={80}>
              <h2 className="text-sm font-semibold">Une académie, une agence</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Les apprenants se forment en atelier sur de vrais projets, et l'agence PAG réalise vos supports de communication.
              </p>
            </Rise>
          </div>
          <div className="mt-12">
            <Marquee items={MARQUEE} />
          </div>
        </section>
      </div>

      <section className="bg-paper pt-8">
        <Meta label="Chiffres" index="02" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 sm:grid-cols-2 md:grid-cols-4 md:px-10">
          {STATS.map((s) => (
            <Rise key={s.label}>
              <p className="text-stat font-semibold">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[14rem] text-sm text-muted">{s.label}</p>
            </Rise>
          ))}
        </div>
      </section>

      <div className="relative">
        <PinnedBleed src={classroomImage} alt="Salle de cours de l'académie PAG" position="object-[center_40%]" />
        <section className="relative z-10 bg-paper">
          <StepEdge />
          <Meta label="Formations" index="03" />
          <PinnedCards
            items={STACK}
            intro={
              <>
                <Rise>
                  <h2 className="text-display font-semibold">Formations®</h2>
                </Rise>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                  Trois cursus professionnels, du certificat PAG au Diplôme d'État (CQM).
                </p>
                <div className="mt-6 md:mt-8">
                  <DotLink href="/formations" as="link">Toutes les formations</DotLink>
                </div>
              </>
            }
          />
        </section>
      </div>

      <section className="bg-paper pt-8">
        <Meta label="Cérémonies" index="04" />
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Rise>
            <h2 className="text-display font-semibold">Chaque lauréat compte.</h2>
          </Rise>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Remise des parchemins, toges et attestations : les temps forts de la vie de l'académie.
          </p>
          <div className="mt-6 flex justify-center">
            <DotLink href="/ceremonies" as="link">Voir les cérémonies</DotLink>
          </div>
        </div>
        <div className="mt-12 pb-8">
          <Fan />
        </div>
      </section>

      <section className="bg-paper pt-8">
        <Meta label="Témoignages" index="05" />
        <div className="mx-auto grid max-w-6xl gap-5 px-5 pb-16 md:grid-cols-3 md:px-10">
          {testimonials.map((t, i) => (
            <Rise key={t.id} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-3xl bg-mist p-6 md:p-8">
                <blockquote className="flex-1 text-sm leading-relaxed">« {t.quote} »</blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="mt-1 text-xs text-muted">{t.role}</p>
                  <p className="mt-3 inline-block rounded-full bg-paper px-3 py-1 text-xs font-medium">{t.highlight}</p>
                </figcaption>
              </figure>
            </Rise>
          ))}
        </div>
        {partners.length > 0 ? (
          <div className="pb-8">
            <Marquee items={partners.map((p) => p.name)} />
          </div>
        ) : null}
      </section>

      <section className="bg-night px-5 py-24 text-center text-paper md:px-10">
        <Rise>
          <h2 className="text-display font-semibold">Prêt à créer avec PAG ?</h2>
        </Rise>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/70">
          {PAG_FACTS.rentree.long} · {PAG_FACTS.citiesLabel}
        </p>
        <div className="mt-8 flex justify-center">
          <DotLink href="/contact" as="link" tone="paper">
            <span className="text-paper">Nous contacter</span>
          </DotLink>
        </div>
      </section>
    </>
  );
}
