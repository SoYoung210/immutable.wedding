import React, {
  Children,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import NextImage, { ImageProps } from 'next/image';
import { WithRequiredKeys } from '@utils/types';
import { styled } from 'stitches.config';
import { CSSProps, mergeCss } from '@utils/styles';

interface Props
  extends WithRequiredKeys<
      Omit<ImageProps, 'placeholder' | 'src' | 'alt'>,
      'width' | 'height'
    >,
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
        placeholder="blur"
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
