import { useCallback, useState } from "react";
import { Head, Hero, GalleryModal } from "@/components/ui";
import { CEREMONIES_DATA } from "@/data/pagData";
import { APPRENANTS_ATTESTATIONS_PHOTOS } from "@/data/ceremonyPhotosData";
import { ceremoniesHallImage, ceremonieLancerToquesImage, diplomeImage } from "@/assets/images";

const PHOTOS = APPRENANTS_ATTESTATIONS_PHOTOS.map((p) => ({ src: p.url, alt: `${p.title} — ${p.caption}` }));

export function Ceremonies() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Hero short image={ceremonieLancerToquesImage} small={<>Remise officielle<br />des parchemins</>} word="Cérémonies" text="Chaque année, les lauréats reçoivent leur diplôme et leur certificat devant leurs proches." position="center 30%" />
      {CEREMONIES_DATA.map((c) => (
        <section key={c.id} className="section">
          <div className="rv"><Head eyebrow={`Édition ${c.editionNumber} · ${c.year}`} title={c.title} text={`${c.theme} ${c.location}`} /></div>
          <div className="stats" style={{ gridTemplateColumns: "1fr 2fr" }}>
            <article className="stat"><small>Lauréats</small><b>{c.graduatesCount}</b><small>Invités : {c.guestOfHonor}</small></article>
            <article className="why-card rv" style={{ boxShadow: "none", background: "transparent", padding: 0 }}>
              <ul style={{ marginTop: 0 }}>{c.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </article>
          </div>
          <div className="duo">
            <img className="rv" src={diplomeImage} alt="Major de promotion en toge" loading="lazy" />
            <img className="rv" src={ceremoniesHallImage} alt="Appel des récipiendaires au Palais des Congrès" loading="lazy" />
          </div>
        </section>
      ))}
      <section className="section">
        <div className="rv"><Head eyebrow="Galerie" title={<>Les lauréats<br />en images</>} text={`${PHOTOS.length} photos de la remise des attestations.`} /></div>
        <div className="photos">
          {PHOTOS.slice(0, 8).map((p) => (
            <button key={p.src} className="rv" onClick={() => setOpen(true)} aria-label="Ouvrir la galerie"><img src={p.src} alt={p.alt} loading="lazy" referrerPolicy="no-referrer" /></button>
          ))}
        </div>
        <div style={{ marginTop: 26 }}><button className="btn btn-dark btn-sm" onClick={() => setOpen(true)}>Voir toutes les photos</button></div>
      </section>
      {open ? <GalleryModal title="Remise des attestations" photos={PHOTOS} onClose={close} /> : null}
    </>
  );
}
