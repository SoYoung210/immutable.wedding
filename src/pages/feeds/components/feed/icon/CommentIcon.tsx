import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import React, { HTMLAttributes, MouseEvent, useCallback } from 'react';
import { ToastWrapper } from '../ToastWrapper';
import { Comment } from '@components/icon/Comment';
import { motion, useAnimation } from 'framer-motion';
import shake from '@utils/animation/shake';

type Props = HTMLAttributes<HTMLButtonElement>;

export function CommentIcon({ onClick, ...props }: Props) {
  const { showNotification } = useNotifications();
  const commentAnimationControl = useAnimation();

  const openToast = useCallback(() => {
    showNotification({
      element: <ToastWrapper>🤫 댓글은 개발을 못했어요 ㅠ.ㅠ</ToastWrapper>,
    });
  }, [showNotification]);

  const animateSequence = useCallback(async () => {
    commentAnimationControl.stop();
    commentAnimationControl.start({
      x: shake(3, 11),
      transition: { duration: 1 },
    });
  }, [commentAnimationControl]);

  const handleClickLikeButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      openToast();
      animateSequence();
    },
    [animateSequence, onClick, openToast]
  );

  return (
    <Image.Root
      as="button"
      css={{ zIndex: '$1' }}
      onClick={handleClickLikeButton}
      {...props}
    >
      <motion.div animate={commentAnimationControl}>
        <Comment />
      </motion.div>
    </Image.Root>
  );
}
