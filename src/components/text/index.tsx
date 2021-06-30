import { CSSProps } from '@utils/styles';
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
  ...others
}: Props) {
  return (
    <Text elementType={elementType} variant={variant} {...others}>
      {children}
    </Text>
  );
}

Text.Anchor = Anchor;

export default Text;
