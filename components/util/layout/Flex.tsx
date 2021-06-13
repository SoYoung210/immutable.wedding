import React, { CSSProperties, ReactElement } from 'react';
import { css } from '@emotion/react';

interface FlexOptions {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  flexGrow?: CSSProperties['flexGrow'];
  flexBasis?: CSSProperties['flexBasis'];
  flexShrink?: CSSProperties['flexShrink'];
}

export function flex(
  alignOrFlexOptions: FlexOptions | string,
  justify = 'flex-start',
  direction = 'row'
) {
  if (typeof alignOrFlexOptions === 'object') {
    const {
      align = 'flex-start',
      direction = 'row',
      justify = 'flex-start',
    } = alignOrFlexOptions;

    return css`
      align-items: ${align};
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};
    `;
  }

  return css`
    align-items: ${alignOrFlexOptions};
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
  `;
}

type Props<ElementType extends keyof JSX.IntrinsicElements = 'div'> =
  JSX.IntrinsicElements[ElementType] &
    FlexOptions & {
      elementType?: ElementType | NonNullable<ReactElement>;
    };

export const Flex = ({
  align = 'flex-start',
  direction = 'row',
  justify = 'flex-start',
  elementType: ElementType = 'div',
  ...props
}: Props) => {
  const Component = ElementType as any;
  return <Component css={flex({ align, direction, justify })} {...props} />;
};

Flex.Center = (props: Props) => (
  <Flex align="center" justify="center" {...props} />
);
Flex.CenterVertical = (props: Props) => <Flex align="center" {...props} />;
Flex.CenterHorizontal = (props: Props) => <Flex justify="center" {...props} />;
