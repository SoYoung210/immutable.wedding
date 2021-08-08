import Text from '@components/text';
import { Flex } from '@components/util/layout/Flex';
import useBooleanState from '@hooks/useBooleanState';
import { useComments } from '@pages/feeds/components/feed/comments/useComments';
import { EmojiProfile } from '@pages/feeds/components/feed/emoji-profile/EmojiProfile';
import { format, formatDistanceToNow } from 'date-fns';
import koLocale from 'date-fns/locale/ko';
import React, { ReactText, useMemo } from 'react';
import { styled } from 'stitches.config';
import { motion } from 'framer-motion';

interface Props {
  id: number;
}

const variants = {
  hidden: {
    height: 42,
    overflow: 'hidden',
    transition: {
      damping: 5,
      duration: 0.2,
    },
  },
  visible: {
    height: 'auto',
    overflow: 'visible',
  },
};

export function Comments({ id }: Props) {
  const [folded, fold, unfold] = useBooleanState(true);
  const { data: commentsData } = useComments(id);

  const comments = useMemo(() => {
    if (commentsData == null || commentsData.length === 0) {
      return {
        first: null,
        rest: [],
      };
    }

    return {
      first: commentsData[0],
      rest: commentsData.slice(1),
    };
  }, [commentsData]);

  const moreButtonProps = useMemo(() => {
    if (commentsData == null || commentsData.length === 0) {
      return null;
    }

    if (folded && commentsData.length - 1 > 0) {
      return {
        onClick: unfold,
        text: `${commentsData.length - 1}개 더보기`,
      };
    }

    return {
      onClick: fold,
      text: '접기',
    };
  }, [commentsData, fold, folded, unfold]);

  return (
    <>
      <CommentList
        initial="hidden"
        animate={folded ? 'hidden' : 'visible'}
        variants={variants}
      >
        {comments.first != null ? (
          <Comment
            contents={comments.first.message}
            createAt={comments.first.createAt}
          />
        ) : null}

        {comments.rest.map(({ id, message, createAt }) => {
          return <Comment key={id} contents={message} createAt={createAt} />;
        })}
      </CommentList>
      {moreButtonProps != null ? (
        <Button type="button" onClick={moreButtonProps.onClick}>
          {moreButtonProps.text}
        </Button>
      ) : null}
    </>
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

const CommentList = styled(motion.ol, {
  my: '$8',
  spaceY: '$6',
});

const Button = styled('button', {
  color: '$gray500',
});
