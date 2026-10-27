import { CtaLink, Hero } from "@/components/ui";
import { ceremonieLancerToquesImage } from "@/assets/images";

export function NotFound() {
  return (
    <>
      <Hero short image={ceremonieLancerToquesImage} small={<>Cette page<br />n'existe pas</>} word="404" text="Le lien est peut-être erroné ou la page a été déplacée." />
      <section className="section" style={{ textAlign: "center" }}>
        <CtaLink to="/">Retour à l'accueil</CtaLink>
      </section>
    </>
  );
}
