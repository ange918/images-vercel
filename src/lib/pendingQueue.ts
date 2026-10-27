/**
 * File d'attente locale : si une demande n'a pas pu partir (réseau coupé), elle
 * est gardée dans le navigateur et retentée au chargement suivant. Best effort,
 * jamais bloquant : une demande vieille de plus de 7 jours est abandonnée.
 */
import { postRow } from './supabaseRest';

const STORAGE_KEY = 'pag_pending_submissions';
const MAX_ENTRIES = 20;
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

interface PendingEntry {
  table: string;
  payload: Record<string, unknown>;
  queuedAt: number;
}

function read(): PendingEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PendingEntry[]) : [];
  } catch {
    return [];
  }
}

function write(entries: PendingEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch {
    /* navigation privée : on abandonne silencieusement */
  }
}

export function enqueue(table: string, payload: Record<string, unknown>): void {
  const entries = read();
  entries.push({ table, payload, queuedAt: Date.now() });
  write(entries);
}

/** Retente les envois en attente. Une réponse 4xx n'est jamais retentée. */
export async function flushPending(): Promise<void> {
  const entries = read();
  if (entries.length === 0) return;

  const now = Date.now();
  const remaining: PendingEntry[] = [];

  for (const entry of entries) {
    if (now - entry.queuedAt > MAX_AGE_MS) continue;
    const result = await postRow(entry.table, entry.payload);
    if (!result.ok && result.status !== 0 && result.status < 500) continue;
    if (!result.ok) remaining.push(entry);
  }

  write(remaining);
}
