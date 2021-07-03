import { CSSProps, mergeCss } from '@utils/styles';
import { WithRequiredKeys } from '@utils/types';
import NextImage, { ImageProps } from 'next/image';
import React, { Children, ReactElement, ReactNode } from 'react';
import { styled } from 'stitches.config';

interface Props
  extends WithRequiredKeys<Omit<ImageProps, 'src' | 'alt'>, 'width' | 'height'>,
    CSSProps {
  variants?: ReactNode;
  children: ReactElement<
    WithRequiredKeys<React.HTMLProps<HTMLImageElement>, 'src' | 'alt'>
  >;
}
const Image = ({ width, height, variants, children, ...props }: Props) => {
  const imageSource = Children.only(children);
  const SImage = styled(NextImage, {
    width,
    height,
  });

  return (
    <>
      <SImage
        src={imageSource.props.src}
        alt={imageSource.props.alt}
        width={width}
        height={height}
        {...props}
      />
      {variants}
    </>
  );
};

Image.Root = styled('div', {});
Image.Source = ({ src, alt }: { src: string; alt: string }) => {
  return <img src={src} alt={alt} />;
};
Image.RoundShape = ({ css, ...props }: Props) => (
  <Image {...props} css={mergeCss({ borderRadius: '$round' }, css)} />
);

export default Image;
