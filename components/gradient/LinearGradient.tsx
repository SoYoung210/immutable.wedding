import React from 'react';
import { GradientProps } from './models';

export const GRADIENT_ID = 'LINEAR_GRADIENT';
const LinearGradient = ({ colors }: Pick<GradientProps, 'colors'>) => {
  return (
    <defs>
      <linearGradient id={GRADIENT_ID} x1="0" y1="1" x2="1" y2="0">
        {colors.map((color, index) => (
          <stop
            key={`${color}-${index}`}
            offset={`${index}`}
            stopColor={color}
          />
        ))}
      </linearGradient>
    </defs>
  );
};

export default LinearGradient;
