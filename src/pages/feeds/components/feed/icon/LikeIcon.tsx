import { EmptyHeart } from '@components/icon/Heart';
import Image from '@components/image';
import { useNotifications } from '@components/notification/NotificationContext';
import React, { HTMLAttributes, MouseEvent, useCallback } from 'react';
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
      console.log('???');
      onClick?.(e);
      openToast();
    },
    [onClick, openToast]
  );

  return (
    <Image.Root
      as="button"
      onClick={handleClickLikeButton}
      css={{
        zIndex: '$1',
      }}
      {...props}
    >
      <EmptyHeart />
    </Image.Root>
  );
}
