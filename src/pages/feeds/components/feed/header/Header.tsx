import Image from '@components/image';
import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import { useAccount } from '../useAccount';

export function Header() {
  const { data: account } = useAccount();

  return (
    <Flex.CenterVertical css={{ px: '$12', py: '$8' }}>
      <Image.Root
        css={{
          display: 'flex',
          borderRadius: '50%',
          border: '1px solid $gray200',
          backgroundColor: '$gray100',
        }}
      >
        <Image.RoundShape width={32} height={32}>
          <Image.Source src={account.profileSrc} alt={account.profileAlt} />
        </Image.RoundShape>
      </Image.Root>
      <Text weight="bold" css={{ ml: '$6' }}>
        {account.name}
      </Text>
    </Flex.CenterVertical>
  );
}
