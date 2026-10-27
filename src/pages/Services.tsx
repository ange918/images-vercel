import { ArrowRight, Film, Palette, PenTool, Printer, Sparkles, Shirt, Layers, type LucideIcon } from "lucide-react";
import { Head, Hero, Ico } from "@/components/ui";
import { useRequests } from "@/components/Requests";
import { SERVICES_DATA } from "@/data/pagData";
import { servicesBannerImage } from "@/assets/images";

const ICONS: Record<string, LucideIcon> = {
  palette: Palette, print: Printer, view_carousel: Layers, videocam: Film, auto_fix_high: Sparkles,
  draw: PenTool, format_paint: Shirt, gesture: PenTool, smart_toy: Sparkles,
};

export function Services() {
  const { openQuote } = useRequests();
  return (
    <>
      <Hero short image={servicesBannerImage} small={<>L'agence<br />créative PAG</>} word="Services" text="Identité visuelle, impression, sérigraphie et contenu audiovisuel pour les marques béninoises." />
      <section className="section">
        <div className="rv"><Head eyebrow="Agence" title={<>Ce que nous<br />réalisons pour vous</>} text="Chaque projet est mené par l'équipe PAG, avec les apprenants en atelier." /></div>
        <div className="why">
          {SERVICES_DATA.map((s) => (
            <article key={s.id} className="why-card rv" style={{ display: "flex", flexDirection: "column" }}>
              <Ico icon={ICONS[s.icon] ?? Palette} className="dark" />
              <h3>{s.title}</h3>
              <p style={{ fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>{s.tagline}</p>
              <p>{s.description}</p>
              <ul>{s.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
              <div style={{ marginTop: "auto", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <b style={{ fontSize: 13 }}>{s.basePrice}</b>
                <button className="btn btn-dark btn-sm" onClick={() => openQuote(s.id)}>Demander un devis<ArrowRight size={14} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
