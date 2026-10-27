import { ContactForm, Head, Hero } from "@/components/ui";
import { CAMPUSES_DATA, FORMATIONS_DATA, SERVICES_DATA } from "@/data/pagData";
import { SOCIALS, WHATSAPP } from "@/data/site";
import { coachingImage } from "@/assets/images";

const TOPICS = [...FORMATIONS_DATA.map((f) => `Formation : ${f.title}`), ...SERVICES_DATA.map((s) => `Service : ${s.title}`)];

export function Contact() {
  return (
    <>
      <Hero short image={coachingImage} small={<>Inscriptions, devis<br />et visites</>} word="Contact" text="Écrivez-nous sur WhatsApp ou passez nous voir sur l'un de nos deux campus." position="center 30%" />
      <section className="section">
        <div className="rv"><Head eyebrow="Écrivez-nous" title={<>Parlons de<br />votre projet</>} text="Notre équipe vous répond rapidement par téléphone ou WhatsApp." /></div>
        <div className="contact-grid">
          <div>
            {CAMPUSES_DATA.map((c) => (
              <article key={c.id} className="campus rv">
                <small>{c.city}</small><h3>{c.name.split(" (")[0]}</h3><p>{c.quarter}</p><p>{c.hours}</p>
                <div className="btns">
                  <a className="btn btn-dark btn-sm" href={`tel:${c.phone.split(" / ")[0]!.replace(/\s/g, "")}`}>{c.phone.split(" / ")[0]}</a>
                  <a className="btn btn-line btn-sm" href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </article>
            ))}
            <div className="socials">{SOCIALS.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
          </div>
          <div className="rv"><ContactForm whatsapp={WHATSAPP} topics={TOPICS} /></div>
        </div>
      </section>
    </>
  );
}
