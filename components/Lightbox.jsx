import { useEffect, useEffectEvent, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import styles from "./Lightbox.module.css";

export function Media({ item, className, controls = false, autoPlay = false, sizes, priority }) {
  if (item.type === "video") {
    return (
      <video
        className={className}
        src={controls || autoPlay ? item.src : `${item.src}#t=0.6`}
        aria-label={item.alt}
        muted={!controls}
        autoPlay={controls || autoPlay}
        controls={controls}
        playsInline
        loop={!controls}
        preload="metadata"
      />
    );
  }
  return (
    <Image
      className={className}
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      sizes={sizes}
      priority={priority}
    />
  );
}

// Opens from a thumbnail sharing the same layoutId, so the media grows out of where it was.
export default function Lightbox({ items, index, onChange, onClose, idPrefix }) {
  const lenis = useLenis();
  const closeButton = useRef(null);
  const open = index !== null;

  // Reads the latest callbacks without making the open/close effect re-run when they change.
  const onKey = useEffectEvent((event) => {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowRight") onChange((i) => (i + 1) % items.length);
    if (event.key === "ArrowLeft") onChange((i) => (i - 1 + items.length) % items.length);
  });

  useEffect(() => {
    if (!open) return;
    const returnFocus = document.activeElement;
    closeButton.current?.focus();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const handleKey = (event) => onKey(event);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
      returnFocus?.focus?.();
    };
  }, [open, lenis]);

  const item = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            layoutId={`${idPrefix}-${item.src}`}
            className={styles.stage}
            onClick={(event) => event.stopPropagation()}
            transition={{ type: "spring", bounce: 0.12, duration: 0.5 }}
          >
            <Media item={item} className={styles.media} controls sizes="100vw" priority />
          </motion.div>

          <div className={styles.bar} onClick={(event) => event.stopPropagation()}>
            <p className={styles.alt}>
              {item.alt}
              {items.length > 1 && (
                <span className={styles.position}>
                  {" "}
                  {index + 1} of {items.length}
                </span>
              )}
            </p>
            <div className={styles.actions}>
              {items.length > 1 && (
                <>
                  <button type="button" onClick={() => onChange((i) => (i - 1 + items.length) % items.length)}>
                    Previous
                  </button>
                  <button type="button" onClick={() => onChange((i) => (i + 1) % items.length)}>
                    Next
                  </button>
                </>
              )}
              <button type="button" ref={closeButton} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
