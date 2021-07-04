import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import React, { HTMLAttributes, MouseEvent, useCallback } from 'react';
import { ToastWrapper } from '../ToastWrapper';
import { Comment } from '@components/icon/Comment';

type Props = HTMLAttributes<HTMLButtonElement>;

export function CommentIcon({ onClick, ...props }: Props) {
  const { showNotification } = useNotifications();

  const openToast = useCallback(() => {
    showNotification({
      element: <ToastWrapper>🤫 댓글은 개발을 못했어요 ㅠ.ㅠ</ToastWrapper>,
    });
  }, [showNotification]);

  const handleClickLikeButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      openToast();
    },
    [onClick, openToast]
  );

  return (
    <Image.Root
      as="button"
      css={{ zIndex: '$1' }}
      onClick={handleClickLikeButton}
      {...props}
    >
      <Comment />
    </Image.Root>
  );
}
