import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BadgeCheck, Briefcase, CalendarDays, MapPin, PhoneCall, ClipboardList, FileCheck2 } from "lucide-react";
import { SiteNav } from "@/components/Layout";
import { Ico } from "@/components/ui";
import { RegistrationForm } from "@/components/Requests";
import { FORMATIONS_DATA, PAG_FACTS, WORKSHOPS_DATA } from "@/data/pagData";
import { ceremonieGroupeCertificatsImage } from "@/assets/images";
import { useHeroLoaded } from "@/lib/useHeroLoaded";

const STEPS = [
  { icon: ClipboardList, t: "Vous remplissez le formulaire", d: "Quelques minutes suffisent." },
  { icon: PhoneCall, t: "L'équipe vous rappelle", d: "Pour répondre à vos questions et vous orienter." },
  { icon: FileCheck2, t: "Vous finalisez votre dossier", d: "Pièces à fournir et paiement de l'inscription." },
];

export function Signup() {
  const ref = useRef<HTMLElement>(null);
  useHeroLoaded(ref);
  const [params] = useSearchParams();
  const [chosen, setChosen] = useState(params.get("formation") ?? FORMATIONS_DATA[0]!.id);

  const formation = FORMATIONS_DATA.find((f) => f.id === chosen);
  const workshop = WORKSHOPS_DATA.find((w) => w.id === chosen);
  const image = formation?.imageUrl ?? ceremonieGroupeCertificatsImage;
  const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

  const summary = formation
    ? [["Durée", formation.duration], ["Scolarité", formation.price], ["Inscription", formation.inscriptionFee]]
    : workshop
      ? [["Durée", workshop.duration], ["Tarif", workshop.price], ["Niveau", workshop.level]]
      : [];

  return (
    <section ref={ref} className="hero signup">
      <SiteNav />
      <div className="signup-grid">
        <aside className="signup-left">
          <img key={image} className="signup-bg" src={image} alt="" />
          <div className="signup-copy">
            <p className="eyebrow from-top" style={step(0)}>{PAG_FACTS.rentree.status}</p>
            <h1 className="from-top" style={step(1)}>Rejoignez la promotion du {PAG_FACTS.rentree.date}</h1>
            <p className="sub from-top" style={step(2)}>
              Formez-vous aux métiers du graphisme, de la sérigraphie et du contenu multimédia, avec un stage garanti et un diplôme reconnu.
            </p>

            {summary.length > 0 ? (
              <div className="signup-sum from-left" style={step(3)}>
                <p className="sum-title">{formation?.title ?? `Atelier : ${workshop?.title}`}</p>
                <dl>
                  {summary.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              </div>
            ) : null}

            <ul className="signup-points from-left" style={step(4)}>
              <li><Ico icon={Briefcase} size={16} /><span>Stage en entreprise garanti</span></li>
              <li><Ico icon={BadgeCheck} size={16} /><span>Certificat PAG et préparation au Diplôme d'État</span></li>
              <li><Ico icon={MapPin} size={16} /><span>Campus de {PAG_FACTS.citiesSentence}</span></li>
              <li><Ico icon={CalendarDays} size={16} /><span>{PAG_FACTS.rentree.long}</span></li>
            </ul>
          </div>
        </aside>

        <div className="signup-right">
          <div className="signup-form from-right" style={step(2)}>
            <p className="eyebrow">Inscription</p>
            <h2>Votre demande d'inscription</h2>
            <p className="intro">Renseignez vos coordonnées : l'équipe PAG vous recontacte pour finaliser votre dossier.</p>
            <div className="form-card plain">
              <RegistrationForm
                formationId={chosen}
                onFormationChange={setChosen}
                after={<Link to="/" className="btn btn-dark">Retour à l'accueil</Link>}
              />
            </div>
            <ol className="signup-steps">
              {STEPS.map((s, i) => (
                <li key={s.t}><span className="n">{i + 1}</span><span><b>{s.t}</b><small>{s.d}</small></span></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
