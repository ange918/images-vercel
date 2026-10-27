import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import { CAMPUSES_DATA, FORMATIONS_DATA, SERVICES_DATA } from "@/data/pagData";
import { submitContactMessage, submitQuoteRequest, submitRegistration, type SendResult } from "@/lib/submissions";
import { flushPending } from "@/lib/pendingQueue";
import { lockScroll } from "@/lib/scroll";

type Modal = { kind: "registration"; id?: string } | { kind: "quote"; id?: string } | null;
type Ctx = { openRegistration: (formationId?: string) => void; openQuote: (serviceId?: string) => void };

const RequestsContext = createContext<Ctx>({ openRegistration: () => {}, openQuote: () => {} });
export const useRequests = () => useContext(RequestsContext);

const CAMPUS_OPTIONS = CAMPUSES_DATA.map((c) => c.name.split(" (")[0]!.replace("Campus ", ""));

export type Status = { state: "idle" } | { state: "sending" } | { state: "done"; queued?: boolean } | { state: "error"; message: string };

/** Shared submit logic: validation message, sending state, confirmation. */
export function useSubmit(action: (data: FormData, antiSpam: { honeypot: string; mountedAt: number }) => Promise<SendResult>) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const mountedAt = useRef(Date.now());
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus({ state: "sending" });
    const result = await action(data, { honeypot: String(data.get("website") ?? ""), mountedAt: mountedAt.current });
    if (result.ok) setStatus({ state: "done" });
    else if (result.queued) setStatus({ state: "done", queued: true });
    else setStatus({ state: "error", message: "Votre demande n'a pas pu être envoyée. Vérifiez les champs obligatoires puis réessayez." });
  };
  return { status, submit, reset: () => setStatus({ state: "idle" }) };
}

const v = (d: FormData, k: string) => String(d.get(k) ?? "").trim();

export function Done({ queued, onClose, text }: { queued?: boolean; onClose?: () => void; text: string }) {
  return (
    <div className="sent swap">
      <span className="ico big"><CheckCircle2 size={30} /></span>
      <h3>Demande envoyée</h3>
      <p>{text}</p>
      {queued ? <p className="hint">Connexion instable : votre demande est gardée sur cet appareil et partira dès que le réseau revient.</p> : null}
      {onClose ? <button className="btn btn-dark" onClick={onClose}>Fermer</button> : null}
    </div>
  );
}

