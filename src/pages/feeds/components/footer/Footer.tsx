import Text from '@components/text';
import { styled } from 'stitches.config';

export function Footer() {
  return (
    <StyledFooter>
      <Text
        weight="light"
        size="sm"
        css={{ color: '$gray400', mt: '$4', textAlign: 'center' }}
      >
        @Copyright Jbee, Soso
      </Text>
    </StyledFooter>
  );
}

const StyledFooter = styled('footer', {
  mx: 'auto',
  py: '64px',
  width: '100%',
});
