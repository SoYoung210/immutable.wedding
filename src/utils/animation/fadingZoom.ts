interface Params {
  opacityVariants?: number[];
  scaleVariants?: number[];
}

const DEFAULT_ANIMATION = {
  opacityVariants: [0.9, 0.9, 0.9],
  scaleVariants: [1.2, 0.95],
};

export default function fadingZoom(params?: Params) {
  // const { opacityVariants, scaleVariants } = params ?? DEFAULT_ANIMATION;
  const opacityVariants =
    params?.opacityVariants ?? DEFAULT_ANIMATION.opacityVariants;
  const scaleVariants =
    params?.scaleVariants ?? DEFAULT_ANIMATION.scaleVariants;

  return {
    opacity: [0, ...opacityVariants, 1],
    scale: [0, ...scaleVariants, 1],
  };
}
