import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/** Jump to the top without animation (also resets Lenis' own target, so the page never slides back). */
export function scrollTopNow() {
  if (instance) instance.scrollTo(0, { immediate: true, force: true });
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

export function lockScroll(locked: boolean) {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}
