import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

// Lenis smooths wheel scrolling; the header drives section jumps itself. It stays off for
// people who ask their system for reduced motion.
export default function SmoothScroll({ children }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!enabled) return children;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        prevent: (node) => node.closest?.("[data-lenis-prevent]") != null,
      }}
    >
      {children}
    </ReactLenis>
  );
}
