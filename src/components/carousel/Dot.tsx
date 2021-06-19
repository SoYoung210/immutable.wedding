import { Color } from '@utils/styles';
import React, { HTMLAttributes, ReactElement } from 'react';
import cx from 'classnames';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  color?: Color;
  size?: number;
}

export function Dot({
  color = 'gray-300',
  className,
  size = 8,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cx(`bg-${color} w-${size} h-${size} rounded-full`, className)}
      {...props}
    />
  );
}

interface RootProps {
  gap?: number;
  children: ReactElement[];
}

function Root({ gap = 7, children }: RootProps) {
  return <div className={`flex justify-center space-x-${gap}`}>{children}</div>;
}

Dot.Root = Root;
