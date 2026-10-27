import {
  FormationItem,
  ServiceItem,
  WorkshopItem,
  CeremonyEdition,
  TimelineEvent,
  ArticleItem,
  DiplomaRecord,
  PartnerItem,
  TestimonialItem,
  FaqItem,
} from '../types';
import {
  classroomImage,
  salleInformatiqueImage,
  coachingImage,
  serigraphieImage,
  diplomeImage,
  ceremoniesHallImage,
} from '../assets/images';
import { APPRENANTS_ATTESTATIONS_PHOTOS } from './ceremonyPhotosData';

// ==========================================
// 0. FAITS DE L'ÉCOLE — SOURCE UNIQUE
// Les informations qui changent d'une rentrée à l'autre vivent ici et nulle
// part ailleurs : date de rentrée, tarif, rythmes et villes. Une prochaine
// session se corrige donc en une seule ligne, sans risque de laisser une page
// annoncer un prix que la page suivante contredit.
// ==========================================
export const PAG_FACTS = {
  rentree: {
    date: '19 octobre 2026',
    long: 'Rentrée du 19 octobre 2026',
    short: 'Rentrée : 19 octobre 2026',
    status: 'Inscriptions ouvertes',
  },
  tuition: {
    amount: '390 000 FCFA',
    label: 'Scolarité',
    note: 'Payable en 3 tranches (150 000 / 120 000 / 120 000 FCFA)',
    inscription: '10 000 FCFA',
    scolarite: '390 000 FCFA (donnant droit au certificat PAG)',
    tranches: [
      { label: '1ère Tranche', deadline: 'À la rentrée', amount: '150 000 FCFA' },
      { label: '2ème Tranche', deadline: '1 mois après la rentrée', amount: '120 000 FCFA' },
      { label: '3ème Tranche', deadline: '2 mois après la rentrée', amount: '120 000 FCFA' },
    ],
    fraisDivers: [
      { item: '02 Uniformes', amount: '15 000 FCFA' },
      { item: "Examen d'État (CQM - Certificat de Qualification au Métier)", amount: '20 000 FCFA' },
    ],
    piecesAFournir: [
      "01 copie légalisée de l'acte de naissance",
      '01 copie de la carte nationale d\'identité',
      '01 copie du dernier diplôme obtenu',
      '03 photos d\'identité',
      '01 Ramette de papier',
    ],
    materielsRequis: [
      '01 Ordinateur portable (Core i5/i7, 12 Go RAM min, HDD 500 Go / SSD 250 Go min)',
      'Clé USB (32 Go / 64 Go)',
      'Bloc-notes, bic, crayon, 02 cahiers',
    ],
  },
  rythmes: {
    standard: {
      name: 'Programme standard',
      duration: '12 mois',
      schedule: 'Du Lundi au Jeudi, de 08h à 13h',
      audience: 'Apprenants en formation initiale & certifiante',
    },
  },
  cities: ['Cotonou', 'Porto-Novo'] as const,
  citiesLabel: 'Cotonou • Porto-Novo',
  citiesSentence: 'Cotonou et Porto-Novo',
  campusCount: 2,
} as const;

/**
 * Détails complets et certifiés de la formation en Graphisme Design.
 */
export const GRAPHISME_DESIGN_DETAILS = {
  title: 'Graphisme Design',
  duration: '12 mois',
  inscription: '10 000 FCFA',
  scolarite: '390 000 FCFA (donnant droit au certificat PAG)',
  scolariteAmount: '390 000 FCFA',
  certificat: 'Certificat PAG',
  examenEtat: "Examen d'État (CQM - Certificat de Qualification au Métier)",
  examenEtatCost: '20 000 FCFA',
  schedule: 'Du Lundi au Jeudi, de 08h à 13h',
  tranches: [
    {
      label: '1ère Tranche',
      deadline: 'À la rentrée',
      amount: '150 000 FCFA',
    },
    {
      label: '2ème Tranche',
      deadline: '1 mois après la rentrée',
      amount: '120 000 FCFA',
    },
    {
      label: '3ème Tranche',
      deadline: '2 mois après la rentrée',
      amount: '120 000 FCFA',
    },
  ],
  fraisDivers: [
    {
      item: '02 Uniformes',
      amount: '15 000 FCFA',
    },
    {
      item: "Examen d'État (CQM - Certificat de Qualification au Métier)",
      amount: '20 000 FCFA',
    },
  ],
  piecesAFournir: [
    "01 copie légalisée de l'acte de naissance",
    '01 copie de la carte nationale d\'identité',
    '01 copie du dernier diplôme obtenu',
    '03 photos d\'identité',
    '01 Ramette de papier',
  ],
  materielsRequis: [
    '01 Ordinateur portable (Core i5/i7, 12 Go RAM min, HDD 500 Go / SSD 250 Go min)',
    'Clé USB (32 Go / 64 Go)',
    'Bloc-notes, bic, crayon, 02 cahiers',
  ],
} as const;

/**
 * Détails officiels de la formation en Sérigraphie.
 */
export const SERIGRAPHIE_DETAILS = {
  title: 'Sérigraphie',
  subTitle: 'Sérigraphie artisanale, moderne et digitale',
  duration: '6 mois',
  scolariteAmount: '250 000 FCFA',
  scolarite: '250 000 FCFA (donnant droit au certificat PAG)',
  inscription: '10 000 FCFA',
  lacoste: '7 000 FCFA',
  certificat: 'Certificat PAG',
  inclus: ['Orientation', 'Lot de matériels de base', 'Tablier'],
  fraisDivers: [
    { item: 'Lacoste officiel PAG', amount: '7 000 FCFA' },
  ],
} as const;

/**
 * Détails officiels de la formation en Création de Contenu Multimédia.
 */
export const CREATION_CONTENU_DETAILS = {
  title: 'Création de Contenu Multimédia',
  subTitle: 'Création de visuels percutants, montage vidéo, maîtrise des réseaux sociaux : Facebook, Instagram, TikTok, LinkedIn',
  duration: '3 mois',
  scolariteAmount: '250 000 FCFA',
  scolarite: '250 000 FCFA',
  inscription: '10 000 FCFA',
  lacoste: '7 000 FCFA',
  certificat: 'Certificat PAG',
  competences: [
    'Création de visuels percutants',
    'Montage vidéo professionnel',
    'Maîtrise des réseaux sociaux : Facebook, Instagram, TikTok, LinkedIn',
  ],
  fraisDivers: [
    { item: 'Lacoste officiel PAG', amount: '7 000 FCFA' },
  ],
} as const;

