import Image from '@components/image';

export function LikeIcon() {
  return (
    <Image.Root as="button">
      <Image width={24} height={24}>
        <Image.Source src="/assets/icon/heart.png" alt="좋아요 아이콘" />
      </Image>
    </Image.Root>
  );
}
