import Image from '@components/image';
import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import { useAccount } from './useAccount';

export function Header() {
  const { data: account } = useAccount();

  return (
    <Flex.CenterVertical className="py-9 px-8">
      <Image.Root className="flex">
        <Image.RoundShape width={30} height={30}>
          <Image.Source src={account.profileSrc} alt={account.profileAlt} />
        </Image.RoundShape>
      </Image.Root>
      <Text weight="bold" className="ml-6">
        {account.name}
      </Text>
    </Flex.CenterVertical>
  );
}
