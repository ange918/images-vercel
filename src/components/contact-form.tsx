import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const field =
  "mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base outline-none transition-colors placeholder:text-faint focus:border-night";

/** Builds a WhatsApp message from the form and opens the chat with the studio. */
export function ContactForm({ whatsapp, topics }: { whatsapp: string; topics: string[] }) {
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const name = value("name");
    const message = value("message");
    if (!name || !message) {
      setError("Indiquez votre nom et votre message.");
      return;
    }
    setError("");
    const lines = [
      "Bonjour Pénielle Art Graphic,",
      "",
      `Nom : ${name}`,
      value("topic") ? `Sujet : ${value("topic")}` : "",
      value("date") ? `Date souhaitée : ${value("date")}` : "",
      "",
      message,
    ].filter((line, i, all) => line !== "" || (i > 0 && all[i - 1] !== ""));
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="rounded-3xl bg-mist p-6 md:p-8" noValidate>
      <p className="text-xs text-muted">Écrivez-nous sur WhatsApp</p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Nom
          <input name="name" autoComplete="name" required placeholder="Votre nom" className={field} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Sujet
            <select name="topic" defaultValue="" className={field}>
              <option value="">À préciser</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
                            <option value="Autre demande">Autre demande</option>
            </select>
          </label>
          <label className="block text-sm font-medium">
            Date souhaitée
            <input name="date" type="date" className={field} />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Message
          <textarea name="message" required rows={4} placeholder="Décrivez votre demande" className={cn(field, "resize-y")} />
        </label>
      </div>
      {error ? (
        <p role="alert" className="mt-3 text-sm font-medium text-ink">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={!whatsapp}
        className="press mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-night px-6 py-4 text-sm font-medium text-paper disabled:opacity-50 sm:w-auto"
      >
        Envoyer sur WhatsApp
        <ArrowUpRight className="size-4" />
      </button>
      <p className="mt-3 text-xs text-muted">
        {whatsapp ? "Votre message s'ouvre dans WhatsApp, prêt à être envoyé." : "Le numéro WhatsApp n'est pas encore configuré."}
      </p>
    </form>
  );
}
