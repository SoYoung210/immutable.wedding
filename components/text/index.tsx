import { ComponentPassThrough } from '@utils/types';
import React, { HTMLProps, ReactText } from 'react';
import cx from 'classnames';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  children: ReactText;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold';
  // TODO: 템플릿 리터럴 타입으로 변경
  color?: string;
  /* text-transform css property */
  transform?: 'capitalize' | 'uppercase' | 'lowercase';

  /* text-align css property */
  align?: 'left' | 'center' | 'right' | 'justify';

  /** Link or text variant */
  variant?: 'text' | 'link';
}

const Text = <T extends React.ElementType = 'div', U = HTMLDivElement>({
  className,
  component = 'div',
  children,
  size = 'base',
  weight,
  transform,
  style,
  color,
  align,
  variant = 'text',
  elementRef,
  ...others
}: ComponentPassThrough<T, Props>) => {
  return React.createElement(
    component,
    {
      // fontSize, text transform, text align, custom className
      className: cx(
        `text-${size}`,
        transform,
        `text-${align}`,
        `text-${color}`,
        `font-${weight}`,
        className
      ),
      ref: elementRef,
      style: {
        '&:hover': {
          ...style?.['&:hover'],
          textDecoration: variant === 'link' ? 'underline' : 'none',
        },
        ...style,
      },
      ...others,
    },
    children
  );
};

export function Anchor<
  T extends React.ElementType = 'a',
  U = HTMLAnchorElement
>({
  component = 'a',
  children,
  ...others
}: ComponentPassThrough<T, Props> & {
  elementRef?: React.ForwardedRef<U>;
}) {
  return (
    <Text component={component} variant="link" {...others}>
      {children}
    </Text>
  );
}

Text.Anchor = Anchor;

export default Text;
