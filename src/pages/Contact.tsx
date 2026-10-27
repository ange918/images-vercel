import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Meta, Rise } from "@/components/bits";
import { ContactForm } from "@/components/contact-form";
import { CAMPUSES_DATA, FORMATIONS_DATA, SERVICES_DATA } from "@/data/pagData";
import { SOCIALS, WHATSAPP } from "@/data/site";
import { coachingImage } from "@/assets/images";

const TOPICS = [...FORMATIONS_DATA.map((f) => `Formation : ${f.title}`), ...SERVICES_DATA.map((s) => `Service : ${s.title}`)];

export function Contact() {
  return (
    <PageHero src={coachingImage} alt="Accompagnement d'une apprenante par sa formatrice" kicker="Inscriptions, devis et visites des campus" title="Contact" position="object-[center_30%]">
      <Meta label="Écrivez-nous" index="02" />
      <div className="grid gap-10 px-5 pb-16 md:grid-cols-2 md:px-10">
        <div className="space-y-5">
          {CAMPUSES_DATA.map((c, i) => (
            <Rise key={c.id} delay={i * 80}>
              <div className="rounded-3xl bg-mist p-6 md:p-8">
                <p className="text-xs text-muted">{c.city}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{c.name.split(" (")[0]}</p>
                <p className="mt-2 text-sm text-muted">{c.quarter}</p>
                <p className="mt-2 text-sm text-muted">{c.hours}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`tel:${c.phone.split(" / ")[0]!.replace(/\s/g, "")}`} className="press inline-flex items-center gap-2 rounded-full bg-night px-5 py-3 text-sm font-medium text-paper">
                    {c.phone.split(" / ")[0]}
                  </a>
                  <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" className="press inline-flex items-center gap-2 rounded-full border border-night px-5 py-3 text-sm font-medium">
                    WhatsApp
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </Rise>
          ))}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 px-2 text-sm">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Rise delay={80}>
          <ContactForm whatsapp={WHATSAPP} topics={TOPICS} />
        </Rise>
      </div>
    </PageHero>
  );
}
