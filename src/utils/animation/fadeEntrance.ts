interface Params {
  direction?: 'top' | 'bottom';
  y?: number;
  opacityTransition?: boolean;
}
function fadeEntranceY(params?: Params) {
  const { direction = 'top', y = 10, opacityTransition = true } = params ?? {};
  return {
    initial: {
      y: direction === 'top' ? y : y * -1,
      opacity: opacityTransition ? 0 : 1,
    },
    animate: { y: 0, opacity: 1 },
  };
}

const fadeEntrance = {
  y: fadeEntranceY,
};

export default fadeEntrance;