// ==========================================
// 1. FORMATIONS CERTIFIANTES
// ==========================================
export const FORMATIONS_DATA: FormationItem[] = [
  {
    id: 'formation-graphisme',
    title: 'Graphisme Design',
    category: 'Arts Graphiques & Communication Visuelle',
    diplomaBadge: "Certificat PAG & Diplôme d'État (CQM)",
    diplomaType: 'etat',
    objectives:
      'Maîtrisez Photoshop, Illustrator, InDesign et les principes fondamentaux du design graphique afin de créer des supports de communication modernes et professionnels.',
    tagline: 'Créez des designs qui marquent les esprits',
    skillsAcquired: [
      "Maîtrise d'Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Design d'identité visuelle & chartes graphiques",
      'Mise en page professionnelle & édition',
      'Typographie, colorimétrie et composition visuelle',
      'Design web, packaging et supports digitaux',
    ],
    description:
      'Formation intensive de 12 mois en Graphisme Design. Maîtrisez la suite Adobe, concevez des identités percutantes et préparez le Certificat PAG ainsi que le Diplôme d\'État (CQM).',
    duration: GRAPHISME_DESIGN_DETAILS.duration,
    price: GRAPHISME_DESIGN_DETAILS.scolariteAmount,
    inscriptionFee: GRAPHISME_DESIGN_DETAILS.inscription,
    campuses: PAG_FACTS.citiesLabel,
    imageUrl: salleInformatiqueImage,
    installments: '3 tranches : 150 000 F (rentrée), 120 000 F (+1 mois), 120 000 F (+2 mois)',
    remainingSpots: 7,
    totalSpots: 25,
    startDate: PAG_FACTS.rentree.long,
    prerequisites: 'Passion pour les arts visuels et aisance avec l’outil informatique.',
    software: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma'],
    schedule: GRAPHISME_DESIGN_DETAILS.schedule,
    tranches: GRAPHISME_DESIGN_DETAILS.tranches,
    fraisDivers: GRAPHISME_DESIGN_DETAILS.fraisDivers,
    piecesAFournir: GRAPHISME_DESIGN_DETAILS.piecesAFournir,
    materielsRequis: GRAPHISME_DESIGN_DETAILS.materielsRequis,
    recommendation:
      'Formation de base recommandée : le graphisme constitue le socle de la communication visuelle et de nombreux métiers créatifs.',
  },
  {
    id: 'formation-serigraphie',
    title: 'Sérigraphie',
    subTitle: 'Sérigraphie artisanale, moderne et digitale',
    category: 'Impression Textile & Publicitaire',
    diplomaBadge: 'Certificat PAG',
    diplomaType: 'pag',
    objectives:
      'Maîtrisez la sérigraphie artisanale, moderne et digitale. De la préparation des écrans d’insolation jusqu’au tirage sur textiles et objets publicitaires, développez un savoir-faire complet donnant droit au certificat PAG.',
    tagline: 'Sérigraphie artisanale, moderne et digitale',
    skillsAcquired: [
      'Sérigraphie artisanale & insolation UV',
      'Sérigraphie moderne & encres techniques',
      'Impression et séparation digitale',
      'Marquage textile (t-shirts, polos, tote-bags, casquettes)',
      'Finition et contrôle de qualité professionnelle',
    ],
    description:
      'Formation certifiante de 6 mois en Sérigraphie (artisanale, moderne et digitale). Inclus : Orientation, lot de matériels de base et tablier.',
    duration: SERIGRAPHIE_DETAILS.duration,
    price: SERIGRAPHIE_DETAILS.scolariteAmount,
    inscriptionFee: SERIGRAPHIE_DETAILS.inscription,
    lacosteFee: SERIGRAPHIE_DETAILS.lacoste,
    inclus: SERIGRAPHIE_DETAILS.inclus,
    campuses: PAG_FACTS.citiesLabel,
    imageUrl: serigraphieImage,
    installments: 'Scolarité : 250 000 FCFA (Certificat PAG) • Inscription : 10 000 FCFA',
    remainingSpots: 5,
    totalSpots: 18,
    startDate: PAG_FACTS.rentree.long,
    prerequisites: 'Accessible à tous, créateurs de marques et passionnés d’artisanat.',
    software: ['Insolation UV', 'Carrousel Sérigraphique', 'Encres Plastisol & Eau', 'Photoshop pour Typons'],
    fraisDivers: SERIGRAPHIE_DETAILS.fraisDivers,
  },
  {
    id: 'creation-contenu-multimedia',
    title: 'Création de Contenu Multimédia',
    subTitle: 'Création de visuels percutants, montage vidéo, maîtrise des réseaux sociaux : Facebook, Instagram, TikTok, LinkedIn',
    category: 'Audiovisuel & Numérique',
    diplomaBadge: 'Certificat PAG',
    diplomaType: 'pag',
    objectives:
      'Maîtrisez la création de visuels percutants, le montage vidéo dynamique et la gestion stratégique des réseaux sociaux : Facebook, Instagram, TikTok, LinkedIn.',
    tagline: 'Visuels percutants, montage vidéo & réseaux sociaux',
    skillsAcquired: [
      'Création de visuels percutants (Canva Pro & Photoshop)',
      'Montage vidéo professionnel (CapCut, Premiere Pro)',
      'Maîtrise des réseaux sociaux : Facebook & Instagram',
      'Maîtrise de TikTok & storytelling viral',
      'Stratégie de communication & prospection sur LinkedIn',
    ],
    description:
      'Formation intensive de 3 mois en Création de Contenu Multimédia : visuels percutants, montage vidéo et maîtrise des réseaux sociaux (Facebook, Instagram, TikTok, LinkedIn).',
    duration: CREATION_CONTENU_DETAILS.duration,
    price: CREATION_CONTENU_DETAILS.scolariteAmount,
    inscriptionFee: CREATION_CONTENU_DETAILS.inscription,
    lacosteFee: CREATION_CONTENU_DETAILS.lacoste,
    campuses: PAG_FACTS.citiesLabel,
    imageUrl: coachingImage,
    installments: 'Scolarité : 250 000 FCFA • Inscription : 10 000 FCFA',
    remainingSpots: 8,
    totalSpots: 20,
    startDate: PAG_FACTS.rentree.long,
    prerequisites: 'Aisance avec les smartphones/ordinateurs et appétence pour la vidéo.',
    software: ['Adobe Premiere Pro', 'CapCut Pro', 'Canva Pro', 'Photoshop'],
    fraisDivers: CREATION_CONTENU_DETAILS.fraisDivers,
  },
];

export const FORMATIONS_LIST = FORMATIONS_DATA;

