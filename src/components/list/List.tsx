import { ListDivider } from '@components/list/ListDivider';
import { ListGroup } from '@components/list/ListGroup';
import { ListItem } from '@components/list/ListItem';
import { mergeCss } from '@utils/styles';
import { ComponentProps } from 'react';
import { styled } from 'stitches.config';

interface Props extends ComponentProps<typeof Stack> {
  spaceY?: number;
}

export function List({ spaceY = 24, css, ...props }: Props) {
  return <Stack css={mergeCss({ spaceY }, css)} {...props} />;
}

const Stack = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
});

List.Item = ListItem;
List.Divider = ListDivider;
List.Group = ListGroup;
