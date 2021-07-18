const HIDDEN = 'hidden';
const VISIBLE = 'visible';

export const fadeInOut = {
  initial: HIDDEN,
  animate: VISIBLE,
  exit: HIDDEN,
  variants: {
    [HIDDEN]: { opacity: 0 },
    [VISIBLE]: { opacity: 1 },
  },
  transition: {
    type: 'spring',
    duration: 0.3,
  },
} as const;
