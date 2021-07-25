import Text from '@components/text';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof Text>;

export function ListItemText({
  size = 'xxl',
  weight = 'normal',
  ...props
}: Props) {
  return <Text size={size} weight={weight} {...props} />;
}
