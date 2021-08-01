import { ComponentProps } from 'react';
import { styled } from 'stitches.config';

type Props = ComponentProps<typeof Divider>;

export function ListDivider(props: Props) {
  return <Divider {...props} />;
}

const Divider = styled('hr', {
  width: '100%',
  height: '1px',
  backgroundColor: '$gray200',
  border: 'none',
});
