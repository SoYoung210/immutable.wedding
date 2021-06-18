import React, { Children, ReactElement, ReactNode } from 'react';
import NextImage, { ImageProps } from 'next/image';
import { WithRequiredKeys } from 'utils/types';

interface Props
  extends Omit<ImageProps, 'width' | 'height' | 'placeholder' | 'src' | 'alt'> {
  size?: number;
  variants?: ReactNode;
  children: ReactElement<
    WithRequiredKeys<React.HTMLProps<HTMLImageElement>, 'src' | 'alt'>
  >;
  wrapperProps?: React.HTMLProps<HTMLDivElement>;
}
const Image = ({
  className,
  size = 30,
  variants,
  children,
  wrapperProps,
  ...props
}: Props) => {
  const imageSource = Children.only(children);

  return (
    <div {...wrapperProps}>
      <NextImage
        src={imageSource.props.src}
        alt={imageSource.props.alt}
        width={size}
        height={size}
        className={className}
        placeholder="blur"
        blurDataURL=""
        {...props}
      />
      {variants}
    </div>
  );
};

Image.Source = ({ src, alt }: { src: string; alt: string }) => {
  return <img src={src} alt={alt} />;
};
Image.RoundShape = (props: Props) => (
  <Image {...props} className="rounded-full" />
);

export default Image;
