import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import useBooleanState from '@hooks/useBooleanState';
import { useComments } from '@pages/feeds/components/feed/comments/useComments';
import { EmojiProfile } from '@pages/feeds/components/feed/emoji-profile/EmojiProfile';
import { format, formatDistanceToNow } from 'date-fns';
import koLocale from 'date-fns/locale/ko';
import React, { ReactText, useMemo } from 'react';
import { styled } from 'stitches.config';

interface Props {
  id: number;
}

export function Comments({ id }: Props) {
  const [folded, fold, unfold] = useBooleanState(true);
  const { data: comments } = useComments(id);

  if (comments == null || comments.length === 0) {
    return null;
  }

  if (folded) {
    return (
      <div>
        <CommentList>
          {comments.slice(0, 1).map(({ id, message, createAt }) => {
            return <Comment key={id} contents={message} createAt={createAt} />;
          })}
        </CommentList>
        {comments.length - 1 > 0 ? (
          <Button type="button" onClick={unfold}>
            {comments.length - 1}개 더보기
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <CommentList>
        {comments.map(({ id, message, createAt }) => {
          return <Comment key={id} contents={message} createAt={createAt} />;
        })}
      </CommentList>
      <Button type="button" onClick={fold}>
        접기
      </Button>
    </div>
  );
}

function Comment({
  contents,
  createAt,
}: {
  contents: ReactText;
  createAt: string;
}) {
  const uniqueId = useMemo(() => {
    return EmojiProfile.getRandom();
  }, []);

  return (
    <Flex elementType="li" css={{ spaceX: '$8' }}>
      <EmojiProfile id={uniqueId} css={{ flexShrink: 0 }} />
      <Flex css={{ spaceY: '$4' }} direction="column">
        <Text
          as="p"
          size="lg"
          css={{ flexGrow: 1, color: '$gray700', wordBreak: 'keep-all' }}
        >
          {contents}
        </Text>
        <Text
          as="time"
          dateTime={format(new Date(createAt), 'yyyy-MM-dd HH:mm:ss')}
          size="sm"
          css={{ flexShrink: 0, color: '$gray500' }}
        >
          {formatDistanceToNow(new Date(createAt), {
            locale: koLocale,
            addSuffix: true,
          })}
        </Text>
      </Flex>
    </Flex>
  );
}

const CommentList = styled('ul', {
  my: '$8',
  spaceY: '$6',
});

const Button = styled('button', {
  color: '$gray500',
});
