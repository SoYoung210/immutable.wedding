import React from 'react';
import LinearGradient, { GRADIENT_ID } from './LinearGradient';
import { GradientProps } from './models';
import { motion, SVGMotionProps, Variants } from 'framer-motion';
import getRandomNumByRange from '@utils/math/getRandomNumByRange';

const defaultVariants: Variants = {
  active: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      delay: getRandomNumByRange(0, 2.5),
    },
  },
};
interface Props extends GradientProps {
  size: number;
  strokeWidth: number;
  motionProps?: SVGMotionProps<SVGSVGElement>;
  rotateAnimation?: boolean;
}
const Circle = ({
  size,
  colorKeys,
  strokeWidth,
  rotateAnimation,
  motionProps,
}: Props) => {
  return (
    <motion.svg
      width={size}
      height={size}
      variants={defaultVariants}
      animate={rotateAnimation ? 'active' : undefined}
      {...motionProps}
    >
      <LinearGradient colorKeys={colorKeys} />
      <g fill="none">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth}
          stroke={`url(#${GRADIENT_ID})`}
          strokeWidth={strokeWidth}
        />
      </g>
    </motion.svg>
  );
};

export default Circle;
