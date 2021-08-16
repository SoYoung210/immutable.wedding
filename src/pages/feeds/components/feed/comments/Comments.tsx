import useBooleanState from '@hooks/useBooleanState';
import { SmallGrayButton } from '@pages/feeds/components/feed/comments/SmallGrayButton';
import { CommentRow } from '@pages/feeds/components/feed/comments/CommentRow';
import { useComments } from '@pages/feeds/components/feed/comments/useComments';
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import { styled } from 'stitches.config';

const variants = {
  hidden: {
    height: 42,
    overflow: 'hidden',
    transition: {
      type: 'spring',
      damping: 40,
      stiffness: 500,
    },
  },
  visible: {
    height: 'auto',
    overflow: 'visible',
    transition: {
      type: 'spring',
      damping: 40,
      stiffness: 500,
    },
  },
};

interface Props {
  id: number;
  inputModeButton: ReactNode;
}

export function Comments({ id, inputModeButton }: Props) {
  const [folded, fold, unfold, toggle] = useBooleanState(true);
  const { data: comments, isEmpty, hasOnlyOne } = useComments(id);

  if (isEmpty) {
    return <>{inputModeButton}</>;
  }

  return (
    <>
      <CommentList
        initial="hidden"
        animate={folded ? 'hidden' : 'visible'}
        variants={variants}
      >
        {comments.map(comment => {
          return (
            <CommentRow
              key={`${comment.id}--${comment.feedId}`}
              createAt={comment.createAt}
              onClick={toggle}
            >
              {comment.message}
            </CommentRow>
          );
        })}
      </CommentList>
      {hasOnlyOne ? (
        inputModeButton
      ) : folded ? (
        <SmallGrayButton onClick={unfold}>
          {comments.length - 1}개 더보기
        </SmallGrayButton>
      ) : (
        <SmallGrayButton onClick={fold}>접기</SmallGrayButton>
      )}
    </>
  );
}

const CommentList = styled(motion.ol, {
  my: '$8',
  spaceY: '$6',
});
