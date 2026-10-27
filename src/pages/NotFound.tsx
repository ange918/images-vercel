import { DotLink } from "@/components/bits";

export function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center bg-night px-5 text-center text-paper">
      <div>
        <p className="text-stat font-semibold">404</p>
        <p className="mt-3 text-sm text-paper/70">Cette page n'existe pas.</p>
        <div className="mt-8 flex justify-center">
          <DotLink href="/" as="link" tone="paper">Retour à l'accueil</DotLink>
        </div>
      </div>
    </section>
  );
}
