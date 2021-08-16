import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import { EmojiProfile } from '@pages/feeds/components/feed/emoji-profile/EmojiProfile';
import { Comment } from '@remotes/comments';
import { format, formatDistanceToNow } from 'date-fns';
import koLocale from 'date-fns/locale/ko';
import React, { LiHTMLAttributes, ReactText, useMemo } from 'react';

interface Props
  extends Omit<LiHTMLAttributes<HTMLLIElement>, 'children'>,
    Pick<Comment, 'createAt'> {
  children: ReactText;
}

export function CommentRow({ children, createAt, ...props }: Props) {
  const uniqueId = useMemo(() => {
    return EmojiProfile.getRandom();
  }, []);

  return (
    <Flex elementType="li" css={{ spaceX: '$8' }} {...props}>
      <EmojiProfile id={uniqueId} css={{ flexShrink: 0 }} />
      <Flex css={{ spaceY: '$4' }} direction="column">
        <Text
          as="p"
          size="lg"
          css={{ flexGrow: 1, color: '$gray700', wordBreak: 'keep-all' }}
        >
          {children}
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
