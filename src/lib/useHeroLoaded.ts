import { useEffect, type RefObject } from "react";

/**
 * Starts the hero entrance animation. The hidden starting state is already on screen (the `js` class is set
 * in index.html), so we wait for the fonts and a short beat before adding `loaded`; this way the animation
 * is played on a direct page load as well as on a client-side navigation.
 */
export function useHeroLoaded(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let timer = 0;
    const start = () => {
      if (cancelled) return;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        timer = window.setTimeout(() => !cancelled && el.classList.add("loaded"), 120);
      }));
    };
    const fonts = document.fonts?.ready;
    if (fonts) {
      let done = false;
      const go = () => { if (!done) { done = true; start(); } };
      fonts.then(go, go);
      window.setTimeout(go, 700);
    } else start();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [ref]);
}