export function SubmitButton({ status, children }: { status: Status; children: ReactNode }) {
  return (
    <>
      {status.state === "error" ? <p role="alert" className="err">{status.message}</p> : null}
      <button type="submit" className="btn btn-dark" disabled={status.state === "sending"}>
        {status.state === "sending" ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
        {status.state === "sending" ? "Envoi en cours…" : children}
      </button>
    </>
  );
}

const Honeypot = () => (
  <label className="hp" aria-hidden="true">Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
);

function RegistrationForm({ formationId, onClose }: { formationId?: string; onClose: () => void }) {
  const { status, submit } = useSubmit((d, anti) => {
    const formation = FORMATIONS_DATA.find((f) => f.id === v(d, "formation"));
    return submitRegistration({
      source: "registration_modal",
      fullName: v(d, "name"),
      phone: v(d, "phone"),
      email: v(d, "email"),
      campus: v(d, "campus"),
      formationTitle: formation?.title,
      formationSlug: formation?.id,
      acceptWhatsapp: d.get("whatsapp") === "on",
      message: v(d, "message"),
      ...anti,
    });
  });
  if (status.state === "done") return <Done queued={status.queued} onClose={onClose} text="Merci ! L'équipe PAG a bien reçu votre demande d'inscription et vous recontactera très vite." />;
  return (
    <form onSubmit={submit} noValidate>
      <label>Formation souhaitée *
        <select name="formation" required defaultValue={formationId ?? FORMATIONS_DATA[0]!.id}>
          {FORMATIONS_DATA.map((f) => <option key={f.id} value={f.id}>{f.title} — {f.duration}</option>)}
        </select>
      </label>
      <label>Nom complet *<input name="name" autoComplete="name" required placeholder="Votre nom et prénom" /></label>
      <div className="two">
        <label>Téléphone *<input name="phone" type="tel" autoComplete="tel" placeholder="+229 …" /></label>
        <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" /></label>
      </div>
      <label>Campus
        <select name="campus" defaultValue="">
          <option value="">À préciser</option>
          {CAMPUS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label>Message (facultatif)<textarea name="message" rows={3} placeholder="Une question, une précision sur votre parcours…" /></label>
      <label className="check"><input type="checkbox" name="whatsapp" />Vous pouvez me recontacter sur WhatsApp</label>
      <Honeypot />
      <SubmitButton status={status}>Envoyer ma demande d'inscription</SubmitButton>
    </form>
  );
}

function QuoteForm({ serviceId, onClose }: { serviceId?: string; onClose: () => void }) {
  const { status, submit } = useSubmit((d, anti) => {
    const service = SERVICES_DATA.find((s) => s.id === v(d, "service"));
    return submitQuoteRequest({
      serviceTitle: service?.title ?? "",
      serviceSlug: service?.id,
      quantity: v(d, "quantity"),
      deadline: v(d, "deadline"),
      details: v(d, "details"),
      clientName: v(d, "name"),
      clientPhone: v(d, "phone"),
      clientEmail: v(d, "email"),
      ...anti,
    });
  });
  if (status.state === "done") return <Done queued={status.queued} onClose={onClose} text="Merci ! L'agence PAG a bien reçu votre demande et vous répondra avec un devis." />;
  return (
    <form onSubmit={submit} noValidate>
      <label>Service demandé *
        <select name="service" required defaultValue={serviceId ?? SERVICES_DATA[0]!.id}>
          {SERVICES_DATA.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </label>
      <label>Nom complet *<input name="name" autoComplete="name" required placeholder="Votre nom ou celui de votre structure" /></label>
      <div className="two">
        <label>Téléphone *<input name="phone" type="tel" autoComplete="tel" placeholder="+229 …" /></label>
        <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" /></label>
      </div>
      <div className="two">
        <label>Quantité<input name="quantity" placeholder="Ex : 50 t-shirts" /></label>
        <label>Délai souhaité<input name="deadline" placeholder="Ex : sous 2 semaines" /></label>
      </div>
      <label>Détails du projet<textarea name="details" rows={3} placeholder="Décrivez votre besoin" /></label>
      <Honeypot />
      <SubmitButton status={status}>Envoyer ma demande de devis</SubmitButton>
    </form>
  );
}

/** Contact form of the contact page. */
export function ContactForm() {
  const { status, submit, reset } = useSubmit((d, anti) =>
    submitContactMessage({
      subjectType: v(d, "subject") as "formation" | "service" | "stage" | "autre",
      senderName: v(d, "name"),
      senderEmail: v(d, "email"),
      senderPhone: v(d, "phone"),
      senderCampus: v(d, "campus"),
      body: v(d, "message"),
      ...anti,
    }),
  );
  return (
    <div className="form-card">
      <h3>Envoyez-nous un message</h3>
      {status.state === "done" ? (
        <>
          <Done queued={status.queued} text="Merci ! Votre message a bien été transmis, l'équipe PAG vous répond rapidement." />
          <button className="btn btn-line btn-sm" onClick={reset}>Envoyer un autre message</button>
        </>
      ) : (
        <form onSubmit={submit} noValidate>
          <label>Nom complet *<input name="name" autoComplete="name" required placeholder="Votre nom" /></label>
          <div className="two">
            <label>Téléphone<input name="phone" type="tel" autoComplete="tel" placeholder="+229 …" /></label>
            <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" /></label>
          </div>
          <div className="two">
            <label>Sujet
              <select name="subject" defaultValue="formation">
                <option value="formation">Une formation</option>
                <option value="service">Un service de l'agence</option>
                <option value="stage">Un stage</option>
                <option value="autre">Autre demande</option>
              </select>
            </label>
            <label>Campus
              <select name="campus" defaultValue="">
                <option value="">À préciser</option>
                {CAMPUS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <label>Message *<textarea name="message" rows={4} required placeholder="Votre message" /></label>
          <p className="hint" style={{ margin: 0 }}>Indiquez au moins un téléphone ou un e-mail pour que nous puissions vous répondre.</p>
          <Honeypot />
          <SubmitButton status={status}>Envoyer le message</SubmitButton>
        </form>
      )}
    </div>
  );
}

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<Modal>(null);
  const close = useCallback(() => setModal(null), []);
  const ctx = useMemo<Ctx>(() => ({ openRegistration: (id) => setModal({ kind: "registration", id }), openQuote: (id) => setModal({ kind: "quote", id }) }), []);

  useEffect(() => {
    void flushPending();
  }, []);

  useEffect(() => {
    if (!modal) return;
    lockScroll(true);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modal, close]);

  return (
    <RequestsContext.Provider value={ctx}>
      {children}
      {modal ? (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="modal-card narrow form-card" role="dialog" aria-modal="true" data-lenis-prevent>
            <button className="close" onClick={close} aria-label="Fermer"><X size={22} /></button>
            <h3>{modal.kind === "registration" ? "Inscription à une formation" : "Demande de devis"}</h3>
            {modal.kind === "registration" ? <RegistrationForm formationId={modal.id} onClose={close} /> : <QuoteForm serviceId={modal.id} onClose={close} />}
          </div>
        </div>
      ) : null}
    </RequestsContext.Provider>
  );
}