// ==========================================
// 2. PAG SERVICES (PÔLE COMMERCIAL & AGENCE)
// ==========================================
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'graphisme-branding',
    title: 'Graphisme & Identité Visuelle',
    tagline: 'Donnez à votre marque une personnalité inoubliable et cohérente.',
    description:
      "De la conception de votre logotype original à la création de votre charte graphique complète, nous façonnons des univers visuels professionnels qui séduisent vos clients et valorisent votre crédibilité sur le marché.",
    icon: 'palette',
    deliverables: [
      'Logo vectoriel & déclinaisons complètes (PNG, SVG, PDF, AI)',
      'Charte graphique (Typographies, palette chromatique, règles d’usage)',
      'Supports de communication (Cartes de visite, papier en-tête, chemises)',
      'Dépliants, flyers, brochures commerciales & catalogues produits',
      'Kits visuels pour réseaux sociaux (Bannières, templates Canva/PSD)',
    ],
    basePrice: 'À partir de 50 000 FCFA',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjL3t1cI2yR9jZzXvK4mP8sT9wB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV0wX1yZ2aB3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ5aB6cD7eF8gH9iJ0kL1mN2oP3qR4sT5uV6wX7yZ8aB9cD0eF1gH2iJ3kL4mN5oP6qR7sT8uV9wX0yZ1aB2cD3eF4gH5iJ6kL7mN8oP9qR',
        title: 'Identité de marque Sika Cosmétiques',
        subtitle: 'Logo, packaging flacon et charte de luxe',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoG4w8rJ5vX7lMzT2kP6sT8wB9cD0eF1gH2iJ3kL4mN5oP6qR7sT8uV9wX0yZ1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN1oP2qR3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2kL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR',
        title: 'Affiche & Branding Festival Vodun Days',
        subtitle: 'Déclinaison grand format et supports de presse',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkR7u3vY6zX9mN0sP4tT6wB8cD0eF2gH4iJ6kL8mN0oP2qR4sT6uV8wX0yZ2aB4cD6eF8gH0iJ2kL4mN6oP8qR0sT2uV4wX6yZ8aB0cD2eF4gH6iJ8kL0mN2oP4qR6sT8uV0wX2yZ4aB6cD8eF0gH2iJ4kL6mN8oP0qR2sT4uV6wX8yZ0aB2cD4eF6gH8iJ0kL2mN4oP6qR',
        title: 'Packaging Agroalimentaire Dossi Miel',
        subtitle: 'Étiquette bilingue avec dorure à chaud et QR code',
      },
    ],
  },
  {
    id: 'serigraphie-textile',
    title: 'Sérigraphie & Marquage Textile',
    tagline: 'L’excellence de l’impression textile haute définition au Bénin.',
    description:
      "Équipés d'ateliers professionnels avec carrousels de précision, insolation UV et encres certifiées lavables à haute température, nous personnalisons vos textiles pour entreprises, événements, marques de mode et associations.",
    icon: 'print',
    deliverables: [
      'T-shirts et polos personnalisés (100% coton peigné, 180g à 220g)',
      'Casquettes brodées, bobs et visières événementielles',
      'Tote bags écologiques en toile de coton et sacs shopping réutilisables',
      'Tenues de travail, uniformes scolaires & gilets de sécurité imprimés',
      'Marquage encre gonflante (Puff), doré/argenté et quadrichromie textile',
    ],
    basePrice: 'À partir de 1 200 FCFA / pièce',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAijX7MiEl25_C6IB7slzYjbksmI1qo7rHpbdhjVzDXZkNVZ3zqkthvhCJ_gs4yNnBzOKos8tRHZkUrA8CwjlniIUXxEIPIq2ljWV1jx-ETeBGAoZY5hcctIGrZmtMV7MvnDF_jgnyf5RalshRsAaaIP1hBWmqzOnHWJ7mjWaD7vv3Qm49R6a5rNpUwFIu_x-wbZRnQvtIAtciuwHlJWSu2aveSnXxhGdUPwKnMFE1RoMBeWEHElYF4OA',
        title: 'Production de T-shirts événementiels',
        subtitle: 'Sérigraphie 3 couleurs pour le Marathon de Cotonou',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrE5v9wT7zX0mP1sQ3tT5wB7cD9eF1gH3iJ5kL7mN9oP1qR3sT5uV7wX9yZ1aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5iJ7kL9mN1oP3qR5sT7uV9wX1yZ3aB5cD7eF9gH1iJ3kL5mN7oP9qR1sT3uV5wX7yZ9aB1cD3eF5gH7iJ9kL1mN3oP5qR',
        title: 'Marquage Tote-bags en toile de jute',
        subtitle: 'Impression encre à l’eau écologique pour marque de mode',
      },
    ],
  },
  {
    id: 'impression-grand-format',
    title: 'Impression Grand Format & Signalétique',
    tagline: 'Captez les regards dans l’espace public et sur vos points de vente.',
    description:
      "Des machines d'impression numérique grand format de dernière génération pour des couleurs éclatantes, une résistance maximale aux intempéries et une finition impeccable.",
    icon: 'view_carousel',
    deliverables: [
      'Bâches lumineuses et bâches tendues pour enseignes commerciales',
      'Roll-ups haut de gamme (85x200cm, 120x200cm) avec sac de transport',
      'Stickers autocollants vinyles (brillants, mats, micro-perforés pour vitrines)',
      'Panneaux alucobond et PVC expansé imprimés direct',
      'Habillage intégral de véhicules de flotte d’entreprise (Car Wrapping)',
    ],
    basePrice: 'Bâche dès 3 500 FCFA / m²',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkR7u3vY6zX9mN0sP4tT6wB8cD0eF2gH4iJ6kL8mN0oP2qR4sT6uV8wX0yZ2aB4cD6eF8gH0iJ2kL4mN6oP8qR0sT2uV4wX6yZ8aB0cD2eF4gH6iJ8kL0mN2oP4qR6sT8uV0wX2yZ4aB6cD8eF0gH2iJ4kL6mN8oP0qR2sT4uV6wX8yZ0aB2cD4eF6gH8iJ0kL2mN4oP6qR',
        title: 'Roll-ups institutionnels Banque Atlantique',
        subtitle: 'Structure alu premium et bâche sans reflet',
      },
    ],
  },
  {
    id: 'creation-contenu-audiovisuel',
    title: 'Création de Contenu & Audiovisuel',
    tagline: 'Des vidéos captivantes et des photos de qualité studio pour vos réseaux.',
    description:
      "Dans l'ère du digital, l'image animée est reine. Notre équipe créative scénarise, tourne et monte des contenus à fort engagement : vidéos courtes pour TikTok & Reels, interviews d'experts, motion design de lancement produit et photos packshot.",
    icon: 'videocam',
    deliverables: [
      'Vidéos Reels / Shorts / TikTok scénarisées et sous-titrées',
      'Animations en Motion Design pour annonces et promotions',
      'Shooting photo studio de produits (Packshot e-commerce)',
      'Couverture photo et vidéo d’événements d’entreprise et conférences',
      'Gestion et animation de calendrier éditorial pour réseaux sociaux',
    ],
    basePrice: 'Pack mensuel dès 90 000 FCFA',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTm937v6y8L8d_1q5yGk2p8z243sFm7lFhV1wN3tG6sA8j8K4lM9nB0vC1xD3eF5gH7iJ9kL1mN3oP5qR7sT9uV1wX3yZ5aB7cD9eF1gH3iJ5kL7mN9oP1qR3sT5uV7wX9yZ1aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5iJ7kL9mN1oP3qR5sT7uV9wX1yZ3aB5cD7eF9gH1iJ3kL5mN7oP9qR1sT3uV5w',
        title: 'Teaser événementiel Cotonou Digital Days',
        subtitle: 'Motion design After Effects avec sound design spatial',
      },
    ],
  },
];

// ==========================================
// 3. ATELIERS PRATIQUES INTENSIFS (MASTERCLASSES)
// ==========================================
export const WORKSHOPS_DATA: WorkshopItem[] = [
  {
    id: 'photoshop-pro',
    title: 'Masterclass Photoshop Pro & Retouche Avancée',
    duration: '3 Jours (21 heures)',
    audience: 'Graphistes, Photographes, Community Managers',
    level: 'Intermédiaire à Avancé',
    price: '35 000 FCFA',
    dates: 'Prochaine session communiquée à l’accueil',
    description:
      'Détourage de cheveux au poil près, technique de séparation des fréquences pour la retouche de peau studio, masques de fusion complexes et colorimétrie cinématographique.',
    icon: 'auto_fix_high',
    topics: [
      'Détourages ultra-précis par couches alpha',
      'Retouche beauté Frequency Separation',
      'Compositing et incrustation photo réaliste',
      'Automatisations et scripts pour gagner 50% de temps',
    ],
  },
  {
    id: 'illustrator-branding',
    title: 'Illustrator & Identité de Marque Vectorielle',
    duration: '4 Jours (28 heures)',
    audience: 'Designers, Étudiants, Créateurs de contenu',
    level: 'Tous niveaux',
    price: '40 000 FCFA',
    dates: 'Prochaine session communiquée à l’accueil',
    description:
      'Maîtrise de la plume, grilles modulaires et proportion dorée pour concevoir des logos intemporels, création de motifs géométriques et export vectoriel certifié imprimeur.',
    icon: 'draw',
    topics: [
      'Dompter l’outil Plume et les courbes de Bézier',
      'Logo Grid System et géométrie sacrée',
      'Création de patterns textiles vectoriels',
      'Préparation de fichiers CMJN prêts pour la sérigraphie',
    ],
  },
  {
    id: 'serigraphie-artisanale',
    title: 'Initiation & Maîtrise de la Sérigraphie Manuelle',
    duration: '5 Jours (35 heures 100% pratique)',
    audience: 'Artisans, Stylistes, Entrepreneurs du textile',
    level: 'Débutant',
    price: '50 000 FCFA',
    dates: 'Prochaine session communiquée à l’accueil',
    description:
      'Chaque participant fabrique ses propres écrans de sérigraphie, prépare ses typons, insoles au soleil et à la table UV, et repart avec sa collection de 10 T-shirts et tote-bags imprimés.',
    icon: 'format_paint',
    topics: [
      'Choix des mailles (43T, 77T, 120T) selon le support',
      'Enduction d’émulsion photosensible et insolation',
      'Techniques de calage pour impression 2 à 4 couleurs',
      'Secrets de polymérisation pour résistance aux lavages répétés',
    ],
  },
  {
    id: 'ia-design-graphique',
    title: 'IA Générative appliquée au Design Graphique',
    duration: '2 Jours (14 heures)',
    audience: 'Directeurs artistiques, Graphistes, Agences',
    level: 'Tous niveaux',
    price: '30 000 FCFA',
    dates: 'Prochaine session communiquée à l’accueil',
    description:
      'Intégrez Midjourney v6, Adobe Firefly et ChatGPT dans votre pipeline créatif quotidien pour concevoir des moodboards clients en 10 minutes et décupler vos idées de branding.',
    icon: 'smart_toy',
    topics: [
      'Prompt engineering visuel pour styles graphiques précis',
      'Vectorisation haute définition d’illustrations IA',
      'Inpainting et Outpainting dans Photoshop avec Firefly',
      'Éthique, droits d’auteur et monétisation des créations IA',
    ],
  },
  {
    id: 'calligraphie-lettering',
    title: 'Calligraphie Moderne & Lettrage Créatif',
    duration: '3 Jours (21 heures)',
    audience: 'Artistes, Typographes, Passionnés d’art visuel',
    level: 'Débutant à Passionné',
    price: '25 000 FCFA',
    dates: 'Prochaine session communiquée à l’accueil',
    description:
      'Du trait au pinceau calligraphique à la vectorisation sur tablette graphique. Créez des titres personnalisés, des monogrammes d’exception et du lettering africain moderne.',
    icon: 'gesture',
    topics: [
      'Technique du Brush Pen et pleins/déliés',
      'Styles gothique, brush script et lettering urbain',
      'Numérisation et lissage vectoriel sur Illustrator',
      'Application sur packaging et affiches artistiques',
    ],
  },
];

