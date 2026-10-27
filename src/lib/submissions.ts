/**
 * Envoi des formulaires publics vers Supabase.
 *
 * Règle intangible : aucune de ces fonctions ne lève d'exception et aucune ne
 * bloque l'affichage. Le visiteur voit toujours le message de confirmation ;
 * en cas d'échec réseau la demande est mise en file d'attente locale.
 */
import { getContext, trackEvent } from './analytics';
import { enqueue } from './pendingQueue';
import { postRow } from './supabaseRest';

export interface AntiSpamState {
  /** Champ leurre : rempli uniquement par un robot. */
  honeypot?: string;
  /** Horodatage d'affichage du formulaire. */
  mountedAt?: number;
}

const MIN_FILL_MS = 2000;

/** `queued` : le réseau a échoué, la demande part dès que la connexion revient. */
export interface SendResult {
  ok: boolean;
  queued?: boolean;
}

function looksAutomated({ honeypot, mountedAt }: AntiSpamState): boolean {
  if (honeypot && honeypot.trim() !== '') return true;
  if (mountedAt && Date.now() - mountedAt < MIN_FILL_MS) return true;
  return false;
}

function clean(value: string | undefined | null, max = 400): string | null {
  if (value === undefined || value === null) return null;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  return trimmed.slice(0, max);
}

async function send(
  table: string,
  payload: Record<string, unknown>,
  antiSpam: AntiSpamState,
  eventName: string
): Promise<SendResult> {
  // Un robot reçoit la même confirmation qu'un visiteur, sans que rien ne parte.
  if (looksAutomated(antiSpam)) return { ok: true };

  const body = { ...payload, ...getContext() };
  const result = await postRow(table, body);

  if (result.ok) {
    trackEvent(eventName, { table });
    return { ok: true };
  }
  if (result.status === 0 || result.status >= 500) {
    enqueue(table, body);
    return { ok: false, queued: true };
  }
  return { ok: false };
}

/* ------------------------------------------------------------------ */
/* Inscriptions                                                        */
/* ------------------------------------------------------------------ */

export interface RegistrationInput extends AntiSpamState {
  source: 'registration_modal' | 'portal_intake' | 'course_detail' | 'ceremony' | 'autre';
  fullName: string;
  phone?: string;
  email?: string;
  campus?: string;
  formationTitle?: string;
  formationSlug?: string;
  service?: string;
  paymentPlan?: string;
  uploadedFileName?: string;
  acceptWhatsapp?: boolean;
  message?: string;
}

export async function submitRegistration(input: RegistrationInput): Promise<SendResult> {
  const fullName = clean(input.fullName, 120);
  const phone = clean(input.phone, 40);
  const email = clean(input.email, 160);
  if (!fullName || (!phone && !email)) return { ok: false };

  return send(
    'registrations',
    {
      source: input.source,
      full_name: fullName,
      phone,
      email,
      campus: clean(input.campus, 80),
      formation_title: clean(input.formationTitle, 200),
      formation_slug: clean(input.formationSlug, 120),
      service: clean(input.service, 160),
      payment_plan: clean(input.paymentPlan, 60),
      uploaded_file_name: clean(input.uploadedFileName, 255),
      accept_whatsapp: Boolean(input.acceptWhatsapp),
      message: clean(input.message, 4000),
    },
    input,
    'form_inscription'
  );
}

/* ------------------------------------------------------------------ */
/* Devis                                                               */
/* ------------------------------------------------------------------ */

export interface QuoteInput extends AntiSpamState {
  serviceTitle: string;
  serviceSlug?: string;
  quantity?: string;
  deadline?: string;
  details?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
}

export async function submitQuoteRequest(input: QuoteInput): Promise<SendResult> {
  const clientName = clean(input.clientName, 120);
  const clientPhone = clean(input.clientPhone, 40);
  const serviceTitle = clean(input.serviceTitle, 200);
  if (!clientName || !clientPhone || !serviceTitle) return { ok: false };

  return send(
    'quote_requests',
    {
      service_title: serviceTitle,
      service_slug: clean(input.serviceSlug, 120),
      quantity: clean(input.quantity, 60),
      deadline: clean(input.deadline, 60),
      details: clean(input.details, 4000),
      client_name: clientName,
      client_phone: clientPhone,
      client_email: clean(input.clientEmail, 160),
    },
    input,
    'form_devis'
  );
}

/* ------------------------------------------------------------------ */
/* Messages de contact                                                 */
/* ------------------------------------------------------------------ */

export interface ContactInput extends AntiSpamState {
  subjectType: 'formation' | 'service' | 'stage' | 'autre';
  senderName: string;
  senderEmail?: string;
  senderPhone?: string;
  senderCampus?: string;
  body: string;
}

export async function submitContactMessage(input: ContactInput): Promise<SendResult> {
  const senderName = clean(input.senderName, 120);
  const body = clean(input.body, 4000);
  const senderEmail = clean(input.senderEmail, 160);
  const senderPhone = clean(input.senderPhone, 40);
  if (!senderName || !body || (!senderEmail && !senderPhone)) return { ok: false };

  return send(
    'contact_messages',
    {
      subject_type: input.subjectType,
      sender_name: senderName,
      sender_email: senderEmail,
      sender_phone: senderPhone,
      sender_campus: clean(input.senderCampus, 80),
      body,
    },
    input,
    'form_contact'
  );
}

/* ------------------------------------------------------------------ */
/* Lettre d'information                                                */
/* ------------------------------------------------------------------ */

export interface NewsletterInput extends AntiSpamState {
  email: string;
  fullName?: string;
}

export async function subscribeNewsletter(input: NewsletterInput): Promise<SendResult> {
  const email = clean(input.email, 160);
  if (!email) return { ok: false };
  if (looksAutomated(input)) return { ok: false };

  const result = await postRow('newsletter_subscribers', {
    email,
    full_name: clean(input.fullName, 120),
    source: 'portal',
  });

  // 409 : l'adresse est déjà inscrite. Pour le visiteur, c'est un succès.
  if (result.status === 409) return { ok: true };
  if (result.ok) trackEvent('form_newsletter', {});
  else if (result.status === 0 || result.status >= 500) {
    enqueue('newsletter_subscribers', { email, full_name: clean(input.fullName, 120), source: 'portal' });
  }
  return { ok: result.ok };
}

/* ------------------------------------------------------------------ */
/* Stages & recrutement                                                */
/* ------------------------------------------------------------------ */

export interface InternshipInput extends AntiSpamState {
  applicantRole: 'etudiant' | 'entreprise';
  name: string;
  phone: string;
  portfolioOrProfile?: string;
  message?: string;
}

export async function submitInternshipApplication(
  input: InternshipInput
): Promise<SendResult> {
  const name = clean(input.name, 160);
  const phone = clean(input.phone, 40);
  if (!name || !phone) return { ok: false };

  return send(
    'internship_applications',
    {
      applicant_role: input.applicantRole,
      name,
      phone,
      portfolio_or_profile: clean(input.portfolioOrProfile, 500),
      message: clean(input.message, 4000),
    },
    input,
    'form_stage'
  );
}
