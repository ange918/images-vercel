/**
 * Équipe affichée sur la page « À propos ».
 * Renseigner `name` (et `photo`) pour afficher le nom ; tant qu'il est vide, seul le poste apparaît.
 */
export interface TeamMember {
  role: string;
  scope: string;
  name?: string;
  photo?: string;
}

export const TEAM: TeamMember[] = [
  { role: "PDG", scope: "Direction générale de Pénielle Art Graphic, vision et partenariats." },
  { role: "Directeur des études", scope: "Programmes, pédagogie et suivi des promotions." },
  { role: "Chef de projet agence", scope: "Pilotage des projets clients de l'agence créative." },
  { role: "Responsable campus Cotonou", scope: "Accueil, inscriptions et vie du campus d'Akpakpa." },
  { role: "Responsable campus Porto-Novo", scope: "Atelier de sérigraphie et campus de Ouando." },
  { role: "Formateurs", scope: "Graphisme, sérigraphie et création de contenu, en atelier." },
];
