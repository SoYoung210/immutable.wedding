const UP = 'up';
const DOWN = 'down';

interface Options {
  y?: number;
}

export function slideUpDown({ y = 120 }: Options = {}) {
  return {
    initial: DOWN,
    animate: UP,
    exit: DOWN,
    variants: {
      [UP]: { y: 0 },
      [DOWN]: { y },
    },
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  } as const;
}
