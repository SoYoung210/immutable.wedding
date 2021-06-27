import { ReactText } from 'react';
import Text from '@components/text';

interface Props {
  children: ReactText;
}

export function Description({ children }: Props) {
  return (
    <Text elementType="p" css={{ display: 'inline' }} weight="light" size="sm">
      {children}
    </Text>
  );
}
