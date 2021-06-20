import { CSSProps } from '@utils/styles';
import React, { HTMLAttributes, ReactElement } from 'react';
import { styled, Color } from 'stitches.config';

interface Props extends HTMLAttributes<HTMLButtonElement>, CSSProps {
  color?: Color;
  size?: number;
}

export function Dot({ color = '$gray300', size = 8, css, ...props }: Props) {
  const SSpan = styled('span', {
    borderRadius: '50%',
  });

  const defaultCss = {
    backgroundColor: color,
    size,
  };

  const mergedCss = css != null ? { ...defaultCss, ...css } : defaultCss;

  return <SSpan css={mergedCss} {...props} />;
}

interface RootProps extends CSSProps {
  gap?: number;
  children: ReactElement[];
}

const RootElement = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});
function Root({ gap = 7, children }: RootProps) {
  return <RootElement css={{ spaceX: gap }}>{children}</RootElement>;
}

Dot.Root = Root;
