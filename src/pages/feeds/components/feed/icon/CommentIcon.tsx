import Image from '@components/image';

export function CommentIcon() {
  return (
    <Image.Root as="button">
      <Image width={24} height={24}>
        <Image.Source src="/assets/icon/comment.png" alt="코멘트_아이콘" />
      </Image>
    </Image.Root>
  );
}