// ==========================================
// 4. REMISE DES PARCHEMINS (CERTIFICATION PRÉCÉDENTE)
// ==========================================
export const CEREMONIES_DATA: CeremonyEdition[] = [
  {
    id: 'certification-precedente',
    editionNumber: 6,
    year: '2024',
    title: 'Certification précédente - Remise Officielle des Parchemins',
    theme: '« L’Audace Créative au Service du Développement Africain »',
    location: 'Palais des Congrès de Cotonou (Salle Bleue)',
    graduatesCount: 284,
    guestOfHonor: 'M. Le Représentant du Ministre de l’Enseignement Technique & M. Le DG de l’Agence Horizon Bénin',
    youtubeVideoId: '',
    videoDuration: '',
    highlights: [
      "284 lauréats habillés en toges officielles PAG & Diplôme d'État",
      'Exposition géante de 120 projets étudiants dans le hall principal',
      'Signature officielle de conventions d’embauche avec 8 agences',
      'Prestation artistique et défilé de mode textile sérigraphié',
    ],
    photoAlbums: [
      {
        name: 'Remise des Attestations aux Apprenants',
        // Aperçu seulement : la galerie des lauréats, juste au-dessus sur la même
        // page, présente la série complète avec un affichage par lots. Reprendre
        // ici les 150 photos afficherait deux fois la même chose et alourdirait
        // la page pour rien.
        photos: APPRENANTS_ATTESTATIONS_PHOTOS.slice(0, 12).map((p) => ({
          url: p.url,
          caption: 'Attestation reçue',
        })),
      },
      {
        name: 'Protocole & Remise des Parchemins',
        photos: [
          {
            url: diplomeImage,
            caption: 'Major de promotion arborant la toge et l’écharpe officielle PAG',
          },
          {
            url: ceremoniesHallImage,
            caption: "Appel solennel des récipiendaires du Diplôme d'État au Palais des Congrès",
          },
        ],
      },
      {
        name: 'Galerie d’Exposition des Projets Lauréats',
        photos: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoG4w8rJ5vX7lMzT2kP6sT8wB9cD0eF1gH2iJ3kL4mN5oP6qR7sT8uV9wX0yZ1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN1oP2qR3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2kL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR',
            caption: 'Présentation des chartes graphiques aux directeurs d’agences',
          },
        ],
      },
    ],
  },
];

// ==========================================
// 5. HISTOIRE & FRISE CHRONOLOGIQUE (2012 -> 2025)
// ==========================================
export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: '2012',
    title: 'Fondation de l’Atelier Pionnier',
    subtitle: 'Naissance de l’amour de l’encre et du papier à Porto-Novo',
    description:
      'Création d’un atelier artisanal de sérigraphie textile et de marquage publicitaire. Face au manque criant de spécialistes qualifiés, les fondateurs posent les bases d’une transmission pratique de maître à apprenti.',
    icon: 'construction',
    badge: 'Genèse',
  },
  {
    year: '2015',
    title: 'Intégration du Studio Numérique',
    subtitle: 'L’arrivée de la Suite Adobe et de l’infographie PAO',
    description:
      'PAG s’équipe de ses premiers ordinateurs dédiés à la création graphique assistée par ordinateur. Lancement des premiers modules d’initiation à Photoshop et Illustrator pour les passionnés.',
    icon: 'desktop_windows',
  },
  {
    year: '2018',
    title: 'Création Officielle de l’Académie PAG & Édition 1',
    subtitle: 'La formation professionnelle certifiante structurée',
    description:
      'L’école prend forme officiellement avec un cursus de 12 mois mêlant 80% de pratique en atelier. Première cérémonie de remise de parchemins réunissant 68 lauréats fiers de leur savoir-faire.',
    icon: 'school',
    badge: '1ère Promotion',
  },
  {
    year: '2021',
    title: "Déploiement du Campus Cotonou & Reconnaissance Diplôme d'État",
    subtitle: 'Reconnaissance d’État et expansion vers la métropole économique',
    description:
      "Ouverture du campus moderne d’Akpakpa à Cotonou. Reconnaissance du programme par les autorités béninoises avec l’accès au Diplôme Professionnel d'État homologué.",
    icon: 'verified',
    badge: 'Diplôme d’État',
  },
  {
    year: '2023',
    title: 'Inauguration du Campus Calavi & Pôle Motion IA',
    subtitle: 'Proximité étudiante et innovation pédagogique',
    description:
      'Ouverture du campus d’Abomey-Calavi Bidossessi pour répondre à la forte demande universitaire. Intégration des modules d’intelligence artificielle générative et de Motion Design.',
    icon: 'apartment',
  },
  {
    year: '2024 - 2025',
    title: 'Consécration au Palais des Congrès : +1 500 Diplômés',
    subtitle: 'Le pôle d’excellence créative et commerciale de référence au Bénin',
    description:
      '6ème édition triomphale de remise des parchemins. Un réseau solide de 18 agences partenaires recruteuses et des centaines d’entreprises créées par nos anciens élèves.',
    icon: 'military_tech',
    badge: 'Leadership',
  },
];

// ==========================================
// 6. ACTUALITÉS & ARTICLES
// ==========================================
export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'rentree-octobre-2026',
    title: 'Inscriptions ouvertes pour la rentrée du 19 octobre 2026',
    category: 'vie-du-centre',
    date: '01 Septembre 2026',
    author: 'Direction des Études PAG',
    readTime: '3 min',
    summary:
      'Les candidatures pour les filières Graphisme, Sérigraphie et Création de contenu sont ouvertes sur nos campus de Cotonou et de Porto-Novo.',
    content:
      "Chaque année, les places au sein des promotions de l'Académie PAG sont strictement limitées afin de garantir à chaque apprenant un poste de travail équipé et un suivi personnalisé par nos formateurs experts. Les frais de formation s'élèvent à 390 000 FCFA (avec inscription à 10 000 FCFA), payables en 3 tranches (150 000 FCFA à la rentrée, 120 000 FCFA à 1 mois, 120 000 FCFA à 2 mois). Le programme se tient du lundi au jeudi de 08h à 13h.",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAE0E-cHwrS3xqfyWKS5Ul57I7gyBT6tpFzpPAyernifdmCIfYNGIYGRe8lidZTG1Lbsx-lIszPCsYY3DSygObD5zMe1gKJ1ejfuiPlniJVj7gL6SNKwF4R2LP420kIbUTiQEyB9UnbLtlnyjPP60ovGNZV7JmcloHvzgZ8kkfvuVclbZs7_r_aOXGzsvm9rj8aI486Vj1peWuE5qlZTigz_BUeSLj82w61D36dW7AFz--s3gZeHTw6sA',
    tags: ['Rentrée 2026', 'Diplôme d’État', 'Inscriptions', 'Bourses'],
  },
  {
    id: 'astuces-portefolio-graphiste',
    title: 'Comment construire un portfolio de graphiste qui décroche des contrats au Bénin',
    category: 'astuces-design',
    date: '24 Mai 2025',
    author: 'Romaric Agossou (Coach Carrières)',
    readTime: '5 min',
    summary:
      'Découvrez les 5 erreurs courantes qui ruinent la crédibilité d’un débutant et apprenez à présenter vos études de cas de branding comme une agence internationale.',
    content:
      "Avoir un beau profil Behance ne suffit plus. Les directeurs d'agences et entrepreneurs à Cotonou recherchent avant tout des designers capables d'expliquer leur démarche réflexive : pourquoi cette typographie ? comment ce logo s'adapte-t-il sur un T-shirt sérigraphié ou un panneau 4x3 ? Voici nos conseils pratiques.",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjL3t1cI2yR9jZzXvK4mP8sT9wB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV0wX1yZ2aB3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ5aB6cD7eF8gH9iJ0kL1mN2oP3qR4sT5uV6wX7yZ8aB9cD0eF1gH2iJ3kL4mN5oP6qR7sT8uV9wX0yZ1aB2cD3eF4gH5iJ6kL7mN8oP9qR',
    tags: ['Conseils', 'Portfolio', 'Carrière', 'Agence'],
  },
  {
    id: 'nouveau-carrousel-serigraphie',
    title: 'PAG Services renforce son parc machine avec un nouveau carrousel textile 6 couleurs',
    category: 'evenements',
    date: '10 Mai 2025',
    author: 'Pôle Industriel PAG',
    readTime: '4 min',
    summary:
      'Cet équipement de pointe permet d’atteindre une cadence de 300 pièces/heure avec un repérage micrométrique pour les tirages événementiels et industriels.',
    content:
      "Pour répondre à la demande grandissante des festivals nationaux, partis politiques, collèges et marques de prêt-à-porter locales, PAG a investi dans un nouveau carrousel de sérigraphie assisté pneumatiquement. Les étudiants de l'Académie bénéficient immédiatement de sessions pratiques sur cette machine.",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAijX7MiEl25_C6IB7slzYjbksmI1qo7rHpbdhjVzDXZkNVZ3zqkthvhCJ_gs4yNnBzOKos8tRHZkUrA8CwjlniIUXxEIPIq2ljWV1jx-ETeBGAoZY5hcctIGrZmtMV7MvnDF_jgnyf5RalshRsAaaIP1hBWmqzOnHWJ7mjWaD7vv3Qm49R6a5rNpUwFIu_x-wbZRnQvtIAtciuwHlJWSu2aveSnXxhGdUPwKnMFE1RoMBeWEHElYF4OA',
    tags: ['Atelier', 'Innovation', 'Textile', 'Sérigraphie'],
  },
];

