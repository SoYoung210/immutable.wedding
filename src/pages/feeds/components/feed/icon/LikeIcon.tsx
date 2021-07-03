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
        <ToastWrapper>
          💖 저희도 고마워요, 눌러주신 마음은 따로 저장하진 않을게요
        </ToastWrapper>
      ),
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
        <Image.Source src="/assets/icon/heart.jpg" alt="좋아요 아이콘" />
      </Image>
    );
  }, []);

  return (
    <Image.Root as="button" onClick={handleClickLikeButton} {...props}>
      {icon}
    </Image.Root>
  );
}
