import React from 'react';
import { rawColors } from 'stitches.config';
import { GradientProps } from './models';

export const GRADIENT_ID = 'LINEAR_GRADIENT';
const LinearGradient = ({ colorKeys }: Pick<GradientProps, 'colorKeys'>) => {
  return (
    <defs>
      <linearGradient id={GRADIENT_ID} x1="0" y1="1" x2="1" y2="0">
        {colorKeys.map((colorKey, index) => (
          <stop
            key={`${colorKey}-${index}`}
            offset={`${index}`}
            stopColor={rawColors[colorKey]}
          />
        ))}
      </linearGradient>
    </defs>
  );
};

export default LinearGradient;