// ==========================================
// 7. BASE DE DONNÉES DE VÉRIFICATION DES DIPLÔMES
// ==========================================
export const DIPLOMAS_DB: DiplomaRecord[] = [
  {
    diplomaId: 'PAG-2024-ETAT-089',
    studentName: 'Agossou Romaric Houénoukpo',
    formation: 'Graphisme & Design Visuel',
    session: 'Novembre 2024',
    edition: '6ème Édition (Palais des Congrès)',
    grade: 'Mention Très Bien (17.5 / 20)',
    issueDate: '15 Décembre 2024',
    campus: 'Cotonou Akpakpa',
    stateAccreditation: 'Diplôme d’État Officiel N° 2024/METFP/DC/SGM',
    isAuthentic: true,
  },
  {
    diplomaId: 'PAG-2024-ETAT-142',
    studentName: 'Dossou-Yovo Blandine Estelle',
    formation: 'Sérigraphie Moderne & Marquage Textile',
    session: 'Novembre 2024',
    edition: '6ème Édition (Palais des Congrès)',
    grade: 'Mention Bien (15.8 / 20)',
    issueDate: '15 Décembre 2024',
    campus: 'Porto-Novo Ouando',
    stateAccreditation: 'Diplôme d’État Officiel N° 2024/METFP/DC/SGM',
    isAuthentic: true,
  },
  {
    diplomaId: 'PAG-2023-ETAT-055',
    studentName: 'Mensah Fabrice Koffi',
    formation: 'Graphisme & Design Visuel',
    session: 'Décembre 2023',
    edition: '5ème Édition (Palais des Congrès)',
    grade: 'Mention Très Bien (18 / 20)',
    issueDate: '20 Décembre 2023',
    campus: 'Abomey-Calavi Bidossessi',
    stateAccreditation: 'Diplôme d’État Officiel N° 2023/METFP/DC/SGM',
    isAuthentic: true,
  },
  {
    diplomaId: 'PAG-2024-ATT-310',
    studentName: 'Tossou Emmanuel Cédric',
    formation: 'Création de Contenu Digital & Motion Design',
    session: 'Octobre 2024',
    edition: 'Session Automne 2024',
    grade: 'Certifié avec Félicitations du Jury',
    issueDate: '30 Octobre 2024',
    campus: 'Cotonou Akpakpa',
    stateAccreditation: 'Attestation Professionnelle PAG reconnue par le Réseau des Agences',
    isAuthentic: true,
  },
];

// ==========================================
// 8. CAMPUS INFOS & CONTACT
// ==========================================
// ==========================================
// RÉSEAUX SOCIAUX OFFICIELS PAG
// Source unique : l'en-tête et le pied de page lisent ces adresses, pour qu'une
// page qui change n'ait à être corrigée qu'ici.
// ==========================================
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/share/19CaryDqj5/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/pag.benin?igsh=cHI1Mzh6Y3U2OTVw',
  tiktok: 'https://www.tiktok.com/@pag.2014?_r=1&_t=ZT-98C3NmzY6Sk',
  linkedin: 'https://www.linkedin.com/company/p%C3%A9nielle-art-graphic-pag/',
  youtube: 'https://www.youtube.com/@Penielleartgraphic',
} as const;

export const CAMPUSES_DATA = [
  {
    id: 'cotonou',
    name: 'Campus Cotonou (Siège Opérationnel)',
    quarter: 'Akpakpa PK3, non loin du Carrefour Ciné Concorde',
    city: 'Cotonou, République du Bénin',
    phone: '+229 01 66 04 44 36 / +229 01 97 45 12 80',
    whatsapp: '2290166044436',
    email: 'cotonou@penielle-art-graphic.com',
    hours: 'Du Lundi au Vendredi : 08h00 - 18h30 | Samedi : 09h00 - 15h00',
    features: ['Salle informatique iMac & PC Pro', 'Studio photo & vidéo', 'Connexion Fibre Optique 100 Mbps', 'Showroom client'],
    mapQuery: 'Akpakpa Cotonou Benin',
  },
  {
    id: 'porto-novo',
    name: 'Campus Porto-Novo (Centre Historique & Atelier Sérigraphie)',
    quarter: 'Quartier Ouando, en face du Complexe Scolaire Saint Joseph',
    city: 'Porto-Novo, République du Bénin',
    phone: '+229 01 66 04 44 36',
    whatsapp: '2290166044436',
    email: 'portonovo@penielle-art-graphic.com',
    hours: 'Du Lundi au Vendredi : 08h00 - 18h00 | Samedi : 08h30 - 13h00',
    features: ['Grand atelier de sérigraphie manuelle & semi-auto', 'Laboratoire d’émulsion & chambre noire UV', 'Salle de cours PAO', 'Parc textile'],
    mapQuery: 'Ouando Porto-Novo Benin',
  },
];

// ==========================================
// 9. MODULES & CREATIONS (COURSE DETAIL)
// ==========================================
export const GRAPHISME_MODULES = [
  {
    id: 'm1',
    num: '01',
    number: '01',
    title: 'Fondamentaux du Design, Théorie des Couleurs & Typographie',
    duration: '4 Semaines (32h pratiques)',
    hours: '32h pratiques',
    description:
      'Harmonie colorimétrique (RVB vs CMJN), psychologie visuelle, anatomie d’une fonte typographique, grilles de mise en page et composition spatiale.',
    skills: ['Colorimétrie avancée', 'Mise en page éditoriale', 'Hiérarchie visuelle', 'Moodboards créatifs'],
    tags: ['Colorimétrie avancée', 'Mise en page éditoriale', 'Hiérarchie visuelle', 'Moodboards créatifs'],
  },
  {
    id: 'm2',
    num: '02',
    number: '02',
    title: 'Maîtrise Professionnelle de la Suite Adobe (Ps, Ai, Id)',
    duration: '6 Semaines (48h pratiques)',
    hours: '48h pratiques',
    description:
      'Détourage complexe sur Photoshop, dessin vectoriel et logotypes sous Illustrator, mise en page de magazines et catalogues multipages sous InDesign.',
    skills: ['Tracés de Bézier & Plume', 'Masques de fusion', 'Styles de paragraphe', 'Préparation vectorielle'],
    tags: ['Tracés de Bézier & Plume', 'Masques de fusion', 'Styles de paragraphe', 'Préparation vectorielle'],
  },
  {
    id: 'm3',
    num: '03',
    number: '03',
    title: 'Branding Complet & Conception d’Identités Visuelles de Marques',
    duration: '4 Semaines (32h pratiques)',
    hours: '32h pratiques',
    description:
      'Création de charte graphique complète : logotype, déclinaisons, papeterie d’entreprise, packaging produit et mockups 3D réalistes.',
    skills: ['Guide de style de marque', 'Design de packaging', 'Mockups commerciaux', 'Présentation pitch client'],
    tags: ['Guide de style de marque', 'Design de packaging', 'Mockups commerciaux', 'Présentation pitch client'],
  },
  {
    id: 'm4',
    num: '04',
    number: '04',
    title: "Pré-Presse, Imposition Technique & Immersion Professionnelle (Diplôme d'État)",
    duration: '10 Semaines (Stage 8 semaines inclus)',
    hours: '80h pratiques + Stage',
    description:
      'Gestion des traits de coupe, fonds perdus, séparation des couleurs, contrôle en amont (preflight) et stage garanti de 2 mois en agence partenaire.',
    skills: ['Contrôle pré-presse', 'Normes ISO d’impression', 'Portfolio professionnel', 'Stage immersif en agence'],
    tags: ['Contrôle pré-presse', 'Normes ISO d’impression', 'Portfolio professionnel', 'Stage immersif en agence'],
  },
];

