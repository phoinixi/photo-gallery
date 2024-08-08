import { makeStyles, Spinner, tokens } from '@fluentui/react-components';
import { useEffect } from 'react';

const useStylesOverlay = makeStyles({
  spinner: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    opacity: 0.6
  }
});

export function SpinnerOverlay() {
  const classes = useStylesOverlay();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className={classes.overlay} />
      <Spinner size="huge" className={classes.spinner} />
    </>
  );
}
