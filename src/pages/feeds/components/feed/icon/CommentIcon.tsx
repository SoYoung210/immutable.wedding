import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import React, { HTMLAttributes, MouseEvent, useCallback, useMemo } from 'react';
import { ToastWrapper } from '../ToastWrapper';

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

  const icon = useMemo(() => {
    return (
      <Image width={24} height={24}>
        <Image.Source src="/assets/icon/comment.jpg" alt="코멘트_아이콘" />
      </Image>
    );
  }, []);

  return (
    <Image.Root as="button" onClick={handleClickLikeButton} {...props}>
      {icon}
    </Image.Root>
  );
}
