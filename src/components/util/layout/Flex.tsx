import { GlobalsNumber } from '@stitches/react/types/css-types';
import { CSSProps } from '@utils/styles';
import React, { CSSProperties } from 'react';
import { styled } from 'stitches.config';

const alignOptions = {
  start: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'flex-end',
  },
  stretch: {
    alignItems: 'stretch',
  },
  baseline: {
    alignItems: 'baseline',
  },
} as const;

const justifyOptions = {
  start: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  between: {
    justifyContent: 'space-between',
  },
} as const;

const directionOptions = {
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
} as const;
interface FlexOptions {
  align?: keyof typeof alignOptions;
  justify?: keyof typeof justifyOptions;
  direction?: keyof typeof directionOptions;
  flexGrow?: GlobalsNumber;
  flexBasis?: CSSProperties['flexBasis'];
  flexShrink?: CSSProperties['flexShrink'];
}

export function flex(flexOptions: FlexOptions) {
  const {
    align = 'flex-start',
    direction = 'row',
    justify = 'flex-start',
  } = flexOptions;

  return {
    alignItems: align,
    flexDirection: direction,
    justifyContent: justify,
  } as const;
}

type Props<ElementType extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[ElementType] &
    FlexOptions & {
      elementType?: keyof JSX.IntrinsicElements;
    } & CSSProps;

export const Flex = <E extends keyof JSX.IntrinsicElements>({
  align = 'start',
  direction = 'row',
  justify = 'start',
  elementType = 'div',
  ...props
}: Props<E>) => {
  const SFlex = styled(elementType, {
    display: 'flex',
    variants: {
      align: alignOptions,
      justify: justifyOptions,
      direction: directionOptions,
      wrap: {
        noWrap: {
          flexWrap: 'nowrap',
        },
        wrap: {
          flexWrap: 'wrap',
        },
        wrapReverse: {
          flexWrap: 'wrap-reverse',
        },
      },
    },
    defaultVariants: {
      direction: 'row',
      align: 'stretch',
      justify: 'start',
      wrap: 'noWrap',
    },
  }) as any;
  return (
    <SFlex align={align} direction={direction} justify={justify} {...props} />
  );
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
