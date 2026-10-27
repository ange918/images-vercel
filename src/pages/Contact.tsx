import { Clock, MapPin, Phone } from "lucide-react";
import { Head, Hero, Ico } from "@/components/ui";
import { ContactForm } from "@/components/Requests";
import { CAMPUSES_DATA } from "@/data/pagData";
import { SOCIALS } from "@/data/site";
import { coachingImage } from "@/assets/images";

export function Contact() {
  return (
    <>
      <Hero short image={coachingImage} small={<>Inscriptions, devis<br />et visites</>} word="Contact" text="Envoyez-nous votre demande ou passez nous voir sur l'un de nos deux campus." position="center 30%" />
      <section className="section">
        <div className="rv"><Head eyebrow="Écrivez-nous" title={<>Parlons de<br />votre projet</>} text="Votre message est transmis directement à l'équipe PAG." /></div>
        <div className="contact-grid">
          <div>
            {CAMPUSES_DATA.map((c) => (
              <article key={c.id} className="campus rv">
                <Ico icon={MapPin} className="dark" /><small>{c.city}</small><h3>{c.name.split(" (")[0]}</h3><p>{c.quarter}</p><p><Clock size={12} style={{ marginRight: 6, verticalAlign: -1 }} />{c.hours}</p>
                <div className="btns">
                  <a className="btn btn-dark btn-sm" href={`tel:${c.phone.split(" / ")[0]!.replace(/\s/g, "")}`}><Phone size={14} />{c.phone.split(" / ")[0]}</a>
                </div>
              </article>
            ))}
            <div className="socials">{SOCIALS.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
          </div>
          <div className="rv"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