export const STUDENT_CREATIONS = [
  {
    id: 'sc1',
    title: 'Identité Visuelle & Packaging Boisson Locale',
    author: 'Koffi Mensah (Promo 2024 - Cotonou)',
    category: 'Branding & Packaging',
    imageUrl: classroomImage,
    tags: ['Branding', 'Packaging', 'Illustrator', 'Photoshop'],
  },
  {
    id: 'sc2',
    title: 'Impression Textile & Sérigraphie Artisanale',
    author: 'Aïcha Bio Guéra (Promo 2024 - Porto-Novo)',
    category: 'Atelier Sérigraphie',
    imageUrl: serigraphieImage,
    tags: ['Sérigraphie', 'Textile', 'Sublimation', 'Flash Cure'],
  },
  {
    id: 'sc3',
    title: 'Motion Design & Campagne Réseaux Sociaux',
    author: 'Boris Adéwalé (Promo 2023 - Cotonou)',
    category: 'Motion Design & Vidéo',
    imageUrl: coachingImage,
    tags: ['After Effects', 'Premiere Pro', 'Animation'],
  },
  {
    id: 'sc4',
    title: "Projet de Fin d’Études Homologué Diplôme d'État",
    author: 'Esther T. (Major de Promotion 2024)',
    category: 'Diplôme d’État',
    imageUrl: diplomeImage,
    tags: ['Diplôme d’État', 'Excellence', 'Palais des Congrès'],
  },
];

