/**
 * Configuration Supabase du portail PAG.
 *
 * L'URL et la clé publiable ci-dessous sont des identifiants PUBLICS : ils sont
 * de toute façon visibles dans le bundle envoyé au navigateur. Ce qui protège
 * les données, ce sont les règles RLS définies côté base (un visiteur anonyme
 * peut uniquement insérer une demande et lire les témoignages publiés).
 *
 * Ne JAMAIS placer ici (ni dans une variable VITE_) la clé `service_role` :
 * elle contourne toutes les règles de sécurité.
 *
 * Les valeurs peuvent être surchargées par les variables d'environnement
 * VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY (voir .env.example).
 */
const DEFAULT_SUPABASE_URL = 'https://uggykfmyzjlhnssghbje.supabase.co';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_nwlVfVjSFuZHA3lfB4io1Q_SeTKmg-h';

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(
  /\/+$/,
  ''
);

export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
