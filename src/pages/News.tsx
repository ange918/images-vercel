import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { DotLink, Meta, Rise } from "@/components/bits";
import { ARTICLES_DATA } from "@/data/pagData";
import { classroomImage } from "@/assets/images";

const LABELS: Record<string, string> = {
  "vie-du-centre": "Vie du centre",
  "astuces-design": "Astuces design",
  evenements: "Événements",
  metiers: "Métiers",
};

export function News() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <PageHero src={classroomImage} alt="Salle de cours de l'académie PAG" kicker="Vie du centre, astuces et événements" title="Actualités" position="object-[center_40%]">
      <Meta label="Articles" index="02" />
      <div className="mx-auto max-w-4xl px-5 pb-16 md:px-10">
        {ARTICLES_DATA.map((a) => {
          const open = openId === a.id;
          return (
            <Rise key={a.id}>
              <article className="border-t border-line py-8">
                <p className="text-xs text-muted">{LABELS[a.category] ?? a.category} · {a.date} · {a.readTime}</p>
                <h2 className="mt-2 text-title font-semibold">{a.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{a.summary}</p>
                {open ? (
                  <div className="price-in mt-4 max-w-2xl space-y-3 text-sm leading-relaxed">
                    {a.content.split("\n").filter(Boolean).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    <p className="text-xs text-muted">Par {a.author}</p>
                  </div>
                ) : null}
                <div className="mt-5">
                  <DotLink onClick={() => setOpenId(open ? null : a.id)}>{open ? "Réduire" : "Lire l'article"}</DotLink>
                </div>
              </article>
            </Rise>
          );
        })}
      </div>
    </PageHero>
  );
}
