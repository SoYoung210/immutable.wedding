import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import React, { HTMLAttributes, MouseEvent, useCallback, useMemo } from 'react';
import { ToastWrapper } from '../ToastWrapper';

type Props = HTMLAttributes<HTMLButtonElement>;

export function LikeIcon({ onClick, ...props }: Props) {
  const { showNotification } = useNotifications();

  const openToast = useCallback(() => {
    showNotification({
      element: (
        <ToastWrapper>📝 전하고 싶은 말은 식장에서 해주세요!</ToastWrapper>
      ),
      autoClose: 2500,
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
        <Image.Source src="/assets/icon/heart.png" alt="좋아요 아이콘" />
      </Image>
    );
  }, []);

  return (
    <Image.Root as="button" onClick={handleClickLikeButton} {...props}>
      {icon}
    </Image.Root>
  );
}