// ==========================================
// 8. PARTENAIRES & RÉSEAU INSTITUTIONNEL
// ==========================================
export const PARTNERS_DATA: PartnerItem[] = [
  // --- ÉTAT & INSTITUTIONS OFFICIELLES ---
  {
    id: 'mestfp',
    name: 'Ministère des Enseignements Secondaire, Technique et de la Formation Professionnelle',
    category: 'institution',
    categoryLabel: 'Institution & État',
    badge: "Organisateur d'Épreuves & Diplôme d'État",
    description:
      "Homologation officielle et supervision des épreuves officielles du Diplôme d'État béninois.",
    location: 'Cotonou • Bénin',
    logoInitials: 'MESTFP',
    role: 'Diplôme d’État officiel',
    featured: true,
  },
  {
    id: 'cma-benin',
    name: 'Chambre des Métiers de l’Artisanat du Bénin (CMA-Bénin)',
    category: 'institution',
    categoryLabel: 'Institution & État',
    badge: 'Ordre Régulateur de l’Artisanat',
    description:
      'Tutelle consulaire pour la reconnaissance des corps de métiers de l’imprimerie, de la sérigraphie et des arts appliqués.',
    location: 'Bénin (National)',
    logoInitials: 'CMA',
    role: 'Validation professionnelle',
    featured: true,
  },
  {
    id: 'fodefca',
    name: 'Fonds de Développement de la Formation Professionnelle Continue (FODEFCA)',
    category: 'institution',
    categoryLabel: 'Institution & État',
    badge: 'Appui Qualification des Jeunes',
    description:
      'Partenariat d’orientation et de soutien à l’employabilité et au perfectionnement continu des apprenants et maîtres-artisans.',
    location: 'Cotonou',
    logoInitials: 'FODEFCA',
    role: 'Financement & Appui formation',
    featured: false,
  },

  // --- ENTREPRISES & MARQUES PARTENAIRES DE RÉFÉRENCE (AVEC LOGOS OFFICIELS) ---
  {
    id: 'edith-palace',
    name: 'Edith Palace Hotel',
    category: 'agency',
    categoryLabel: 'Hôtellerie & Événementiel',
    badge: 'Partenaire Hôtelier d’Élite',
    description:
      'Complexe hôtelier de prestige à Cotonou. Accueille les événements, séminaires professionnels et offre des opportunités de stages et design de marque pour nos apprenants.',
    location: 'Cotonou',
    logoInitials: 'EP',
    logoId: 'edith-palace',
    role: 'Immersion & Événements institutionnels',
    featured: true,
  },
  {
    id: 'lady-g',
    name: 'Esthétique Lady G',
    category: 'agency',
    categoryLabel: 'Institut de Beauté & Formation',
    badge: 'Centre de Formation Professionnelle',
    description:
      'Institut de référence en cosmétique, soins esthétiques et formation certifiée au Bénin. Collaboration active sur la communication visuelle et l’insertion professionnelle.',
    location: 'Cotonou & Calavi',
    logoInitials: 'LG',
    logoId: 'lady-g',
    phone: '+229 66 45 12 12 / 97 88 23 61',
    role: 'Partenaire communication & Événements',
    featured: true,
  },
  {
    id: 'gescia',
    name: 'Gescia - Bénin',
    category: 'agency',
    categoryLabel: 'Immobilier & Gestion Foncière',
    badge: 'Achat • Vente • Location • Gestion',
    description:
      'Société immobilière d’envergure nationale au Bénin. Conçoit ses supports d’architecture commerciale, plaquettes de vente et plans avec les lauréats PAG.',
    location: 'Cotonou',
    logoInitials: 'GB',
    logoId: 'gescia',
    role: 'Partenaire Recruteur & Graphisme',
    featured: true,
  },
  {
    id: 'flash-empire',
    name: 'Flash Empire',
    category: 'agency',
    categoryLabel: 'Production Média & Audiovisuel',
    badge: 'Studio Multimédia & Entertainment',
    description:
      'Maison de production audiovisuelle, clips vidéos, spot publicitaires et couverture événementielle grand spectacle au Bénin.',
    location: 'Cotonou',
    logoInitials: 'FE',
    logoId: 'flash-empire',
    role: 'Projets réels vidéo & Motion design',
    featured: true,
  },
  {
    id: 'khali-store',
    name: 'Khali Store',
    category: 'agency',
    categoryLabel: 'Mode & Prêt-à-porter',
    badge: 'Boutique Tendance & Lifestyle',
    description:
      'Boutique de vêtements haut de gamme et d’accessoires mode. Partenaire clé pour le branding produit, photographies de collections et catalogues commerciaux.',
    location: 'Cotonou',
    logoInitials: 'KS',
    logoId: 'khali-store',
    phone: '+229 60 30 71 92',
    role: 'Direction artistique & Campagnes e-commerce',
    featured: true,
  },
  {
    id: 'az-cica',
    name: 'Alimentation Générale AZ CICA & Poissonnerie',
    category: 'agency',
    categoryLabel: 'Distribution Alimentaire & Pêche',
    badge: 'Réseau de Distribution & Produits Frais',
    description:
      'Chaîne de distribution alimentaire et produits halieutiques. Collabore avec PAG pour l’habillage de points de vente, enseignes et packaging alimentaire.',
    location: 'Cotonou & Porto-Novo',
    logoInitials: 'AZ',
    logoId: 'az-cica',
    phone: '+229 01 96 02 16 66 / 01 41 26 95 10',
    role: 'Packaging & Supports de communication physique',
    featured: true,
  },
  {
    id: 'francom-shop',
    name: 'Francom Shop',
    category: 'print',
    categoryLabel: 'Textile & Pagnes d’Événements',
    badge: 'Chaque événement a son pagne !',
    description:
      'Spécialiste renommé dans la création, sélection et distribution de pagnes tissés et imprimés pour tous les grands événements familiaux et corporatifs du Bénin.',
    location: 'Cotonou',
    logoInitials: 'FS',
    logoId: 'francom-shop',
    tagline: 'Avec FRANCOM Chaque événement a son pagne !',
    role: 'Design textile & Sérigraphie promotionnelle',
    featured: true,
  },
  {
    id: 'ari-house',
    name: 'Ari House',
    category: 'agency',
    categoryLabel: 'Décoration Intérieure de Luxe',
    badge: 'Architecture d’Intérieur & Design',
    description:
      'Cabinet de décoration prestigieuse pour résidences de haut standing, hôtels et espaces d’affaires. Travaille avec nos designers en modélisation et rendus 3D.',
    location: 'Cotonou (Haie Vive)',
    logoInitials: 'AH',
    logoId: 'ari-house',
    role: 'Scénographie spatiale & Conception visuelle',
    featured: true,
  },
  {
    id: 'jojo-manie',
    name: 'Jojo Manie (JM)',
    category: 'agency',
    categoryLabel: 'Haute Couture & Création Stylistique',
    badge: 'Maison de Mode Panafricaine',
    description:
      'Maison de création vestimentaire contemporaine alliant inspirations traditionnelles béninoises et coupes modernes. Recrute pour ses défilés et looks-books.',
    location: 'Cotonou',
    logoInitials: 'JM',
    logoId: 'jojo-manie',
    role: 'Direction artistique & Campagnes mode',
    featured: true,
  },
  {
    id: 'grande-royale',
    name: 'Grande Royale Boutiques',
    category: 'agency',
    categoryLabel: 'Boutiques de Luxe & Vente Privée',
    badge: 'Préstige & Shopping Premium',
    description:
      'Réseau de boutiques sélectives offrant parfums de niche, accessoires de luxe et maroquinerie d’exception au Bénin.',
    location: 'Cotonou',
    logoInitials: 'GR',
    logoId: 'grande-royale',
    role: 'Identité de marque & Supports grand format',
    featured: true,
  },
  {
    id: 'residence-faridath',
    name: 'Résidence Faridath (RF)',
    category: 'agency',
    categoryLabel: 'Résidence Hôtelière de Standing',
    badge: 'Appartements Meublés VIP',
    description:
      'Résidences meublées et appartements d’affaires de haute qualité pour séjours courts et prolongés à Cotonou et Abomey-Calavi.',
    location: 'Abomey-Calavi • Cotonou',
    logoInitials: 'RF',
    logoId: 'residence-faridath',
    role: 'Signalétique intérieure & Communication digitale',
    featured: true,
  },
  {
    id: 'bignon-benin',
    name: 'Bignon du Bénin (BB)',
    category: 'agency',
    categoryLabel: 'Commerce Général & Prestations',
    badge: 'Fourniture & Services Corporatifs',
    description:
      'Entreprise multisectorielle fournissant les entreprises, administrations et ONG en matériels, services logistiques et communication corporate.',
    location: 'Cotonou',
    logoInitials: 'BB',
    logoId: 'bignon-benin',
    role: 'Partenaire commercial & Logistique',
    featured: true,
  },
  {
    id: 'le-happy',
    name: 'Le Happy Restaurant',
    category: 'agency',
    categoryLabel: 'Gastronomie & Restauration',
    badge: 'Saveurs Gourmandes & Convivialité',
    description:
      'Espace de restauration moderne combinant gastronomie locale réinventée et cuisine du monde. Partenaire traiteur des cérémonies et remises de parchemins PAG.',
    location: 'Cotonou',
    logoInitials: 'LH',
    logoId: 'le-happy',
    role: 'Partenaire traiteur & Événements officiels',
    featured: true,
  },
  {
    id: 'win-events',
    name: 'Win Events',
    category: 'agency',
    categoryLabel: 'Agence Événementielle & Scénographie',
    badge: 'Organisation de Galas & Salons',
    description:
      'Agence spécialisée dans la logistique événementielle, la sonorisation, les jeux de lumière et la mise en scène de cérémonies de diplôme et conférences.',
    location: 'Cotonou & Porto-Novo',
    logoInitials: 'WE',
    logoId: 'win-events',
    role: 'Scénographie des 6 Cérémonies de Parchemins PAG',
    featured: true,
  },
  {
    id: 'bellamia',
    name: 'Bellamia',
    category: 'agency',
    categoryLabel: 'Cosmétique & Soins Féminins',
    badge: 'Beauté Naturelle & Bien-Être',
    description:
      'Marque de produits de soins et d’esthétique mettant en valeur la beauté naturelle africaine. Collaboration sur l’étiquetage et les campagnes promotionnelles.',
    location: 'Cotonou',
    logoInitials: 'BM',
    logoId: 'bellamia',
    role: 'Branding cosmétique & Packaging créatif',
    featured: true,
  },
  {
    id: 'superbe-u',
    name: 'Superbe U Event',
    category: 'agency',
    categoryLabel: 'Prestige Événementiel & Cérémonies',
    badge: 'Décors de Mariages & Réceptions VIP',
    description:
      'Maison de création de décors de mariage spectaculaires, structures féeriques et réceptions privées au Bénin et dans la sous-région.',
    location: 'Cotonou',
    logoInitials: 'SU',
    logoId: 'superbe-u',
    role: 'Partenaire décorateur & Mécénat créatif',
    featured: true,
  },

  // --- TECHNOLOGIES & OUTILS ---
  {
    id: 'adobe-partner',
    name: 'Adobe Creative Cloud & Outils Industriels',
    category: 'tech',
    categoryLabel: 'Technologies & Outils',
    badge: 'Standards Mondiaux de l’Industrie',
    description:
      'Formations basées sur les flux opérationnels officiels Adobe Creative Cloud (Photoshop, Illustrator, InDesign, Premiere Pro) et Figma.',
    location: 'International',
    logoInitials: 'Ps • Ai',
    role: 'Outils professionnels enseignés',
    featured: false,
  },
];

// ==========================================
// 9. TÉMOIGNAGES (ANCIENS APPRENANTS & PARTENAIRES)
// ==========================================
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    author: 'Marius Agbodjan',
    role: 'Directeur Artistique Junior • Agence Horizon Bénin',
    organization: 'Ancien Diplômé PAG',
    type: 'student',
    quote:
      "Arrivé à PAG sans aucune base sur Illustrator, j'ai trouvé un cadre ultra-rigoureux. En 12 mois de formation rigoureuse et stage garanti, j'ai monté un vrai portfolio. Aujourd'hui, je gère les chartes visuelles de grandes marques au Bénin.",
    rating: 5,
    highlight: "Embauché dès la soutenance du Diplôme d'État",
    yearOrPromo: 'Promotion 2023 • Campus Cotonou',
    avatarText: 'MA',
    badge: "Lauréat du Diplôme d'État",
  },
  {
    id: 'test-2',
    author: 'Esther Tossou',
    role: 'Fondatrice de Tossou Studio Créatif & Formatrice',
    organization: 'Entrepreneure & Ancienne Élève',
    type: 'student',
    quote:
      "Pénielle Art Graphic m'a transmis bien plus que la technique des logiciels : la discipline du pré-presse, le respect des délais clients et la confiance en soi. La remise du diplôme en toge au Palais des Congrès a été le déclic pour lancer mon propre studio.",
    rating: 5,
    highlight: 'Studio autonome fondé en 2024',
    yearOrPromo: 'Major de Promotion 2024',
    avatarText: 'ET',
    badge: 'Major de Promotion',
  },
  {
    id: 'test-3',
    author: 'Christian D. Houessou',
    role: 'Directeur Général • Golden Tulip Le Diplomate Cotonou',
    organization: 'Partenaire Recruteur & Événementiel',
    type: 'partner',
    quote:
      "En tant que partenaire hôtelier de premier plan, nous exigeons l'excellence graphique pour nos supports de communication et événements. Les lauréats formés par PAG sont immédiatement opérationnels, ponctuels et techniquement irréprochables.",
    rating: 5,
    highlight: 'Partenaire depuis plus de 4 ans',
    yearOrPromo: 'Partenaire Hôtelier d’Élite',
    avatarText: 'GT',
    badge: 'Partenaire Recruteur',
  },
  {
    id: 'test-4',
    author: 'Clarisse Kpoviessi',
    role: 'Spécialiste Sérigraphie & Marquage Textile Industriel',
    organization: 'Ancienne Apprenante • Campus Porto-Novo',
    type: 'student',
    quote:
      "L'atelier de sérigraphie de PAG est unique au Bénin. On apprend sur de vrais carrousels et des presses professionnelles. J'ai pu ouvrir mon unité de flocage textile et fournir des t-shirts d'entreprises pour de gros événements nationaux.",
    rating: 5,
    highlight: '+3 000 pièces imprimées le 1er trimestre',
    yearOrPromo: 'Promotion Sérigraphie 2024',
    avatarText: 'CK',
    badge: "Artisane Diplômée d'État",
  },
  {
    id: 'test-5',
    author: 'Désiré Boko',
    role: 'Responsable des Ressources Humaines • Benin Royal Hotel',
    organization: 'Partenaire Hôtelier & Recruteur',
    type: 'partner',
    quote:
      "Nous accueillons régulièrement en immersion professionnelle les stagiaires de Pénielle Art Graphic. Leur maîtrise de la quadrichromie et de la signalétique intérieure nous fait gagner un temps précieux sur nos campagnes.",
    rating: 5,
    highlight: '3 stagiaires intégrés en CDI',
    yearOrPromo: 'Partenaire Entreprise',
    avatarText: 'BR',
    badge: 'Partenaire Entreprise',
  },
  {
    id: 'test-6',
    author: 'Romuald Deguenon',
    role: 'Motion Designer & Monteur Vidéo Freelance',
    organization: 'Ancien Diplômé PAG',
    type: 'student',
    quote:
      "Le coaching individuel et la pédagogie par projet font toute la différence. On ne fait pas que des exercices théoriques : on produit des visuels pour des clients réels. La reconnaissance du Diplôme d'État officiel m'a ouvert les portes des agences régionales.",
    rating: 5,
    highlight: 'Contrats réguliers à Cotonou et Abidjan',
    yearOrPromo: 'Promotion Motion Design 2024',
    avatarText: 'RD',
    badge: 'Créateur Certifié',
  },
];

