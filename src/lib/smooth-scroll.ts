import Lenis from "lenis";

type Listener = () => void;

const listeners = new Set<Listener>();
let lenis: Lenis | null = null;

function emit() {
  listeners.forEach((fn) => fn());
}

/** Subscribe to scroll. Callbacks run inside the frame that moves the page, so style writes never lag behind it. */
export function onScroll(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function startSmoothScroll() {
  if (typeof window === "undefined") return () => {};
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    let frame = 0;
    const onNative = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(emit);
    };
    window.addEventListener("scroll", onNative, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onNative);
    };
  }

  const instance = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: true });
  lenis = instance;
  instance.on("scroll", emit);
  let frame = requestAnimationFrame(function loop(time) {
    instance.raf(time);
    frame = requestAnimationFrame(loop);
  });
  return () => {
    cancelAnimationFrame(frame);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

export function scrollToElement(el: HTMLElement | null) {
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4, easing: (t) => 1 - (1 - t) ** 4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function lockScroll(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
