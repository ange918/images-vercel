export interface CourseModule {
  id: string;
  number: string;
  title: string;
  hours: string;
  description: string;
  tags: string[];
}

export interface StudentCreation {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
}

export interface FormationItem {
  id: string;
  title: string;
  category: string;
  diplomaBadge: string;
  diplomaType: 'etat' | 'cqm' | 'pag';
  description: string;
  duration: string;
  campuses: string;
  imageUrl: string;
  price?: string;
  installments?: string;
  remainingSpots?: number;
  totalSpots?: number;
  startDate?: string;
  prerequisites?: string;
  software?: string[];
  objectives?: string;
  tagline?: string;
  skillsAcquired?: string[];
  schedule?: string;
  subTitle?: string;
  inscriptionFee?: string;
  lacosteFee?: string;
  inclus?: readonly string[];
  tranches?: readonly {
    readonly label: string;
    readonly deadline: string;
    readonly amount: string;
  }[];
  fraisDivers?: readonly {
    readonly item: string;
    readonly amount: string;
  }[];
  piecesAFournir?: readonly string[];
  materielsRequis?: readonly string[];
  /** Rythmes proposés quand la même formation existe en plusieurs horaires. */
  rythmes?: readonly {
    readonly name: string;
    readonly duration: string;
    readonly schedule: string;
    readonly audience: string;
  }[];
  /** Mise en avant éditoriale, par exemple la formation de base recommandée. */
  recommendation?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  deliverables: string[];
  galleryImages: { url: string; title: string; subtitle: string }[];
  basePrice?: string;
}

export interface WorkshopItem {
  id: string;
  title: string;
  duration: string;
  audience: string;
  level: string;
  price: string;
  dates: string;
  description: string;
  icon: string;
  topics: string[];
}

export interface CeremonyEdition {
  id: string;
  editionNumber: number;
  year: string;
  title: string;
  theme: string;
  location: string;
  graduatesCount: number;
  guestOfHonor: string;
  youtubeVideoId: string;
  videoDuration: string;
  highlights: string[];
  photoAlbums: {
    name: string;
    photos: { url: string; caption: string }[];
  }[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: 'vie-du-centre' | 'astuces-design' | 'evenements' | 'metiers';
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

export interface DiplomaRecord {
  diplomaId: string;
  studentName: string;
  formation: string;
  session: string;
  edition: string;
  grade: string;
  issueDate: string;
  campus: string;
  stateAccreditation: string;
  isAuthentic: boolean;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: 'institution' | 'agency' | 'print' | 'tech';
  categoryLabel: string;
  description: string;
  badge: string;
  location: string;
  logoInitials: string;
  role: string;
  featured?: boolean;
  phone?: string;
  website?: string;
  logoId?: string;
  tagline?: string;
}

export type ActiveScreen =
  | 'portal'
  | 'services'
  | 'formations'
  | 'course-detail'
  | 'ceremonies'
  | 'about'
  | 'actualites'
  | 'contact';

export type ViewMode = 'responsive' | 'mobile-frame';

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  organization?: string;
  type: 'student' | 'partner';
  quote: string;
  rating: number;
  highlight: string;
  yearOrPromo?: string;
  avatarText?: string;
  badge: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'formations' | 'services' | 'diplome' | 'admissions';
  highlight?: string;
}
