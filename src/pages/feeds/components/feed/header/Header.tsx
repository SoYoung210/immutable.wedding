import Image from '@components/image';
import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import { css } from 'stitches.config';
import { useAccount } from '../useAccount';

const avatarLayout = css({ display: 'flex' });
export function Header() {
  const { data: account } = useAccount();

  return (
    <Flex.CenterVertical css={{ py: '$9', px: '$8' }}>
      <Image.Root className={avatarLayout()}>
        <Image.RoundShape width={30} height={30}>
          <Image.Source src={account.profileSrc} alt={account.profileAlt} />
        </Image.RoundShape>
      </Image.Root>
      <Text weight="bold" css={{ ml: '$6' }}>
        {account.name}
      </Text>
    </Flex.CenterVertical>
  );
}
