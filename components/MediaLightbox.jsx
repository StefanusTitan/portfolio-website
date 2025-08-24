import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Image from 'next/image';
import styles from '../styles/Project.module.css';

const MediaLightbox = ({ images, active, setActive }) => {
  if (!images) return null;

  const close = () => setActive(null);

  return (
    <Dialog open={active !== null} onClose={close} maxWidth="lg" fullWidth>
      <DialogContent className={styles.lightboxContent} dividers>
        <button className={styles.lightboxClose} onClick={close} aria-label="Close">✕</button>
        {active !== null && (
          images[active].type === 'video' ? (
            <video
              src={images[active].src}
              controls
              autoPlay
              className={`${styles.lightboxVideo} ${styles.lightboxImageAnimate}`}
            />
          ) : (
            <Image
              src={images[active].src}
              alt={images[active].alt}
              className={`${styles.lightboxImage} ${styles.lightboxImageAnimate}`}
              width={1024}
              height={768}
            />
          )
        )}
        <div className={styles.lightboxCaption}>{active !== null ? (images[active].alt || '') : ''}</div>
        <div className={styles.lightboxNav}>
          <button onClick={() => setActive((s) => (s - 1 + images.length) % images.length)} aria-label="Previous">←</button>
          <button onClick={() => setActive((s) => (s + 1) % images.length)} aria-label="Next">→</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaLightbox;
