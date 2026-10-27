/**
 * Mesure d'audience interne, sans traceur publicitaire et sans donnée personnelle.
 * L'identifiant de session est un simple UUID aléatoire, gardé le temps de l'onglet.
 */
import { postRow } from './supabaseRest';

const SESSION_KEY = 'pag_sid';
let cachedSessionId: string | null = null;
let lastPageViewKey = '';

function randomId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `sid-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

export function getSessionId(): string {
  if (cachedSessionId) return cachedSessionId;
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      cachedSessionId = stored;
      return stored;
    }
    const fresh = randomId();
    sessionStorage.setItem(SESSION_KEY, fresh);
    cachedSessionId = fresh;
    return fresh;
  } catch {
    cachedSessionId = cachedSessionId || randomId();
    return cachedSessionId;
  }
}

/** Provenance jointe à chaque demande enregistrée. */
export function getContext() {
  if (typeof window === 'undefined') {
    return { page_path: null, referrer: null, session_id: null, user_agent: null };
  }
  return {
    page_path: `${window.location.pathname}${window.location.hash}`.slice(0, 300),
    referrer: (document.referrer || '').slice(0, 500) || null,
    session_id: getSessionId(),
    user_agent: navigator.userAgent.slice(0, 400),
  };
}

export function trackEvent(eventName: string, metadata: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  void postRow('analytics_events', {
    event_name: eventName.slice(0, 60),
    path: `${window.location.pathname}${window.location.hash}`.slice(0, 300),
    referrer: (document.referrer || '').slice(0, 500) || null,
    session_id: getSessionId(),
    user_agent: navigator.userAgent.slice(0, 400),
    viewport_width: window.innerWidth,
    locale: navigator.language?.slice(0, 20) || null,
    metadata,
  });
}

/**
 * Vue d'écran. Dédoublonnée : en développement, React monte deux fois les effets
 * et compterait sinon chaque écran en double.
 */
export function trackPageView(screen: string): void {
  if (typeof window === 'undefined') return;
  const key = `${getSessionId()}:${screen}:${window.location.pathname}`;
  if (key === lastPageViewKey) return;
  lastPageViewKey = key;

  void postRow('analytics_events', {
    event_name: 'page_view',
    screen: screen.slice(0, 60),
    path: `${window.location.pathname}${window.location.hash}`.slice(0, 300),
    referrer: (document.referrer || '').slice(0, 500) || null,
    session_id: getSessionId(),
    user_agent: navigator.userAgent.slice(0, 400),
    viewport_width: window.innerWidth,
    locale: navigator.language?.slice(0, 20) || null,
  });
}
