import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import React, { HTMLAttributes, MouseEvent, useCallback } from 'react';
import { ToastWrapper } from '../ToastWrapper';
import { Comment } from '@components/icon/Comment';
import { motion, useAnimation } from 'framer-motion';

type Props = HTMLAttributes<HTMLButtonElement>;

const 한바퀴_회전_각도 = 360;
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
    await commentAnimationControl.start({
      rotate: [0, 한바퀴_회전_각도],
      transition: {
        duration: 0.6,
      },
    });
    commentAnimationControl.start({
      scale: [1, 0.3, 1],
      rotate: [0, 한바퀴_회전_각도 * 2],
      transition: {
        duration: 1.3,
      },
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
