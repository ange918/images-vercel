import { CtaLink, Head, Hero } from "@/components/ui";
import { SERVICES_DATA } from "@/data/pagData";
import { servicesBannerImage } from "@/assets/images";
import { WHATSAPP } from "@/data/site";

export function Services() {
  return (
    <>
      <Hero short image={servicesBannerImage} small={<>L'agence<br />créative PAG</>} word="Services" text="Identité visuelle, impression, sérigraphie et contenu audiovisuel pour les marques béninoises." />
      <section className="section">
        <div className="rv"><Head eyebrow="Agence" title={<>Ce que nous<br />réalisons pour vous</>} text="Chaque projet est mené par l'équipe PAG, avec les apprenants en atelier." /></div>
        <div className="why">
          {SERVICES_DATA.map((s, i) => (
            <article key={s.id} className="why-card rv" style={{ display: "flex", flexDirection: "column" }}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p style={{ fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>{s.tagline}</p>
              <p>{s.description}</p>
              <ul>{s.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
              <div style={{ marginTop: "auto", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <b style={{ fontSize: 13 }}>{s.basePrice}</b>
                <CtaLink to={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Bonjour PAG, je souhaite un devis pour : ${s.title}.`)}`}>Demander un devis</CtaLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
