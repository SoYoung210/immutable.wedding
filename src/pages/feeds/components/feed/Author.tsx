import { ReactText } from 'react';
import Text from '@components/text';

interface Props {
  children: ReactText;
}

export function Author({ children }: Props) {
  return (
    <Text elementType="span" weight="bold" size="sm">
      {children}
    </Text>
  );
}
