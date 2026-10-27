import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { Marquee, Meta, Rise } from "@/components/bits";
import { cn } from "@/lib/cn";
import { CAMPUSES_DATA, FAQ_DATA, PARTNERS_DATA, TIMELINE_DATA } from "@/data/pagData";
import { ceremonieEscalierImage } from "@/assets/images";

export function About() {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id ?? null);
  return (
    <PageHero
      src={ceremonieEscalierImage}
      alt="Lauréats de PAG sur l'escalier de la cérémonie"
      kicker="Depuis 2012 · Cotonou et Porto-Novo"
      title="À propos"
      lead="De l'atelier de sérigraphie de Porto-Novo à l'académie reconnue par l'État."
      position="object-[center_25%]"
    >
      <Meta label="Histoire" index="02" />
      <SectionTitle title="Notre parcours®" />
      <ol className="mx-auto mt-12 max-w-4xl px-5 md:px-10">
        {TIMELINE_DATA.map((e) => (
          <Rise key={e.year}>
            <li className="grid gap-2 border-t border-line py-8 md:grid-cols-[9rem_1fr] md:gap-8">
              <p className="text-title font-semibold">{e.year}</p>
              <div>
                {e.badge ? <span className="mb-2 inline-block rounded-full bg-mist px-3 py-1 text-xs font-medium">{e.badge}</span> : null}
                <h3 className="text-lg font-semibold tracking-tight">{e.title}</h3>
                <p className="mt-1 text-sm font-medium text-muted">{e.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{e.description}</p>
              </div>
            </li>
          </Rise>
        ))}
      </ol>

      <div className="mt-16">
        <Meta label="Campus" index="03" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2 md:px-10">
        {CAMPUSES_DATA.map((c, i) => (
          <Rise key={c.id} delay={i * 80}>
            <div className="h-full rounded-3xl bg-mist p-6 md:p-8">
              <p className="text-xs text-muted">{c.city}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{c.name}</h3>
              <p className="mt-3 text-sm text-muted">{c.quarter}</p>
              <ul className="mt-4 space-y-1 text-sm text-muted">
                {c.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
            </div>
          </Rise>
        ))}
      </div>

      <div className="mt-16">
        <Marquee items={PARTNERS_DATA.map((p) => p.name).slice(0, 14)} />
      </div>

      <div className="mt-16">
        <Meta label="Questions fréquentes" index="04" />
      </div>
      <div className="mx-auto max-w-3xl px-5 pb-16 md:px-10">
        {FAQ_DATA.map((f) => {
          const open = openId === f.id;
          return (
            <div key={f.id} className="border-b border-line">
              <button type="button" aria-expanded={open} onClick={() => setOpenId(open ? null : f.id)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                <span className="text-base font-semibold tracking-tight">{f.question}</span>
                <Plus className={cn("size-5 shrink-0 transition-transform duration-300", open && "rotate-45")} />
              </button>
              {open ? (
                <div className="price-in pb-5">
                  <p className="text-sm leading-relaxed text-muted">{f.answer}</p>
                  {f.highlight ? <p className="mt-3 text-xs font-medium">{f.highlight}</p> : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </PageHero>
  );
}
