import React from 'react';
import LinearGradient, { GRADIENT_ID } from './LinearGradient';
import { GradientProps } from './models';

interface Props extends GradientProps {
  size: number;
  strokeWidth: number;
}
const Circle = ({ size, colorKeys, strokeWidth }: Props) => {
  return (
    <svg width={size} height={size}>
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
    </svg>
  );
};

export default Circle;
