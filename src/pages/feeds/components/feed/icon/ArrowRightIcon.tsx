import Image from '@components/image';

export function ArrowRightIcon() {
  return (
    <Image.Root as="button" css={{ display: 'flex' }}>
      <Image width={24} height={24}>
        <Image.Source src="/assets/icon/arrow-right.png" alt="오른쪽 화살표" />
      </Image>
    </Image.Root>
  );
}
