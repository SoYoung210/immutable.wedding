const HIDDEN = 'hidden';
const VISIBLE = 'visible';

export const fadeInOut = {
  HIDDEN,
  VISIBLE,
  Variants: {
    [HIDDEN]: { opacity: 0 },
    [VISIBLE]: { opacity: 1 },
  },
};
