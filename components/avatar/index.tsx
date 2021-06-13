import React from 'react';
import Image, { ImageProps } from 'next/image';

interface Props extends Omit<ImageProps, 'width' | 'height' | 'placeholder'> {
  src: string;
  size?: number;
}
const Avatar = ({ src, size = 30, ...props }: Props) => {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      placeholder="blur"
      blurDataURL=""
      className="rounded-full"
      {...props}
    />
  );
};

export default Avatar;
