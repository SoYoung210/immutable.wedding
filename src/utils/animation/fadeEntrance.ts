function fadeEntranceY(direction?: 'top' | 'bottom', y = 10) {
  const _direction = direction ?? 'bottom';

  return {
    initial: { y: _direction === 'top' ? y : y * -1, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
}

const fadeEntrance = {
  y: fadeEntranceY,
};

export default fadeEntrance;
