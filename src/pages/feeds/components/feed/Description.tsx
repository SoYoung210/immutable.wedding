import { ReactText } from 'react';
import Text from '@components/text';

interface Props {
  children: ReactText;
}

export function Description({ children }: Props) {
  return (
    <Text
      elementType="p"
      css={{
        display: 'inline',
        wordBreak: 'keep-all',
        lineHeight: '1.3',
        whiteSpace: 'pre-wrap',
      }}
      weight="normal"
      size="medium"
    >
      {children}
    </Text>
  );
}