// ==========================================
// 10. FOIRE AUX QUESTIONS (FAQ) ACADÉMIE & SERVICES
// ==========================================
export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'diplome',
    question: "Le diplôme délivré par Pénielle Art Graphic est-il un Diplôme d'État reconnu par l’État béninois ?",
    answer:
      "Oui, absolument. Le titre délivré est un Diplôme d’État officiel délivré sous la tutelle du Ministère des Enseignements Secondaire, Technique et de la Formation Professionnelle (METFP) et de la Chambre des Métiers de l'Artisanat du Bénin (CMA). Il confère un titre d'artisan qualifié reconnu sur tout le territoire national et dans l'espace UEMOA/CEDEAO.",
    highlight: "Diplôme d'État officiel METFP & CMA Bénin",
  },
  {
    id: 'faq-2',
    category: 'formations',
    question: 'Faut-il avoir des prérequis ou savoir dessiner pour intégrer les formations en graphisme ?',
    answer:
      "Aucun prérequis en dessin artistique ou en informatique avancée n'est exigé. Nos cursus démarrent dès les fondamentaux : prise en main de l'environnement de travail, maîtrise des logiciels de la suite Adobe (Photoshop, Illustrator, InDesign), théorie des couleurs, typographie et composition visuelle. La seule exigence est votre motivation et votre assiduité.",
    highlight: 'Accessible aux débutants complets',
  },
  {
    id: 'faq-3',
    category: 'admissions',
    question: 'Où sont situés vos campus et quels sont les horaires des cours ?',
    answer:
      "PAG est présent à Cotonou (Akpakpa PK3, près du Ciné Concorde) et à Porto-Novo (Quartier Ouando, face Complexe St Joseph). Pour la formation en Graphisme Design (12 mois), les horaires officiels sont du lundi au jeudi, de 08h à 13h.",
    highlight: 'Cotonou & Porto-Novo • Lundi au jeudi, 08h à 13h',
  },
  {
    id: 'faq-4',
    category: 'formations',
    question: 'Comment se déroule le stage en entreprise garanti après la formation ?',
    answer:
      "À l'issue des 12 mois de formation théorique et pratique intensive et de la validation de votre portfolio, chaque apprenant bénéficie d'un placement garanti en stage de 2 mois au sein de l'une de nos 18 agences partenaires ou directement dans les unités de production de PAG Services (imprimerie numérique et atelier textile).",
    highlight: 'Stage garanti de 2 mois en agence partenaire',
  },
  {
    id: 'faq-5',
    category: 'services',
    question: 'Quels sont les services d’imprimerie et de production proposés aux entreprises ?',
    answer:
      "Le pôle PAG Services accompagne les entreprises, institutions et créateurs : impression grand format (bâches, vinyles, roll-up), sérigraphie industrielle textile (t-shirts, polos, casquettes), sublimation et marquage d'objets publicitaires (mugs, stylos, clés USB), conception d'identités visuelles complètes et packaging.",
    highlight: 'Atelier industriel intégré & livraison rapide',
  },
  {
    id: 'faq-6',
    category: 'services',
    question: 'Comment obtenir un devis pour un projet de communication ou un tirage sérigraphique ?',
    answer:
      "Vous pouvez faire une demande directement sur notre plateforme via le formulaire de devis en ligne ou contacter notre service commercial sur WhatsApp au (+229) 97 00 00 00. Nos chargés de compte vous transmettent une proposition technique et tarifaire détaillée sous 24h ouvrées.",
    highlight: 'Devis clair et réponse sous 24h',
  },
  {
    id: 'faq-7',
    category: 'diplome',
    question: 'Comment les employeurs peuvent-ils vérifier l’authenticité d’un diplôme PAG ?',
    answer:
      "Chaque parchemin officiel remis lors de la cérémonie solennelle comporte un sceau officiel, un numéro de registre unique et l'homologation de l'État (CQM). Les recruteurs, agences et institutions peuvent directement contacter la direction académique de PAG ou la Chambre des Métiers pour authentifier tout parchemin délivré.",
    highlight: 'Homologation d’État & Registre Officiel Garanti',
  },
  {
    id: 'faq-8',
    category: 'admissions',
    question: 'Quels sont les tarifs et facilités de paiement pour la formation en Graphisme Design ?',
    answer:
      "Pour la formation Graphisme Design (12 mois) : Inscription : 10 000 FCFA. Scolarité : 390 000 FCFA (donnant droit au certificat PAG). Le paiement s'effectue en 3 tranches : 1ère Tranche à la rentrée (150 000 FCFA), 2ème Tranche 1 mois après la rentrée (120 000 FCFA), 3ème Tranche 2 mois après la rentrée (120 000 FCFA). Frais divers : 02 Uniformes (15 000 FCFA) et Examen d'État CQM (20 000 FCFA).",
    highlight: 'Inscription : 10 000 FCFA • Scolarité : 390 000 FCFA en 3 tranches',
  },
  {
    id: 'faq-9',
    category: 'admissions',
    question: 'Quelles sont les pièces à fournir pour constituer mon dossier d’admission ?',
    answer:
      "Le dossier complet d'inscription comprend : 01 copie légalisée de l'acte de naissance, 01 copie de la carte nationale d'identité (CNI), 01 copie du dernier diplôme obtenu, 03 photos d'identité et 01 ramette de papier.",
    highlight: 'Dossier : Acte de naissance, CNI, diplôme, 3 photos, 1 ramette',
  },
  {
    id: 'faq-10',
    category: 'formations',
    question: 'Quels matériels informatiques et fournitures sont requis pour les cours de Graphisme ?',
    answer:
      "Chaque étudiant doit être équipé de : 01 ordinateur portable performant (processeur Intel Core i5 ou i7, 12 Go de RAM minimum, stockage HDD 500 Go ou SSD 250 Go minimum), 01 clé USB (32 Go ou 64 Go), ainsi qu'un bloc-notes, bic, crayon et 02 cahiers pour les prises de notes et croquis préparatoires.",
    highlight: 'PC Core i5/i7 (12 Go RAM min, SSD/HDD), Clé USB 32/64 Go',
  },
];

