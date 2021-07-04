import { CSSProps, mergeCss } from '@utils/styles';
import React, { HTMLProps, ReactNode } from 'react';
import { CSSType, styled } from 'stitches.config';

interface Props
  extends Omit<HTMLProps<HTMLDivElement>, 'children' | 'size'>,
    CSSProps {
  size?: CSSType['fontSizes'];
  children: Exclude<ReactNode, null | undefined>;
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold';

  /* text-align css property */
  align?: 'left' | 'center' | 'right' | 'justify';

  /** Link or text variant */
  variant?: 'text' | 'link';

  elementType?: keyof JSX.IntrinsicElements;
}

const Text = ({
  elementType = 'div',
  weight = 'normal',
  align = 'left',
  variant = 'text',
  size = 'base',
  ...props
}: Props) => {
  const SText = styled(elementType, {
    variants: {
      size: {
        xs: {
          fontSize: '$xs',
        },
        sm: {
          fontSize: '$sm',
        },
        base: {
          fontSize: '$base',
        },
        lg: {
          fontSize: '$lg',
        },
        xl: {
          fontSize: '$xl',
        },
        xxl: {
          fontSize: '$xxl',
        },
      },
      weight: {
        thin: {
          fontWeight: '$thin',
        },
        extralight: {
          fontWeight: '$extralight',
        },
        light: {
          fontWeight: '$light',
        },
        normal: {
          fontWeight: '$normal',
        },
        medium: {
          fontWeight: '$medium',
        },
        semibold: {
          fontWeight: '$semibold',
        },
        bold: {
          fontWeight: '$bold',
        },
        extrabold: {
          fontWeight: '$extrabold',
        },
        black: {
          fontWeight: '$black',
        },
      },
      align: {
        center: {
          textAlign: 'center',
        },
        left: {
          textAlign: 'left',
        },
        right: {
          textAlign: 'right',
        },
        justify: {
          textAlign: 'justify',
        },
      },
      variant: {
        text: {
          textDecoration: 'none',
        },
        link: {
          textDecoration: 'underline',
          '&:hover': {
            textDecorationColor: '$warmGray400',
          },
        },
      },
    },
  });

  return (
    <SText
      size={size}
      weight={weight}
      align={align}
      variant={variant}
      {...(props as any)}
    />
  );
};

export function Anchor({
  elementType = 'a',
  variant = 'link',
  children,
  css,
  ...others
}: Props) {
  return (
    <Text
      elementType={elementType}
      variant={variant}
      {...others}
      css={mergeCss(
        {
          display: 'inline-block',
          '&:hover': {
            opacity: 0.7,
          },
          '&:active': {
            opacity: 1,
            transition: 'transform 0s, opacity: 0s',
            transform: 'scale(0.95)',
          },
        },
        css
      )}
    >
      {children}
    </Text>
  );
}

Text.Anchor = Anchor;

export default Text;
