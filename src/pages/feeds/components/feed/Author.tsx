import Text from '@components/text';
import { CSSProps } from '@utils/styles';
import { ReactText } from 'react';

interface Props extends CSSProps {
  children: ReactText;
}

export function Author({ children, css }: Props) {
  return (
    <Text elementType="span" weight="bold" size="medium" css={css}>
      {children}
    </Text>
  );
}
