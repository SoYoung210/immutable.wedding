import React, { CSSProperties } from 'react';
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

<<<<<<< HEAD
type Props<ElementType extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[ElementType] &
    FlexOptions & {
      elementType?: keyof JSX.IntrinsicElements;
    };

export const Flex = <E extends keyof JSX.IntrinsicElements>({
  align = 'flex-start',
  direction = 'row',
  justify = 'flex-start',
  elementType = 'div',
  ...props
}: Props<E>) => {
  const Component = elementType as any;
  return <Component css={flex({ align, direction, justify })} {...props} />;
};

Flex.Center = <E extends keyof JSX.IntrinsicElements>(props: Props<E>) => (
  <Flex<E> align="center" justify="center" {...props} />
);
Flex.CenterVertical = <E extends keyof JSX.IntrinsicElements>(
  props: Props<E>
) => <Flex<E> align="center" {...props} />;
Flex.CenterHorizontal = <E extends keyof JSX.IntrinsicElements>(
  props: Props<E>
) => <Flex<E> justify="center" {...props} />;
=======
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
>>>>>>> 3fd8691 (chore: add util component)
