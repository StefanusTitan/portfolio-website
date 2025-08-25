import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Image from 'next/image';
import styles from '../styles/Project.module.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

const MediaLightbox = ({ images, active, setActive }) => {
  if (!images) return null;

  const close = () => setActive(null);
  const theme  = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={active !== null} onClose={close} maxWidth="lg" fullWidth fullScreen={isMobile}>
      <DialogContent className={styles.lightboxContent}>
        <IconButton color="error" onClick={close} aria-label="Close" sx={{position: 'absolute', right: 8, top: 8}}>
          <Close />
        </IconButton>
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
