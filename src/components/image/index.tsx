import React, {
  Children,
  HTMLProps,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import NextImage, { ImageProps } from 'next/image';
import { WithRequiredKeys } from '@utils/types';

interface Props
  extends WithRequiredKeys<
    Omit<ImageProps, 'placeholder' | 'src' | 'alt'>,
    'width' | 'height'
  > {
  variants?: ReactNode;
  children: ReactElement<
    WithRequiredKeys<React.HTMLProps<HTMLImageElement>, 'src' | 'alt'>
  >;
}
const Image = ({
  className,
  width,
  height,
  variants,
  children,
  ...props
}: Props) => {
  const imageSource = Children.only(children);

  return (
    <>
      <NextImage
        src={imageSource.props.src}
        alt={imageSource.props.alt}
        width={width}
        height={height}
        className={className}
        placeholder="blur"
        blurDataURL=""
        {...props}
      />
      {variants}
    </>
  );
};

Image.Root = ({
  children,
  ...props
}: PropsWithChildren<HTMLProps<HTMLDivElement>>) => {
  return <div {...props}>{children}</div>;
};
Image.Source = ({ src, alt }: { src: string; alt: string }) => {
  return <img src={src} alt={alt} />;
};
Image.RoundShape = (props: Props) => (
  <Image {...props} className="rounded-full" />
);

export default Image;
