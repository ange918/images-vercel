/**
 * Accès REST minimal à Supabase pour le site public.
 *
 * Le site public n'embarque volontairement pas le SDK Supabase : il n'a besoin
 * que d'insérer des demandes et de lire les témoignages publiés. Le SDK complet
 * est réservé au tableau de bord (chargé à part, sous /admin).
 *
 * IMPORTANT : ne jamais demander `Prefer: return=representation` sur une
 * insertion publique. Le rôle anonyme a une policy INSERT seule ; PostgREST
 * exigerait alors une policy SELECT et refuserait toute l'écriture (42501).
 */
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, isSupabaseConfigured } from './supabaseConfig';

const REQUEST_TIMEOUT_MS = 8000;

export interface PostResult {
  ok: boolean;
  status: number;
}

function baseHeaders(): Record<string, string> {
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
  };
}

function timeoutSignal(): AbortSignal | undefined {
  try {
    return AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  } catch {
    return undefined;
  }
}

/** Insère une ligne. Ne lève jamais : renvoie simplement ok=false en cas d'échec. */
export async function postRow(
  table: string,
  payload: Record<string, unknown>
): Promise<PostResult> {
  if (!isSupabaseConfigured) return { ok: false, status: 0 };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        ...baseHeaders(),
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
      signal: timeoutSignal(),
    });

    if (!response.ok) {
      console.warn(`[PAG] envoi refusé (${table})`, response.status);
    }
    return { ok: response.ok, status: response.status };
  } catch (error) {
    console.warn(`[PAG] envoi impossible (${table})`, error);
    return { ok: false, status: 0 };
  }
}

/**
 * Lit des lignes. Renvoie `null` si la requête a échoué (réseau, configuration,
 * refus) et un tableau si elle a abouti — y compris un tableau vide.
 */
export async function selectRows<T>(table: string, query: string): Promise<T[] | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      headers: { ...baseHeaders(), Accept: 'application/json' },
      signal: timeoutSignal(),
    });
    if (!response.ok) {
      console.warn(`[PAG] lecture refusée (${table})`, response.status);
      return null;
    }
    return (await response.json()) as T[];
  } catch (error) {
    console.warn(`[PAG] lecture impossible (${table})`, error);
    return null;
  }
}
